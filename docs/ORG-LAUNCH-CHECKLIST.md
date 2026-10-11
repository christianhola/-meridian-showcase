# Organization launch: Meridian + Nexviro

## Decisions and creation (requires GitHub organization owner)
1. Create the organization **meridian-community** in GitHub's organization creation flow, if the name is available.
2. Add description, public contact method and brand image; verify any domain before including official links.
3. Enable strong authentication, least privilege, organization audit access and protected branch policies.
4. Create a **public** repository named `.github` under that organization.
5. Copy **the contents** of `blueprints/organization-github/` to the **root** of `.github`. The organization's public profile is then `profile/README.md`.
6. Create `awesome-meridian` from `blueprints/awesome-meridian/README.md`.
7. Decide whether to transfer the existing community portal repo or create a fresh community repo with filtered history. **Never transfer Meridian API or other private backends by accident.**
8. Choose and apply licenses **per published repository**. Review historical commits and data before changing visibility.
9. Configure security advisories, secret scanning, labels, Discussions and branch protection.
10. Publish links only after verifying their destinations and public access.

## Repository naming
- `plugin-*`, `template-*`, `starter-*`, `sdk-*`, `integrations-*`, `mcp-*`.
- Standardize metadata, a readable README, contribution instructions, security process and per-repo license.

## Launch gates
- All builds and tests pass on the intended public branch.
- No credentials or personal data in full Git history or Actions logs.
- Public documentation is approved; no private admin endpoints or operational secrets.
- External links (website, docs, Discord) actually resolve.
- Project catalog lists only reviewed public repos.
- A moderator and a security disclosure path are ready.

## Deployment
The current portal uses Vite and can be served as a static website. Do not deploy or touch production as a side effect of GitHub changes. Set up Preview first and verify links and performance before publishing a domain.

GitHub's global default community-health files are applied from a **public** `.github` repository and are overridden by repository-specific files.
