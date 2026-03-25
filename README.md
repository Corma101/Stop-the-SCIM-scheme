# Stop the SCIM Scheme

**Security is not a premium feature.**

[SCIM](https://scim.cloud) (System for Cross-domain Identity Management) is the standard for automated user provisioning and deprovisioning. When someone joins, their access should appear instantly. When they leave, it should disappear just as fast. That’s baseline identity hygiene — not an upsell.

Yet many vendors lock SCIM behind their most expensive “Enterprise” tiers, often doubling or tripling the cost just to get lifecycle automation. They charge more to remove access. They monetize what should be included by default.

**We call that the SCIM Scheme.**

This project is a **community-driven directory** that documents which apps support SCIM, which ones hide it behind a paywall (“SCIM tax”), and which don’t support it at all — so IT teams and buyers can see who actually values security and who treats it as a premium add-on.

**→ Find the app: [scim-scheme.org](https://scim-scheme.org/)**

---

## What’s in the directory

- **Has SCIM** — Automated provisioning/deprovisioning available without an enterprise upsell  
- **SCIM Tax** — SCIM gated behind higher-tier or enterprise plans  
- **No SCIM** — No automated provisioning; manual account management only  

For each app we track SCIM status, pricing tiers, manual cost of *not* automating, IdP support, and practical recommendations. The goal is transparency: stop the scheme by naming it.

---

## Contribute

The list is **public and community-maintained**. Anyone can add or correct apps.

- **Live app:** [scim-scheme.org](https://scim-scheme.org/)  
- **Repo:** [github.com/Corma101/Stop-the-SCIM-scheme](https://github.com/Corma101/Stop-the-SCIM-scheme)  
- **How to contribute:** See [CONTRIBUTING.md](./CONTRIBUTING.md) — app data lives in `src/data/apps.json`; edit and open a PR.  
- **Found a new SCIM paywall?** Open an issue or PR and we’ll add it.

---

## Run locally

```bash
git clone https://github.com/Corma101/Stop-the-SCIM-scheme.git
cd Stop-the-SCIM-scheme
npm i
npm run dev
```

Requires Node.js and npm. The app is a React + Vite + TypeScript frontend; app data is loaded from `src/data/apps.json`.

---

## Tech

Vite, React, TypeScript, Tailwind CSS, shadcn/ui. No backend; the directory is static data plus a searchable, filterable UI.
