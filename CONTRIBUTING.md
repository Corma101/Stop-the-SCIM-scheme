# Contributing to the SCIM Directory

Thanks for helping keep the app directory accurate. The list is **public and community-maintained**: anyone can propose changes by editing the data file and opening a pull request.

## How to add or edit an app

App data lives in **`src/data/apps.json`**. It’s a single JSON array of app objects. The file is large, so use a local editor rather than GitHub’s web editor.

1. Fork and clone the repo.
2. Edit `src/data/apps.json` (add or change an app). Keep the same structure as other entries (see **Data format** below).
3. Commit and open a Pull request.

No build or sync step is required. After your PR is merged, the site updates on the next deploy.

---

## Data format

Each app in `apps.json` is one object in the array. Required fields (and optional ones) are below. Copy an existing app and change the values; keep the `slug` unique.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes | Unique URL id (e.g. `"notion"`, `"slack"`) |
| `name` | string | Yes | Display name |
| `logo` | string | Yes | URL to app logo image |
| `category` | string | Yes | e.g. `"Productivity / Knowledge Management"` |
| `scimStatus` | string | Yes | One of: `"has-scim"`, `"scim-tax"`, `"no-scim"` |
| `scimTier` | string | Yes | Plan where SCIM is available, or `"N/A"` |
| `manualCost` | string | Yes | e.g. `"$11,754/yr"` |
| `percentIncrease` | string | No | e.g. `"25-90%"` |
| `lastUpdated` | string | No | e.g. `"Jan 2026"` |
| `summary` | string | Yes | Short description |
| `detailedSummary` | string | Yes | Longer description |
| `strategicAlternative` | string | Yes | One-line alternative recommendation |
| `quickFacts` | object | Yes | `scimAvailable`, `scimTierRequired`, `ssoRequired`, `ssoAvailable`, `ssoProtocol`, `docsUrl` |
| `idpSupport` | array | Yes | Objects: `{ "name", "sso", "scim", "notes" }` (scim can be `true`, `false`, or `"limited"`) |
| `costBreakdown` | object | Yes | `orphanedAccounts`, `unusedLicenses`, `itHoursPerYear`, `unusedLicenseCost`, `itLaborCost`, `complianceCost`, `totalAnnualImpact` |
| `pricing` | object | Yes | `plans` (array of `{ name, price, sso, scim }`), `note`, `upgradeCosts` |
| `challenges` | array | Yes | Array of strings |
| `communityQuotes` | array | Yes | Objects: `{ "quote", "source" }` |
| `recommendations` | array | Yes | Objects: `{ "situation", "recommendation" }` |
| `bottomLine` | string | Yes | One-line conclusion |

**JSON rules:** Use double quotes for strings. No trailing commas. Check that brackets and braces match.

---

## Pull request process

1. A maintainer will review your PR.
2. If the JSON is valid and the structure matches existing apps, we’ll merge it.
3. The site updates on the next deploy.

## Questions?

Open a GitHub Issue in this repo and we’ll help.
