---
name: bootstrap-sprout-project
description: Kick off a new client website on the Sprout (Next.js + Sanity) boilerplate — set up the client, contact and project in Bonsai, then clone the template, install deps, create and configure a fresh Sanity project, seed content, and stand up a private GitHub repo. Use when starting a new client or client site on this stack, or when the user says "new client," "new client project," "bootstrap sprout," "start a new site."
---

# Kick off a Sprout client project

> **Naming note:** this skill and the underlying template are currently named
> after "Sprout," the purchased boilerplate this process started from. Once
> we replace it with a bespoke, owned starter template, rename this skill
> (and update the clone URL below) from Sprout → Sumner, and consider a more
> descriptive name than "sprout-project." Don't let this note go stale —
> update it the moment that swap happens.

Two phases: **client and project setup** in Bonsai (can start as soon as a
proposal goes out), then the **technical bootstrap**. Run them together or
separately — a new client often gets phase 1 at proposal time and phase 2 at
kickoff.

## Prerequisites (one-time, per machine — skip if already done)

These are NOT part of the per-project flow. Verify once per dev machine:

- Node (version pinned in the template's `.nvmrc`, currently `22.13.0`) via `nvm`
- Yarn (via corepack: `corepack enable && corepack prepare yarn@stable --activate`)
- Sanity CLI: `npm install --global sanity@latest`
- `gh` CLI installed and authenticated (`gh auth status`)
- SSH key on this machine added to the GitHub account that has access to
  `sprout-store/sprout`
- Bonsai connector connected in Claude (Settings → Connectors). A connector
  added mid-session only loads in a **new** session.

If any of these are missing, set them up first — see git history / prior
session notes for the exact steps (Homebrew → nvm → Node → yarn → gh).

## Gather first

Ask the user for, if not already provided:
- **Client name** and **domain** (e.g. `lightswitchpm.com`)
- **Primary contact** — full name and email
- **Fee and payment schedule** (default: fixed fee, 50% to begin, 25% at
  design approval, 25% at launch)
- **Project/repo name** (used as folder name, GitHub repo name, Sanity
  project name — keep them consistent, e.g. `client-name-site`)
- **Target directory** (default: `~/Projects/<project-name>`)

## Phase 1: Client and project in Bonsai

Use the Bonsai connector tools. Search before creating — every create call
makes a new record.

1. **Company:** `list_companies` (by name) → `create_company` with `name`,
   `domains`, `industry` and a one-line `description` (what they do + what
   we're doing for them + proposal date).
2. **Contact:** `list_contacts` (by email) → `create_contact` with
   `company_id`, then `update_company` to set `default_contact_id`.
3. **Project:** `list_projects` (by title) → `create_project` with
   `billing_type: fixed_fee`, `billing_fee`, `currency: USD`. Leave
   `finish_date` open until kickoff sets the schedule.
4. Share the Bonsai links (`url` on each result) with the user.

**What the connector can't do — hand these to the user:**
- **Deals / pipeline:** no create-deal tool; add in the Bonsai app if tracked.
- **Project budget:** can't be set via the connector; set it in the app.
- **Invoices:** Claude Code's permission check blocks `create_invoice` as a
  financial transaction. Give the user the exact invoice details to enter
  (title, line item, amount, due terms) — e.g. `<Project>: deposit (1 of 3)`,
  50% of the fee, due upon receipt — unless they've allowed invoice creation
  in their permission settings.

## Phase 2: Technical bootstrap

### 1. Clone the template

```
git clone git@github.com:sprout-store/sprout.git <project-name>
cd <project-name>
git remote remove origin
```

(This is the line to change when we swap in a bespoke starter template.)

### 2. Install dependencies

```
yarn install
```

The upstream template isn't on Yarn 4 yet, so this migrates it (rewrites
`yarn.lock`, adds `.yarn/` and `.yarnrc.yml`). Commit the untouched template
now — `git add -A && git commit -m "Start from Sprout template"` — so later
changes are reviewable against it.

### 3. Set up environment file

```
cp .env.example .env.development
```

Replace Sprout's shared defaults for `SANITY_WEBHOOK_SECRET` and
`NEXT_PUBLIC_CMS_PREVIEW_TOKEN` with random values (e.g.
`python3 -c "import secrets; print(secrets.token_hex(24))"`).

### 4. Create the Sanity project

```
sanity login   # only if not already logged in — will need a --provider flag
               # (google/github/sanity) since login fails in unattended mode
               # with multiple providers available

sanity init --bare -y --organization <ORG_ID> --project-name "<project-name>" \
  --dataset-default --json
```

**Finding the org ID:** open `https://www.sanity.io/manage/project/<any existing
project id>` in the browser — it redirects to
`/organizations/<ORG_ID>/project/...`. (Chris's org: `osTanEvWT`.)

`--bare` skips studio scaffolding (the template already has one) and just
provisions the project + dataset. Get the new project ID via
`sanity projects list` and add it to **both** spots in `.env.development`:

```
SANITY_PROJECT_ID="<id>"
NEXT_PUBLIC_SANITY_PROJECT_ID="<id>"
```

### 5. Configure Sanity API access (CLI)

Run from the project folder (`sanity.cli.js` reads the project ID from the env):

```
sanity cors add http://localhost:3000 --credentials
sanity tokens add "Sanity API + Webhooks Token" --role=editor --json
```

**Never print or hand-copy the token.** Pipe the `--json` output straight into
`.env.development`, e.g.:

```
sanity tokens add "Sanity API + Webhooks Token" --role=editor --json 2>/dev/null \
  | python3 -c "import sys,json,re,pathlib; t=json.load(sys.stdin)['key']; p=pathlib.Path('.env.development'); p.write_text(re.sub(r'^SANITY_API_TOKEN=\".*\"', f'SANITY_API_TOKEN=\"{t}\"', p.read_text(), flags=re.M))"
```

(Fallback if the CLI fails: the project's API page in the Sanity dashboard —
use its "Copy Token" button + `pbpaste`; never transcribe from a screenshot.)

### 6. Strip ecommerce (optional — marketing sites only)

**Skip this step if the client sells products** (Shopify store). Ask the user
if it isn't clear from the brief.

Sprout ships with Shopify, cart, product/collection pages, Klaviyo newsletter
and Algolia search. For marketing sites, remove them before seeding — most
of it is marked with `// ECOMM` / `// ECOMMERCE` comments. Reference
implementation: `chrisfromsumner/lightswitch-site`, commit
"Remove ecommerce features from Sprout template". In short:

- Delete `src/plugins/shopify`, `src/pages/products`, `src/pages/collections`,
  `src/pages/api/shopify-product-sync.js`, `src/theme` (Liquid),
  `src/migrations/02.ecomm.js`, and the cart/product/currency/newsletter
  components, hooks, schemas and utils.
- Unwire them from `sanity.config.js`, `src/schemas/schema.js`,
  `src/admin/deskStructure.js`, `src/api/queries.js`, `src/api/sanity.js`,
  `src/pages/_app.jsx`, `src/stores/useStore.js`, `Header`, `Footer`, `Link`,
  `Image`, `PageComponentList`, and the revalidate/preview/sitemap API routes.
- Remove `algoliasearch` and `klaviyo-subscribe` from `package.json`, and the
  Shopify block from `.env.example`.
- Rename site config (`config.js` site name and cookie keys, Studio
  `name`/`title`) to the client.
- Rewrite `src/migrations/01.initialize.js` to seed the client's pages,
  header/footer links, 404 and SEO defaults instead of the T-shirt demo.

Verify every relative import still resolves and `yarn eslint src` has no
errors, then commit.

### 7. Seed initial content

```
yarn migrate:initialize:production
```

(If you skipped step 6, this seeds the Shopify demo and the homepage renders
blank until those blocks are swapped for content-only ones.)

### 8. Start the dev server and verify

```
yarn start
```

Check the frontend, `/admin` (embedded Sanity Studio — sign in with the
Sanity account that owns the project) and `/sitemap.xml`.

**Port gotcha:** if another Sprout project's dev server holds 3000, Next
silently moves to 3001 and requests to :3000 hit the *other* site. Read the
server's startup line for the real port, and add it to CORS
(`sanity cors add http://localhost:3001 --credentials`) or the Studio won't
load.

### 9. Create a private GitHub repo and push

Confirm `.env.development` is gitignored first — it holds the Sanity API
token: `git check-ignore -v .env.development`. Then:

```
gh repo create <owner>/<project-name> --private --source=. --remote=origin --push
```

If `gh` isn't authenticated yet, fall back to creating the repo at
`github.com/new` in the browser (owner's own account, **Private** visibility
— never Public, these are client repos), then:

```
git remote add origin git@github.com:<owner>/<project-name>.git
git push -u origin main
```

## Handoff (at launch)

We build in our own accounts and transfer at launch so the client owns
everything:
- GitHub repo → transfer to the client's org (Settings → Transfer).
- Sanity project → client creates an org and adds us as admin; move the
  project into it.
- Vercel → client's Pro team; connect the transferred repo (or transfer the
  Vercel project), re-enter env vars, point their domain.
- Recorded walkthrough of editing in the Studio; then remove our access.

## Open questions / TODO as this evolves

- [x] ~~Verify whether `sanity cors add <origin> --credentials` (CLI) can
      replace the manual browser step for CORS config~~ — works (2026-10-01).
- [ ] Once the bespoke starter template exists, bake in the ecommerce removal
      (step 6) and a neutral seed so steps 6–7 collapse into one.
- [ ] Rename this skill + template references from Sprout → Sumner once the
      template is fully owned rather than purchased.
- [ ] Add Bonsai deal creation and invoicing here if the connector gains a
      create-deal tool or invoice creation is allowed in permissions.
