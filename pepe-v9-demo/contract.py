from __future__ import annotations

from typing import Any

BASE_MODEL = "Qwen/Qwen3-1.7B"
BASE_REVISION = "70d244cc86ccca08cf5af4e1e306ecf908b1ad5e"
PEPE_REPO = "christian1212q/pepe"
PEPE_SUBFOLDER = "pepe-v9-candidate-001"
ADAPTER_SHA256 = "57a1766d21bff999c18e0f588dc9cbd7acde0672d806fb17727c48e206a94678"
MAX_INPUT_CHARS = 12_000


def normalize_history(history: list[dict[str, Any]] | None) -> list[dict[str, str]]:
    normalized: list[dict[str, str]] = []
    for item in history or []:
        role = str(item.get("role", ""))
        content = str(item.get("content", "")).strip()
        if role in {"user", "assistant"} and content:
            normalized.append({"role": role, "content": content})
    return normalized


def validate_message(message: str) -> str:
    value = message.strip()
    if not value:
        raise ValueError("El mensaje está vacío.")
    if len(value) > MAX_INPUT_CHARS:
        raise ValueError(f"El mensaje supera {MAX_INPUT_CHARS} caracteres.")
    return value
