/** Streams real free-model text through the Railway backend; no API keys in the browser. */
export type FreeChatMessage = { role: "user" | "assistant"; content: string };
export type FreeAgentRole = "architect" | "coder" | "researcher" | "growth" | "browser" | "reviewer";

const API_URL = "https://meridian-agents-v2-production.up.railway.app/api/v1/agents/free/chat/stream";

function friendlyError(status: number): string {
  if (status === 429) return "El modelo gratuito alcanzó su límite. Inténtalo más tarde.";
  if (status === 403) return "La solicitud no está autorizada desde esta página.";
  if (status === 404 || status === 503) return "El servicio gratuito aún no está disponible.";
  if (status === 422) return "El mensaje es demasiado largo o tiene un formato incorrecto.";
  return "El modelo gratuito no pudo responder. Inténtalo de nuevo.";
}

export async function streamFreeAnswer(
  agent: FreeAgentRole,
  messages: FreeChatMessage[],
  onDelta: (delta: string) => void,
  signal: AbortSignal,
): Promise<void> {
  let response: Response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agent, messages: messages.slice(-8) }),
      signal,
    });
  } catch (error) {
    if (signal.aborted) throw error;
    throw new Error("No se pudo conectar con el servidor de modelos gratuitos.");
  }

  if (!response.ok) throw new Error(friendlyError(response.status));
  const reader = response.body?.getReader();
  if (!reader) throw new Error("El servidor no envió una respuesta en tiempo real.");
  const decoder = new TextDecoder();
  let buffer = "";
  let completed = false;
  let receivedText = false;

  const processBlock = (block: string) => {
    let eventName = "";
    const dataParts: string[] = [];
    for (const line of block.split("\n")) {
      if (line.startsWith("event:")) eventName = line.slice(6).trim();
      if (line.startsWith("data:")) dataParts.push(line.slice(5).trimStart());
    }
    if (!eventName || !dataParts.length) return;
    let payload: Record<string, unknown>;
    try { payload = JSON.parse(dataParts.join("\n")) as Record<string, unknown>; }
    catch { return; }
    if (eventName === "delta" && typeof payload.text === "string") {
      receivedText = true;
      onDelta(payload.text);
    } else if (eventName === "error") {
      const status = typeof payload.status === "number" ? payload.status : 503;
      const code = typeof payload.code === "string" ? payload.code : "";
      const explanations: Record<string, string> = {
        reasoning_limit: "El modelo gratuito consumió su límite de generación sin escribir una respuesta. Inténtalo más tarde.",
        empty_response: "El modelo gratuito no produjo texto esta vez. Puedes volver a intentarlo.",
        incomplete_response: "Se interrumpió la transmisión del modelo gratuito. Puede que la respuesta esté incompleta.",
        output_limit: "El modelo llegó al límite de longitud. La respuesta que ves puede estar incompleta.",
        free_model_unavailable: "Los modelos gratuitos están temporalmente ocupados. Prueba de nuevo más tarde.",
        upstream_unavailable: "No se pudo contactar con OpenRouter. Inténtalo más tarde.",
      };
      throw new Error(explanations[code] ?? friendlyError(status));
    } else if (eventName === "done") {
      completed = true;
    }
  };

  try {
    while (true) {
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
  } finally {
    reader.releaseLock();
  }
  if (!receivedText) throw new Error("El modelo gratuito finalizó sin producir texto. Puedes volver a intentarlo más tarde.");
  if (!completed) throw new Error("La conexión terminó antes de completar la respuesta. Se conservó el texto recibido.");
}
