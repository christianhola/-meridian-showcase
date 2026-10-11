# Design references — Meridian Community 4.0

The team requested design guidance from [21st.dev](https://21st.dev/) and the specific [AI Agent Response by Hossain Jahed](https://21st.dev/?q=agentes&preview=%2F%40jahed%2Fcomponents%2Fai-agent-response).

## Reference patterns reviewed
- [AI Agent Registry](https://21st.dev/community/components/explore/ai-agent-registry): capability categories, compact cards and discoverability.
- [Agent Elements](https://agent-elements.21st.dev/): messages, response states, tool cards, interaction affordances.
- [21st AI chat component guide](https://docs.21st.dev/blog/ai-chat-ui-components-react): loading, streaming, cancellation, error and accessibility states.

## Meridian implementation (original source)
1. Spacious, legible response layout using existing brand tokens and separate data/output surfaces.
2. User-selectable Starter, MCP and Skill responses; no generic component install scripts.
3. Step progression, transparent simulation label, human-readable result, copyable local command.
4. Native, accessible controls, focus styles, reduced motion support, responsive breakpoints.
5. Keep the backend private, static playground data public and never imply an active connection.
6. Link verified repository content rather than fabricated package installs or usage statistics.

The React component `src/components/AgentResponseShowcase.tsx` is independently authored for this project. It **does not copy the 21st component source** or require paid 21st content, 21st credentials or a 21st registry package.
