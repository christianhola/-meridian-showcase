import type { ChatTransport, UIMessage, UIMessageChunk } from "ai";

const API_URL = "https://meridian-agents-v2-production.up.railway.app/api/v1/agents/free/chat/stream";
const TEXT_PART_ID = "meridian-response";

function friendlyError(status: number): string {
  if (status === 429) return "El modelo gratuito alcanzó su límite. Inténtalo más tarde.";
  if (status === 401) return "El servicio del modelo gratuito rechazó la autenticación. La interfaz está conectada, pero el backend necesita revisión.";
  if (status === 403) return "Este origen no está autorizado para llamar al servicio. Usa la web oficial de Meridian.";
  if (status === 404 || status === 503) return "El servicio gratuito aún no está disponible.";
  if (status === 422) return "El mensaje es demasiado largo o tiene un formato incorrecto.";
  return "Meridian no pudo responder. Inténtalo de nuevo.";
}

function textFromMessage(message: UIMessage): string {
  return message.parts
    .filter((part): part is Extract<typeof part, { type: "text" }> => part.type === "text")
    .map(part => part.text)
    .join("\n");
}

export class MeridianFreeChatTransport implements ChatTransport<UIMessage> {
  sendMessages: ChatTransport<UIMessage>["sendMessages"] = async ({ messages, abortSignal }) => {
    const conversation = messages
      .filter(message => message.role === "user" || message.role === "assistant")
      .map(message => ({ role: message.role, content: textFromMessage(message).slice(0, 1200) }))
      .filter(message => message.content.trim())
      .slice(-8);

    if (!conversation.length) {
      throw new Error("Escribe una pregunta junto al archivo. Este modelo procesa texto, no el contenido de los adjuntos.");
    }

    let response: Response;
    try {
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agent: "architect", messages: conversation }),
        signal: abortSignal,
      });
    } catch (error) {
      if (abortSignal?.aborted) throw error;
      throw new Error("No se pudo conectar con el servidor de modelos gratuitos.");
    }

    if (!response.ok) throw new Error(friendlyError(response.status));
    const reader = response.body?.getReader();
    if (!reader) throw new Error("El servidor no envió una respuesta en tiempo real.");

    const assistantMessageId = crypto.randomUUID();
    let cancelled = false;

    return new ReadableStream<UIMessageChunk>({
      start(controller) {
        controller.enqueue({ type: "start", messageId: assistantMessageId });
        controller.enqueue({ type: "text-start", id: TEXT_PART_ID });

        void (async () => {
          const decoder = new TextDecoder();
          let buffer = "";
          let receivedText = false;
          let completed = false;

          const processBlock = (block: string) => {
            let eventName = "";
            const dataParts: string[] = [];
            for (const line of block.split("\n")) {
              if (line.startsWith("event:")) eventName = line.slice(6).trim();
              if (line.startsWith("data:")) dataParts.push(line.slice(5).trimStart());
            }
            if (!eventName || !dataParts.length) return;

            let payload: Record<string, unknown>;
            try {
              payload = JSON.parse(dataParts.join("\n")) as Record<string, unknown>;
            } catch {
              return;
            }

            if (eventName === "delta" && typeof payload.text === "string") {
              receivedText = true;
              controller.enqueue({ type: "text-delta", id: TEXT_PART_ID, delta: payload.text });
            } else if (eventName === "error") {
              const status = typeof payload.status === "number" ? payload.status : 503;
              const code = typeof payload.code === "string" ? payload.code : "";
              const details: Record<string, string> = {
                reasoning_limit: "El modelo gratuito agotó su límite antes de responder. Inténtalo más tarde.",
                empty_response: "El modelo gratuito no produjo texto esta vez. Vuelve a intentarlo.",
                incomplete_response: "La transmisión se interrumpió; la respuesta puede estar incompleta.",
                output_limit: "El modelo llegó al límite de longitud. La respuesta puede estar incompleta.",
                free_model_unavailable: "El servicio del modelo gratuito rechazó la autenticación. La interfaz está conectada, pero el backend necesita revisión.",
                upstream_unavailable: "No se pudo contactar con el proveedor de modelos. Inténtalo más tarde.",
              };
              throw new Error(details[code] ?? friendlyError(status));
            } else if (eventName === "done") {
              completed = true;
            }
          };

          try {
            while (!cancelled) {
              const { done, value } = await reader.read();
              if (value) {
                buffer += decoder.decode(value, { stream: true }).replace(/\r/g, "");
                let boundary: number;
                while ((boundary = buffer.indexOf("\n\n")) >= 0) {
                  const block = buffer.slice(0, boundary);
                  buffer = buffer.slice(boundary + 2);
                  processBlock(block);
                }
              }
              if (done) break;
            }
            buffer += decoder.decode().replace(/\r/g, "");
            if (buffer.trim()) processBlock(buffer);
            if (!cancelled && !receivedText) throw new Error("El modelo gratuito finalizó sin producir una respuesta.");
            if (!cancelled && !completed) throw new Error("La conexión terminó antes de completar la respuesta.");
            if (cancelled) {
              controller.enqueue({ type: "abort", reason: "user" });
            } else {
              controller.enqueue({ type: "text-end", id: TEXT_PART_ID });
              controller.enqueue({ type: "finish" });
            }
            controller.close();
          } catch (error) {
            if (abortSignal?.aborted || cancelled) {
              controller.enqueue({ type: "abort", reason: "user" });
              controller.close();
              return;
            }
            controller.enqueue({ type: "error", errorText: error instanceof Error ? error.message : "Ocurrió un error inesperado." });
            controller.close();
          } finally {
            reader.releaseLock();
          }
        })();
      },
      async cancel(reason) {
        cancelled = true;
        await reader.cancel(reason).catch(() => undefined);
      },
    });
  };

  reconnectToStream: ChatTransport<UIMessage>["reconnectToStream"] = async () => null;
}
