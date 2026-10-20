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

## Private agent automation without a manually pasted operator token

The main **Agents** page uses an owner-only GitHub login. After the owner signs in
once, Coder, Browser and the other agents can automatically open the existing
`sbmeridian` desktop for explicitly local, low-risk GUI work. Requests stay
in the chat; a real screenshot is displayed after a task when available.
Sensitive or internet-facing tasks remain blocked by `autopilot.mjs`.
The public GitHub Pages website never receives Daytona or OpenRouter API keys.

**One-time owner setup in GitHub and Railway (required):**

1. In GitHub **Settings → Developer settings → OAuth Apps → New OAuth App**,
   set Homepage to `https://christianhola.github.io/-meridian-showcase/agents/`
   and Authorization callback to
   `https://meridian-virtual-desktop-production.up.railway.app/auth/github/callback`.
   Choose a name such as `Meridian Desktop Owner`.
2. In Railway **meridian-virtual-desktop** / Production Variables, set the
   generated `GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET`.
   Never paste the secret into a chat or a GitHub file.
3. Set `DESKTOP_OWNER_GITHUB_ID=245952046` (the verified ID of
   `christianhola`). Keep existing Daytona and OpenRouter secrets intact.
4. Redeploy, open the Agents page, select **Conectar con GitHub**, and
   authorize the owner account once. The pending local task resumes from
   browser session storage without copying any operator token.

**Security design:** The GitHub OAuth code and secret are exchanged *server
side* over HTTPS; the server checks the numeric owner ID using GitHub's
`/user` endpoint and sends the browser a short-lived single-use exchange
ticket in the URL fragment. The browser exchanges it (same approved origin)
for an opaque 8-hour session credential and keeps that credential in
`sessionStorage`, not in the HTML or the model prompt. The session
is in memory on Railway and expires on restart or after eight hours.
No anonymous web visitor can control the private desktop or start a
Daytona sandbox. It is **not** a public desktop service for the community.

The legacy `DESKTOP_ACCESS_TOKEN` remains available only for the separate
manual desktop page while migrating existing operators; the Agents chat
no longer asks for it. Remove the legacy credential after migrating the
manual page if you want to disable that route as well.

`GET /auth/config` reports whether GitHub OAuth is set; `GET
/auth/github/start` begins login; `GET /auth/github/callback` validates
the owner; `POST /auth/exchange` consumes one ticket; `GET
/auth/session` verifies an active session. This is server-enforced
authentication; a static frontend cannot safely skip owner verification.

**Known independent problem:** the public free-model stream sometimes
returns HTTP 403 from `meridian-agents-v2`. Fix that provider
authorization separately; it is unrelated to the private desktop login.
