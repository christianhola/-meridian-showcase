# Product

## Register

product

## Users

Visitors and developers exploring Meridian who want to understand how a shared AI interface presents provider options and a live conversational experience.

## Product Purpose

Provide an interactive playground that demonstrates provider/model selection visually and lets visitors exchange real text messages with Meridian's existing free-model endpoint. The interface uses Vercel AI SDK `useChat` with a custom transport, streams response text live, and shows request states. File attachments may be previewed locally in the browser; the current backend accepts text only, so files are not sent for model analysis. No API keys are exposed to the client.

## Brand Personality

Clear, technically credible, open, and restrained. The experience should feel familiar to developers and consistent with Meridian's white technical editorial direction.

## Anti-references

Do not imply that a provider chosen in the visual catalog is the provider serving the response. Do not claim files were processed by the model. Do not request or store real API keys. Avoid generic SaaS dashboard decoration, fictional performance metrics, and fabricated internal-reasoning animations.

## Design Principles

- Distinguish the real free text chat from visual provider/model controls.
- Drive loading, streaming, ready, and error states from the actual chat status.
- Keep file previews local and state clearly that they are not transmitted to the text endpoint.
- Preserve Meridian's navigation, typography, color roles, and component language.
- Demonstrate capability through usable controls rather than explanatory walls of text.

## Accessibility & Inclusion

Use semantic controls, visible focus treatment, descriptive accessible labels, keyboard-operable model selection and messaging, readable contrast, reduced-motion support, clear loading/error states, and reversible local file previews.
