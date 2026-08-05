# Meridian Voice Engine

> **Estado:** sistema en desarrollo. La documentación define el comportamiento objetivo y las restricciones de seguridad; no afirma que el flujo completo esté activo actualmente.

## Visión

**Meridian Voice Engine** será la capa de voz de Meridian, construida alrededor de ElevenLabs para permitir que el usuario escuche respuestas, converse con el asistente y siga tareas largas sin depender únicamente de texto.

La voz no se reproducirá automáticamente. El usuario deberá iniciar cada experiencia mediante un botón de voz, altavoz o conversación.

<div align="center">
  <a href="https://elevenlabs.io/">
    <img src="https://img.shields.io/badge/VOICE%20ENGINE-ELEVENLABS-FFFFFF?style=for-the-badge&logo=elevenlabs&logoColor=FFFFFF&labelColor=30363D&color=0D1117" alt="ElevenLabs" />
  </a>
</div>

## Principios

```text
USER CONTROLLED
NO AUTOPLAY
SERVER-SIDE CREDENTIALS
VISIBLE TRANSCRIPT
ACCESSIBLE CAPTIONS
INTERRUPTIBLE PLAYBACK
WORKSPACE-SCOPED CONTEXT
```

## Experiencias previstas

| Experiencia | Comportamiento |
|---|---|
| `Listen` | Reproduce una respuesta escrita cuando el usuario toca el botón de altavoz. |
| `Talk` | Inicia una conversación por voz únicamente tras una acción explícita. |
| `Dictate` | Convierte voz en texto para completar el composer del chat. |
| `Task narration` | Lee planes, pasos y resúmenes extensos sin ocultar el texto original. |
| `Agent status` | Comunica cambios reales del Code Agent: planificación, ejecución, aprobación, éxito o error. |
| `Interrupt` | Permite pausar, detener o cambiar de respuesta inmediatamente. |

## Flujo técnico objetivo

```text
USER ACTION
    ↓
MICROPHONE / PLAY BUTTON
    ↓
PERMISSION + INPUT VALIDATION
    ↓
MERIDIAN SERVER ROUTE
    ↓
ELEVENLABS API
    ↓
AUDIO STREAM
    ↓
PLAYER + CAPTIONS + TRANSCRIPT
```

Las claves de ElevenLabs permanecerán en el servidor. El navegador no recibirá secretos ni podrá construir solicitudes arbitrarias con credenciales privadas.

## Integración con MERI

La mascota roja MERI representará los estados de voz:

```ts
export type VoiceStatus =
  | "idle"
  | "requesting_permission"
  | "listening"
  | "transcribing"
  | "thinking"
  | "speaking"
  | "paused"
  | "success"
  | "error";
```

| Estado | Respuesta visual |
|---|---|
| `idle` | MERI espera sin animación invasiva. |
| `listening` | Ondas rojas suaves y señal de micrófono activa. |
| `transcribing` | Texto parcial visible; no se oculta lo que fue entendido. |
| `thinking` | MERI conecta el mensaje con el orquestador. |
| `speaking` | Waveform sincronizada y botón de detener visible. |
| `paused` | Reproducción detenida, posición conservada. |
| `error` | Mensaje claro y recuperación sin perder el texto. |

## Contrato de interfaz

```tsx
interface VoiceControlProps {
  text: string;
  status: VoiceStatus;
  onPlay(): void;
  onPause(): void;
  onStop(): void;
}
```

La interfaz debe incluir:

- botón de voz por mensaje;
- estado visible de reproducción;
- subtítulos o texto original;
- control de volumen;
- pausa y detención;
- navegación por teclado;
- soporte para `prefers-reduced-motion`;
- fallback de texto cuando el audio falle.

## Seguridad y privacidad

- No exponer `ELEVENLABS_API_KEY` al cliente.
- No iniciar micrófono o reproducción sin acción del usuario.
- No conservar audio ni transcripciones por defecto.
- Validar tamaño, idioma y contenido de cada solicitud.
- Limitar frecuencia, duración y consumo por usuario o workspace.
- Registrar únicamente IDs operativos, duración, estado y proveedor cuando sea necesario.
- Mantener el texto visible como fuente verificable.

## Conexión con Meridian Code Agent

```text
CODE AGENT EVENT
    ↓
STATUS MESSAGE
    ↓
USER CHOOSES LISTEN
    ↓
VOICE ENGINE
    ↓
ELEVENLABS AUDIO + CAPTIONS
```

Ejemplos:

- “El plan técnico está listo para revisión.”
- “Se modificaron cuatro archivos; el build terminó correctamente.”
- “La migración requiere tu aprobación antes de continuar.”
- “La ejecución se detuvo porque se detectaron cambios locales.”

## Criterios de terminación

```text
[ ] Sin autoplay
[ ] API key solo en servidor
[ ] Reproducción interrumpible
[ ] Texto y subtítulos visibles
[ ] Estados de error y recuperación
[ ] Accesibilidad por teclado
[ ] Límites de uso
[ ] Eventos de voz conectados a estados reales
[ ] Sin almacenamiento de audio por defecto
[ ] Pruebas en laptop y móvil
```
