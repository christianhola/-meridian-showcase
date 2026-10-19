# Real Daytona Virtual Desktop

A genuine authenticated Node.js HTTP service. Not a demo. It only creates Daytona sandboxes when both DAYTONA_API_KEY and DESKTOP_ACCESS_TOKEN (32+ characters) are configured on the server.

Deploy on Railway with root directory services/virtual-desktop, Node.js 22. Do not put secrets in GitHub Pages or commit them. Configured status is readable at /health. Private desktop has a 30-minute TTL, one sandbox per worker, real screenshot, click, typing, permitted keys, and confirmed apt package installations (mousepad, LibreOffice Writer, GIMP, VLC). No arbitrary shell endpoint.

Auth: Authorization: Bearer DESKTOP_ACCESS_TOKEN, supplied from the browser and kept in memory only. The API allows just https://christianhola.github.io as browser origin. Runtime session maps are in RAM; after process restart sessions must be created again, and TTL cleanup happens in Daytona. Exactly one Railway replica is required. This is an operator-only beta, not a multiuser permission system. Never publish access tokens or expose this service to anonymous users.

Run npm test for contract tests. Live E2E requires actual Daytona credentials. OSWorld is a separate agent benchmark, not a desktop runtime SDK.

Source: https://www.daytona.io/docs/en/computer-use/ and https://github.com/xlang-ai/OSWorld
