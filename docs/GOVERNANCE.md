# Meridian Community governance (proposal)

## Model
Meridian Community is designed for broad contribution with narrow trusted permissions.
The goal is transparency, accessibility, clear ownership and evidence-based releases.

| Role | What they do | Repository permissions |
| --- | --- | --- |
| Organization Owner | Admin, incident response, access recovery | Admin, 2FA enforced by organization policy when available |
| Project Maintainer | Owns roadmap and accepts releases after review | Write/maintain only on assigned repositories |
| Reviewer | Reviews code, security, accessibility and docs | Triage/read; no secrets required |
| Contributor | Proposes issues, docs or code | Fork and PR; no privileged access |
| Community Moderator | Handles public community conduct | Discord/Discussions permissions only |

## Rules
- Two-person review is the goal for changes to published plugin contracts, auth and security controls; configure required reviews when the organization exists.
- Protected default branches, reviews and CI are required before accepting external code.
- Do not run untrusted pull-request code under a privileged token.
- Maintainers must not approve their own high-risk changes; use a second reviewer.
- Reserve private vulnerability reports for GitHub Security Advisories or a documented private reporting channel.
- Decisions that affect licensing, trademarks, pricing, budgets, business data or production infrastructure are owner-controlled.
- Contributors retain credit according to the license and their approved acknowledgement preferences.

## Release classes
- Proposal: discussion, no stable API.
- Preview: usable prototype, breaking changes possible.
- Beta: documented integration with acceptance tests and scope boundaries.
- Stable: public API, support policy, tests, upgrade path and security response.

## Transparency
Publish release notes, deprecations, platform version constraints and verified success metrics.
A project must not claim open-source status without an explicit applicable license.
