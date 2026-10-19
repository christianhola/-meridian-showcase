# Real Daytona Virtual Desktop

A genuine authenticated Node.js HTTP service. Not a demo. It only creates Daytona sandboxes when both DAYTONA_API_KEY and DESKTOP_ACCESS_TOKEN (32+ characters) are configured on the server.

Deploy on Railway with root directory services/virtual-desktop, Node.js 22. Do not put secrets in GitHub Pages or commit them. Configured status is readable at /health. Private desktop has a 30-minute TTL, one sandbox per worker, real screenshot, click, typing, permitted keys, and confirmed apt package installations (mousepad, LibreOffice Writer, GIMP, VLC). No arbitrary shell endpoint.

Auth: Authorization: Bearer DESKTOP_ACCESS_TOKEN, supplied from the browser and kept in memory only. The API allows just https://christianhola.github.io as browser origin. Runtime session maps are in RAM; after process restart sessions must be created again, and TTL cleanup happens in Daytona. Exactly one Railway replica is required. This is an operator-only beta, not a multiuser permission system. Never publish access tokens or expose this service to anonymous users.

Run npm test for contract tests. Live E2E requires actual Daytona credentials. OSWorld is a separate agent benchmark, not a desktop runtime SDK.

Source: https://www.daytona.io/docs/en/computer-use/ and https://github.com/xlang-ai/OSWorld

The agent planner uses OPENROUTER_API_KEY and optionally DESKTOP_VISION_MODEL. It sends a real Daytona screenshot to the model only with explicit UI confirmation, returns one validated action and cannot execute it. The operator must approve a second, distinct action. No model private reasoning is exposed or persisted.

## Snapshot and regional capacity

Do not pin an obsolete snapshot version. With DAYTONA_DESKTOP_SNAPSHOT unset, Daytona SDK selects its default snapshot. Set this variable only to a snapshot confirmed available to your organization. If the Daytona dashboard says **no regions available**, check Snapshots and Limits, or contact Daytona support: a code deployment cannot manufacture regional capacity. Public GitHub Pages does not mean public sandbox previews: the sandbox remains authenticated and ephemeral, with a 30-minute hard TTL. Manual sandbox lifecycle settings in the Daytona dashboard apply to manually created sandboxes, not to this service.

Official troubleshooting: https://www.daytona.io/docs/en/troubleshooting/
