# Meridian Virtual Desktop — existing Daytona sandbox

This backend serves the website at https://christianhola.github.io/-meridian-showcase/desktop/ . All changes live in **christianhola/-meridian-showcase**, not the Meridian API application.

## Verified architecture

GitHub Pages is a public UI with **no secrets**. The authenticated Railway service retrieves the existing sandbox by its configured immutable `DAYTONA_SANDBOX_ID`. If Daytona reports it is stopped or archived, an authenticated operator request starts it and then invokes Computer Use. Screenshots and approved GUI actions call the real SDK. **No sandbox is created, deleted, stopped or archived by this service.** A 30-minute HTTP session ending does not delete the machine or its files. Daytona's own lifecycle auto-stop/auto-archive/auto-delete policies still apply; review these in the Daytona dashboard.

## Configuration in Railway

Service: `meridian-virtual-desktop`. Root directory: `services/virtual-desktop`.

- `DAYTONA_API_KEY`: secret API key; server only.
- `DAYTONA_SANDBOX_ID`: `da9ec846-473e-4779-be41-5fe8d5daf785` (the existing `sbmeridian`).
- `DESKTOP_ACCESS_TOKEN`: **private operator token of at least 32 characters**, never commit or embed in a GitHub Pages build.
- `DESKTOP_ALLOWED_ORIGIN`: `https://christianhola.github.io`.
- `OPENROUTER_API_KEY`: optional; needed only for a screenshot-based single-step agent proposal.
- `DESKTOP_VISION_MODEL`: optional OpenRouter vision model.

The operator enters the private token into the website; it is kept in browser component memory and used only for authenticated API requests. It is not saved in localStorage.

## Endpoints and constraints

`GET /health` checks whether the required configuration exists. `POST /api/desktops` attaches and starts the configured sandbox if needed; `GET /api/desktops/:id` polls status; `GET /api/desktops/:id/screenshot` requests a live JPEG; `POST /api/desktops/:id/action` supports only mouse click, typing and allowlisted keys. `POST /api/desktops/:id/plan` requests one proposed action after explicit user confirmation and does not execute it. `POST /api/desktops/:id/install` requires a second authorization and only supports four allowlisted packages. `DELETE /api/desktops/:id` **disconnects the web session, never deletes the sandbox**.

It is an owner-operated workspace with one active session per Railway replica; not a public multi-user desktop platform. A `daytona-small` container has modest resources, and graphical Computer Use might fail if required packages or capacity are unavailable. The failure must appear as an error, not a generated screenshot or mock.

Run `npm test` in `services/virtual-desktop` to run offline mock-based contract tests. Successful CI is **not proof of a live desktop**; use a real authenticated screenshot for that verification.

Official documentation: https://www.daytona.io/docs/en/typescript-sdk/daytona/ and https://www.daytona.io/docs/en/computer-use/ .
