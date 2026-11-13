from __future__ import annotations

import hashlib
import os
import threading
from pathlib import Path

os.environ.setdefault("HF_HUB_DISABLE_TELEMETRY", "1")
os.environ.setdefault("GRADIO_ANALYTICS_ENABLED", "False")
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

import gradio as gr
import torch
from huggingface_hub import HfApi, snapshot_download
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

from contract import (
    ADAPTER_SHA256,
    BASE_MODEL,
    BASE_REVISION,
    PEPE_REPO,
    PEPE_SUBFOLDER,
    normalize_history,
    validate_message,
)

ROOT = Path(__file__).resolve().parent
ASSET = ROOT / "assets" / "pepe.webp"
MODEL = None
TOKENIZER = None
USING_CUDA = False
LOAD_LOCK = threading.Lock()
GENERATION_LOCK = threading.Lock()


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def validate_private_access(token: str) -> None:
    HfApi(token=token).model_info(PEPE_REPO)


def load_model_with_token(token: str):
    global MODEL, TOKENIZER, USING_CUDA

    token = token.strip()
    if not token:
        raise gr.Error("Pega un token de Hugging Face con acceso al repo privado de Pepe.")

    # Verify this session has access even when the model is already resident.
    validate_private_access(token)

    with LOAD_LOCK:
        if MODEL is not None and TOKENIZER is not None:
            return (
                "Pepe V9 ya está cargado. Acceso autorizado para esta sesión.",
                "",
                True,
                gr.update(interactive=True),
                gr.update(interactive=True),
            )

        snapshot = Path(
            snapshot_download(
                repo_id=PEPE_REPO,
                token=token,
                allow_patterns=[f"{PEPE_SUBFOLDER}/*"],
            )
        )
        adapter_dir = snapshot / PEPE_SUBFOLDER
        adapter_file = adapter_dir / "adapter_model.safetensors"

        if not adapter_file.exists():
            raise gr.Error("No encontré adapter_model.safetensors en el respaldo V9.")

        actual_sha = sha256(adapter_file)
        if actual_sha != ADAPTER_SHA256:
            raise gr.Error(
                "El adaptador descargado no coincide con el SHA-256 aprobado de V9."
            )

        TOKENIZER = AutoTokenizer.from_pretrained(
            adapter_dir,
            trust_remote_code=True,
        )

        USING_CUDA = torch.cuda.is_available()
        dtype = torch.float16 if USING_CUDA else torch.bfloat16

        kwargs = {
            "revision": BASE_REVISION,
            "torch_dtype": dtype,
            "trust_remote_code": True,
            "low_cpu_mem_usage": True,
            "attn_implementation": "eager",
        }
        if USING_CUDA:
            kwargs["device_map"] = {"": 0}

        base = AutoModelForCausalLM.from_pretrained(
            BASE_MODEL,
            **kwargs,
        )
        if not USING_CUDA:
            base = base.to("cpu")

        MODEL = PeftModel.from_pretrained(
            base,
            adapter_dir,
            is_trainable=False,
        )
        MODEL.eval()

    device = torch.cuda.get_device_name(0) if USING_CUDA else "Railway CPU"
    return (
        f"Pepe V9 cargado y verificado · {device}",
        "",
        True,
        gr.update(interactive=True),
        gr.update(interactive=True),
    )


def build_prompt(messages):
    try:
        return TOKENIZER.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True,
            enable_thinking=False,
        )
    except TypeError:
        return TOKENIZER.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True,
        )


def generate(message: str, history: list[dict] | None, authorized: bool):
    if not authorized:
        raise gr.Error("Autoriza primero esta sesión con tu token privado de Hugging Face.")
    if MODEL is None or TOKENIZER is None:
        raise gr.Error("Pepe V9 todavía no está cargado.")

    message = validate_message(message)
    history = normalize_history(history)
    messages = [*history, {"role": "user", "content": message}]
    prompt = build_prompt(messages)
    inputs = TOKENIZER(prompt, return_tensors="pt")
    target_device = next(MODEL.parameters()).device
    inputs = {name: tensor.to(target_device) for name, tensor in inputs.items()}

    with GENERATION_LOCK, torch.inference_mode():
        output = MODEL.generate(
            **inputs,
            max_new_tokens=384,
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
            repetition_penalty=1.05,
            pad_token_id=TOKENIZER.eos_token_id,
        )

    generated = output[0][inputs["input_ids"].shape[1]:]
    reply = TOKENIZER.decode(generated, skip_special_tokens=True).strip()

    return "", [
        *history,
        {"role": "user", "content": message},
        {"role": "assistant", "content": reply or "No generé texto en este intento."},
    ]


CSS = """
html, body, .gradio-container { background: #050505 !important; }
.gradio-container {
  max-width: 980px !important;
  margin: 0 auto !important;
  color: white !important;
}
#pepe-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 22px 18px 30px;
}
#pepe-image {
  max-width: 430px;
  margin: 0 auto -12px;
  border: 0 !important;
  background: transparent !important;
}
#pepe-image img {
  max-height: 44vh !important;
  object-fit: contain !important;
  border-radius: 28px !important;
}
#title, #state, #privacy { text-align: center; }
#title { color: rgba(255,255,255,.93); margin-bottom: 2px; }
#state { color: rgba(255,255,255,.45); font-size: 12px; margin-bottom: 8px; }
#privacy { color: rgba(255,255,255,.28); font-size: 11px; margin-top: -5px; }
#auth-row, #input-row {
  max-width: 720px;
  margin: 8px auto 0;
  align-items: center;
}
#hf-token input, #prompt textarea {
  border-radius: 999px !important;
  background: rgba(255,255,255,.055) !important;
  border: 1px solid rgba(255,255,255,.07) !important;
  color: white !important;
}
#hf-token input { min-height: 48px !important; padding: 12px 18px !important; }
#prompt textarea { min-height: 54px !important; padding: 15px 20px !important; }
#load, #send {
  border-radius: 999px !important;
  background: rgba(255,255,255,.10) !important;
  border: 1px solid rgba(255,255,255,.08) !important;
}
#send { min-width: 54px !important; max-width: 54px !important; height: 54px !important; }
#chat { border: 0 !important; background: transparent !important; }
#chat .message { border-radius: 20px !important; }
footer { display: none !important; }
@media (max-width: 640px) {
  #pepe-shell { padding: 10px 12px 18px; }
  #pepe-image { max-width: 320px; }
  #pepe-image img { max-height: 38vh !important; }
  #chat { height: 290px !important; }
}
"""

with gr.Blocks(css=CSS, title="Pepe V9") as demo:
    authorized = gr.State(False)

    with gr.Column(elem_id="pepe-shell"):
        gr.Image(
            value=str(ASSET),
            show_label=False,
            interactive=False,
            container=False,
            elem_id="pepe-image",
        )
        gr.Markdown("### Pepe V9", elem_id="title")
        status = gr.Markdown(
            "Candidato privado · autoriza esta sesión para cargar el modelo",
            elem_id="state",
        )

        with gr.Row(elem_id="auth-row"):
            hf_token = gr.Textbox(
                placeholder="HF token privado (no se guarda)",
                show_label=False,
                type="password",
                container=False,
                elem_id="hf-token",
                scale=10,
            )
            load = gr.Button("Cargar Pepe", elem_id="load", scale=2)

        gr.Markdown(
            "El token se usa únicamente para comprobar acceso y descargar tu respaldo privado.",
            elem_id="privacy",
        )

        chat = gr.Chatbot(
            value=[],
            type="messages",
            show_label=False,
            elem_id="chat",
            height=340,
        )

        with gr.Row(elem_id="input-row"):
            prompt = gr.Textbox(
                placeholder="Type your message...",
                show_label=False,
                container=False,
                lines=1,
                max_lines=6,
                elem_id="prompt",
                scale=12,
                interactive=False,
            )
            send = gr.Button(
                "↗",
                elem_id="send",
                scale=1,
                interactive=False,
            )

        load.click(
            fn=load_model_with_token,
            inputs=[hf_token],
            outputs=[status, hf_token, authorized, prompt, send],
        )

        prompt.submit(
            fn=generate,
            inputs=[prompt, chat, authorized],
            outputs=[prompt, chat],
        )
        send.click(
            fn=generate,
            inputs=[prompt, chat, authorized],
            outputs=[prompt, chat],
        )

demo.queue(default_concurrency_limit=1)

if __name__ == "__main__":
    railway = bool(os.environ.get("RAILWAY_ENVIRONMENT"))
    host = "0.0.0.0" if railway else os.environ.get("PEPE_HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", "7860"))
    demo.launch(
        server_name=host,
        server_port=port,
        inbrowser=not railway,
        share=False,
        show_error=True,
    )
