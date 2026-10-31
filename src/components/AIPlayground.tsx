import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import {
  Activity, ArrowUp, Check, ChevronDown, Circle, Command, Cpu,
  FileImage, FileText, Gauge, Paperclip, Play, Plus,
  Sparkles, Square, X,
} from "lucide-react";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import { MeridianFreeChatTransport } from "@/services/meridianFreeChatTransport";

type Model = {
  id: string;
  name: string;
  maker: string;
  icon: string;
  color: string;
};

type PendingAttachment = {
  id: string;
  file: File;
  previewUrl?: string;
};

const models: Model[] = [
  { id: "gpt-4o", name: "GPT-4o", maker: "OpenAI", icon: "O", color: "#171717" },
  { id: "gemini", name: "Gemini 1.5 Pro", maker: "Google", icon: "✦", color: "#6576ff" },
  { id: "claude", name: "Claude 3.5 Sonnet", maker: "Anthropic", icon: "A", color: "#c56b42" },
  { id: "llama", name: "Llama 3.1 70B", maker: "Groq", icon: "G", color: "#f04f3d" },
  { id: "together", name: "Llama 3.1 405B", maker: "Together AI", icon: "T", color: "#7861e8" },
  { id: "sonar", name: "Sonar", maker: "Perplexity", icon: "P", color: "#21887b" },
];

const integrations = ["OpenAI", "Google AI", "Anthropic", "Groq", "Together AI", "Perplexity", "Tavily"];
const MAX_ATTACHMENTS = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024;

function getFileKind(name: string, mediaType?: string): string {
  if (mediaType?.startsWith("image/")) return "IMAGEN";
  if (mediaType === "application/pdf" || name.toLowerCase().endsWith(".pdf")) return "PDF";
  const extension = name.split(".").pop();
  return extension && extension !== name ? extension.slice(0, 8).toUpperCase() : "ARCHIVO";
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type PromptInputSubmitProps = {
  isLoading: boolean;
  canSubmit: boolean;
  onStop: () => void;
};

// Prompt Kit's current registry exposes PromptInputAction rather than a Submit export.
function PromptInputSubmit({ isLoading, canSubmit, onStop }: PromptInputSubmitProps) {
  return (
    <PromptInputAction tooltip={isLoading ? "Detener respuesta" : "Enviar mensaje"}>
      <button
        type={isLoading ? "button" : "submit"}
        className="ai-send"
        aria-label={isLoading ? "Detener respuesta" : "Enviar mensaje"}
        disabled={!isLoading && !canSubmit}
        onClick={isLoading ? onStop : undefined}
      >
        {isLoading ? <Square size={14} fill="currentColor" /> : <ArrowUp size={17} />}
      </button>
    </PromptInputAction>
  );
}

export function AIPlayground() {
  const [selected, setSelected] = useState(models[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
  const [attachmentNotice, setAttachmentNotice] = useState("");
  const [draggingFiles, setDraggingFiles] = useState(false);
  const transport = useMemo(() => new MeridianFreeChatTransport(), []);
  const { messages, sendMessage, status, error, clearError, stop, regenerate, setMessages } = useChat<UIMessage>({ transport });
  const fileInput = useRef<HTMLInputElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const previewUrls = useRef(new Set<string>());
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => () => {
    previewUrls.current.forEach(url => URL.revokeObjectURL(url));
    previewUrls.current.clear();
  }, []);

  useEffect(() => {
    const conversation = conversationRef.current;
    if (conversation) conversation.scrollTop = conversation.scrollHeight;
  }, [messages, status]);

  const toggleIntegration = (name: string) => {
    setConnected(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  };

  const addFiles = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const incoming = Array.from(fileList);
    const room = Math.max(0, MAX_ATTACHMENTS - attachments.length);
    const accepted = incoming.filter(file => file.size <= MAX_FILE_BYTES).slice(0, room);
    const rejected = incoming.length - accepted.length;
    const next = accepted.map(file => {
      const previewUrl = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
      if (previewUrl) previewUrls.current.add(previewUrl);
      return { id: crypto.randomUUID(), file, previewUrl };
    });
    if (rejected) setAttachmentNotice(`Se admiten hasta ${MAX_ATTACHMENTS} archivos de 5 MB cada uno.`);
    else setAttachmentNotice("Vista previa local: el modelo gratuito procesa texto, no el contenido de los archivos.");
    if (next.length) setAttachments(current => [...current, ...next]);
    if (fileInput.current) fileInput.current.value = "";
  };

  const removeAttachment = (id: string) => {
    const removed = attachments.find(item => item.id === id);
    if (removed?.previewUrl) {
      URL.revokeObjectURL(removed.previewUrl);
      previewUrls.current.delete(removed.previewUrl);
    }
    setAttachments(current => current.filter(item => item.id !== id));
    if (!attachments.length || attachments.length === 1) setAttachmentNotice("");
  };

  const clearAttachments = () => {
    attachments.forEach(item => {
      if (item.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
        previewUrls.current.delete(item.previewUrl);
      }
    });
    setAttachments([]);
  };

  const submitMessage = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    const transfer = new DataTransfer();
    attachments.forEach(item => transfer.items.add(item.file));
    const files = transfer.files.length ? transfer.files : undefined;
    setInput("");
    clearAttachments();
    setAttachmentNotice("");
    void sendMessage({ text, files }).catch(() => undefined);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMessage();
  };

  const resetConversation = () => {
    stop();
    setMessages([]);
    setInput("");
    clearAttachments();
    clearError();
    setAttachmentNotice("");
  };

  const setSuggestion = (suggestion: string) => setInput(suggestion);
  const lastMessageId = messages[messages.length - 1]?.id;

  return (
    <section className="section ai-playground" aria-labelledby="ai-playground-title">
      <div className="ai-heading">
        <div>
          <span className="ai-heading__brand"><span className="vercel-mark" aria-hidden="true" /> Vercel AI SDK <span className="ai-heading__slash">/</span> Playground</span>
          <h2 id="ai-playground-title">One interface.<br /><span>Every model.</span></h2>
          <p>Prueba el chat de texto: la respuesta se transmite en tiempo real cuando el endpoint gratuito está disponible.</p>
        </div>
        <div className="ai-heading__note"><span className={`ai-demo-dot${isLoading ? " is-live" : ""}`} /> Endpoint real<br /><small>Ruta gratuita · texto</small></div>
      </div>

      <div className="ai-workbench">
        <aside className="ai-sidebar" aria-label="Catálogo visual de proveedores">
          <div className="ai-side-title"><span>PROVEEDORES · VISTA</span><button type="button" aria-label="Mostrar integraciones visuales" className="ai-add"><Plus size={15} /></button></div>
          <div className="ai-provider-list">
            {integrations.map(name => {
              const active = connected.includes(name);
              const model = models.find(item => item.maker === name || (name === "Google AI" && item.maker === "Google"));
              return (
                <button type="button" className={`ai-provider ${active ? "is-connected" : ""}`} key={name} onClick={() => toggleIntegration(name)} aria-pressed={active}>
                  <span className="ai-provider__icon" style={{ "--provider-color": model?.color ?? "#6d6d68" } as React.CSSProperties}>{model?.icon ?? name.slice(0, 1)}</span>
                  <span className="ai-provider__name">{name}</span>
                  <span className={`ai-provider__status ${active ? "is-on" : ""}`} aria-label={active ? "Estado visual activo" : "Estado visual inactivo"} />
                </button>
              );
            })}
          </div>
          <div className="ai-sidebar__foot"><Circle size={8} /> Estados visuales · sin conexión</div>
        </aside>

        <div className="ai-chat">
          <header className="ai-chat__top">
            <div className="ai-select-wrap">
              <button type="button" className="ai-model-select" onClick={() => setMenuOpen(value => !value)} aria-expanded={menuOpen} aria-haspopup="listbox" aria-label="Modelo visual de referencia">
                <span className="ai-model-avatar" style={{ "--provider-color": selected.color } as React.CSSProperties}>{selected.icon}</span>
                <span><strong>{selected.name}</strong><small>Vista de modelo</small></span><ChevronDown size={15} />
              </button>
              {menuOpen && <div className="ai-model-menu" role="listbox" aria-label="Seleccionar modelo visual">
                {models.map(model => <button type="button" key={model.id} role="option" aria-selected={selected.id === model.id} onClick={() => { setSelected(model); setMenuOpen(false); }}>
                  <span className="ai-model-avatar" style={{ "--provider-color": model.color } as React.CSSProperties}>{model.icon}</span><span><strong>{model.name}</strong><small>{model.maker} · referencia visual</small></span>{selected.id === model.id && <Check size={15} />}
                </button>)}
              </div>}
            </div>
            <span className="ai-mode-label"><span className={isLoading ? "is-streaming" : ""} />{isLoading ? "RESPUESTA EN VIVO" : "MERIDIAN · FREE AUTO"}</span>
          </header>

          <div className="ai-conversation" ref={conversationRef} aria-label="Conversación con Meridian">
            {messages.length === 0 ? (
              <div className="ai-welcome">
                <span className="ai-welcome__icon"><Sparkles size={18} /></span>
                <div><strong>¿Qué quieres explorar?</strong><p>Escribe una pregunta y mira cómo Meridian responde en streaming real.</p>
                  <div className="ai-suggestions">
                    {["¿Qué puede hacer Meridian?", "Dame una idea para automatizar ventas", "Resume cómo funciona este playground"].map(suggestion => (
                      <button type="button" key={suggestion} onClick={() => setSuggestion(suggestion)}>{suggestion}</button>
                    ))}
                  </div>
                </div>
              </div>
            ) : messages.map(message => {
              const text = message.parts.filter(part => part.type === "text").map(part => part.text).join("");
              const fileParts = message.parts.filter(part => part.type === "file");
              const isUser = message.role === "user";
              const streamingThisMessage = !isUser && status === "streaming" && message.id === lastMessageId;
              return (
                <article className={`ai-message ${isUser ? "ai-message--user" : "ai-message--assistant"}`} key={message.id}>
                  <div className="ai-message__bubble">
                    <span className="ai-message__label">{isUser ? "🧑 TÚ" : "✦ MERIDIAN AGENT"}</span>
                    {text && <p>{text}{streamingThisMessage && <span className="ai-stream-caret" aria-hidden="true" />}</p>}
                  </div>
                  {fileParts.length > 0 && <div className="ai-message-files" aria-label="Archivos adjuntos, no procesados por el modelo">
                    {fileParts.map((part, index) => part.type === "file" ? (
                      <div className="ai-file-card" key={`${message.id}-${index}`}>
                        {part.mediaType?.startsWith("image/") ? <img src={part.url} alt={part.filename ?? "Imagen adjunta"} /> : <span className="ai-file-card__icon"><FileText size={16} /></span>}
                        <span className="ai-file-card__meta"><strong>{part.filename ?? "Archivo adjunto"}</strong><small>{getFileKind(part.filename ?? "", part.mediaType)} · vista local</small></span>
                      </div>
                    ) : null)}
                  </div>}
                </article>
              );
            })}
            {messages.length === 0 && attachments.length === 0 && <div className="ai-welcome-foot"><span className="ai-welcome-foot__dot" /> Puedes escribir o probar una sugerencia.</div>}
            {isLoading && <div className="ai-live-activity" role="status" aria-live="polite">
              <span className="ai-live-loader" aria-hidden="true" />
              <span>Meridian está ejecutando la tarea...</span>
              <small>{status === "submitted" ? "Conectando con el modelo gratuito" : "Respuesta transmitiéndose en tiempo real"}</small>
            </div>}
            {error && <div className="ai-live-error" role="alert"><span>{error.message}</span><button type="button" onClick={() => { clearError(); void regenerate().catch(() => undefined); }}>Reintentar</button></div>}
          </div>

          <form className="ai-composer-form" onSubmit={handleFormSubmit}>
            {attachments.length > 0 && <div className="ai-pending-files" aria-label="Archivos listos para adjuntar">
              {attachments.map(item => (
                <div className="ai-pending-file" key={item.id}>
                  {item.previewUrl ? <img src={item.previewUrl} alt="" /> : <span className="ai-pending-file__icon">{item.file.type.startsWith("image/") ? <FileImage size={15} /> : <FileText size={15} />}</span>}
                  <span><strong>{item.file.name}</strong><small>{getFileKind(item.file.name, item.file.type)} · {formatBytes(item.file.size)}</small></span>
                  <button type="button" aria-label={`Quitar ${item.file.name}`} onClick={() => removeAttachment(item.id)}><X size={14} /></button>
                </div>
              ))}
            </div>}
            <PromptInput
              className="ai-composer"
              value={input}
              onValueChange={setInput}
              isLoading={isLoading}
              onSubmit={submitMessage}
              maxHeight={180}
            >
              <PromptInputTextarea
                className="ai-composer__textarea"
                placeholder="Escribe un mensaje para Meridian…"
                aria-label="Mensaje para Meridian"
                disabled={isLoading}
                maxLength={1200}
              />
              <PromptInputActions className="ai-composer__bottom">
                <div className="ai-composer__tools">
                  <PromptInputAction tooltip="Adjuntar imagen o documento">
                    <button type="button" aria-label="Adjuntar archivos" className="ai-tool" disabled={isLoading} onClick={() => fileInput.current?.click()}>
                      <Paperclip size={15} />
                    </button>
                  </PromptInputAction>
                  <span className="ai-attach-label">Adjuntar</span>
                  <span className="ai-compose-hint">Enter para enviar · Shift+Enter para nueva línea</span>
                </div>
                <PromptInputSubmit isLoading={isLoading} canSubmit={Boolean(input.trim())} onStop={stop} />
              </PromptInputActions>
            </PromptInput>
            <input
              ref={fileInput}
              type="file"
              accept="image/*,.pdf,.txt,.md,.csv,.doc,.docx"
              multiple
              className="ai-file-input"
              aria-label="Seleccionar imágenes o documentos"
              onChange={event => addFiles(event.target.files)}
              disabled={isLoading || attachments.length >= MAX_ATTACHMENTS}
            />
            {attachmentNotice && <p className="ai-attachment-note">{attachmentNotice}</p>}
          </form>
          <div className="ai-chat__disclaimer">Las respuestas de texto llegan en vivo desde Meridian · modelo gratuito Auto. Los archivos se muestran localmente y no se envían al modelo.</div>
        </div>

        <aside className="ai-insights" aria-label="Información de la conexión real">
          <div className="ai-insights__top"><span>ENDPOINT DE CHAT</span><span className="ai-live-tag ai-live-tag--real">REAL</span></div>
          <div className="ai-model-card"><span className="ai-model-avatar ai-model-avatar--large ai-model-avatar--meridian">M</span><strong>Meridian Free</strong><small>Ruta gratuita · texto</small></div>
          <div className="ai-insight-row"><span><Activity size={15} /> Transporte</span><strong>Stream SSE</strong></div>
          <div className="ai-insight-row"><span><Cpu size={15} /> Historial</span><strong>8 mensajes</strong></div>
          <div className="ai-insight-row"><span><Gauge size={15} /> Estado</span><strong className={isLoading ? "ai-insight-live" : ""}>{isLoading ? "Generando" : error ? "Revisar" : "Configurado"}</strong></div>
          <div className="ai-insights__foot">El endpoint gratuito está configurado; cuando el proveedor responde, el texto llega en vivo. Si falla, la interfaz muestra el estado real.</div>
          <div className="ai-quick-actions"><span>SESIÓN</span><div><kbd><Command size={10} /> ↵</kbd> Enviar mensaje</div><div><kbd><Paperclip size={10} /></kbd> Añadir vista previa</div><button type="button" onClick={resetConversation}><Play size={13} /> Reiniciar conversación</button></div>
        </aside>
      </div>

      <div className="ai-capabilities" aria-label="Elementos de interfaz de la demo">
        <div className="ai-capability ai-capability--vision"><span className="ai-capability__symbol">✦</span><div><strong>Respuestas en vivo</strong><p>Los fragmentos de texto aparecen mientras llega la respuesta del modelo.</p></div><span className="ai-capability__tag">STREAMING</span></div>
        <div className="ai-capability ai-capability--speed"><span className="ai-capability__symbol">↯</span><div><strong>Estados reales</strong><p>Preparando, transmitiendo, listo y error reflejan el estado del chat.</p></div><span className="ai-capability__tag">USECHAT</span></div>
        <div className="ai-capability ai-capability--reason"><span className="ai-capability__symbol">◉</span><div><strong>Adjuntos visibles</strong><p>Imágenes y documentos se previsualizan localmente antes de enviarse.</p></div><span className="ai-capability__tag">LOCAL</span></div>
      </div>
    </section>
  );
}
