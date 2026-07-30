---
name: bootstrap-sprout-project
description: Bootstrap a new client website from the Sprout (Next.js + Sanity) boilerplate — clone the template, install deps, create and configure a fresh Sanity project, seed content, and stand up a private GitHub repo. Use when starting a new client site on this stack, or when the user says "new client project," "bootstrap sprout," "start a new site."
---

# Bootstrap a Sprout client project

> **Naming note:** this skill and the underlying template are currently named
> after "Sprout," the purchased boilerplate this process started from. Once
> we replace it with a bespoke, owned starter template, rename this skill
> (and update the clone URL below) from Sprout → Sumner, and consider a more
> descriptive name than "sprout-project." Don't let this note go stale —
> update it the moment that swap happens.

## Prerequisites (one-time, per machine — skip if already done)

These are NOT part of the per-project flow. Verify once per dev machine:

- Node (version pinned in the template's `.nvmrc`, currently `22.13.0`) via `nvm`
- Yarn (via corepack: `corepack enable && corepack prepare yarn@stable --activate`)
- Sanity CLI: `npm install --global sanity@latest`
- `gh` CLI installed and authenticated (`gh auth status`)
- SSH key on this machine added to the GitHub account that has access to
  `sprout-store/sprout`

If any of these are missing, set them up first — see git history / prior
session notes for the exact steps (Homebrew → nvm → Node → yarn → gh).

## Per-project steps

Ask the user for, if not already provided:
- **Project/client name** (used as folder name, GitHub repo name, Sanity
  project name — keep them consistent, e.g. `client-name-site`)
- **Sanity organization ID** to create the new project under (find via
  `sanity projects list` against an existing project, or ask the user)
- **Target directory** (default: `~/Projects/<project-name>`)

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

### 3. Set up environment file

```
cp .env.example .env.development
```

### 4. Create and configure the Sanity project

```
sanity login   # only if not already logged in — will need a --provider flag
               # (google/github/sanity) since login fails in unattended mode
               # with multiple providers available

sanity init --bare -y --organization <ORG_ID> --project-name "<project-name>" \
  --dataset-default --json
```

`--bare` skips studio scaffolding (the template already has one) and just
provisions the project + dataset. Get the new project ID via:

```
sanity projects list
```

Add the project ID to **both** spots in `.env.development`:
```
SANITY_PROJECT_ID="<id>"
NEXT_PUBLIC_SANITY_PROJECT_ID="<id>"
```

### 5. Configure Sanity API access (via browser — Sanity dashboard)

Navigate to `https://www.sanity.io/organizations/<ORG_ID>/project/<PROJECT_ID>/api`:

- **CORS origins** → Add `http://localhost:3000` with **Allow credentials** checked
- **Tokens** → Add API token named `Sanity API + Webhooks Token`, permission **Editor**

**⚠️ Critical gotcha:** do NOT manually transcribe the token from a
screenshot — screenshots are unreliable for long secrets (0/O, l/I, etc. are
visually ambiguous, and this cost real debugging time once already). Instead:
1. Click the page's own "Copy Token" button (copies to system clipboard)
2. Read it via `pbpaste` in Bash and write it into `.env.development`
   programmatically — never re-type it by hand or by reading pixels.

```
SANITY_API_TOKEN="<paste from pbpaste>"
```

### 6. Seed initial content

```
yarn migrate:initialize:production
```

**Note:** as of the Sprout template, this seeds ecommerce demo content
(products, merch collection) via Shopify-dependent blocks. If this is a
non-ecommerce project (e.g. a portfolio site), the homepage will render
blank after this step until the ecommerce blocks are swapped for
content-only ones (`pageRichText`, `fullWidthHeroCarousel`, `ticker`, or
custom blocks like `projectGrid`). This is expected, not a bug — see the
project's `CLAUDE.md` (once it exists) for the page-builder architecture.

### 7. Start the dev server and verify

```
yarn start
```

Visit `http://localhost:3000` and `http://localhost:3000/admin` (embedded
Sanity Studio) to confirm both the frontend and CMS are working.

### 8. Create a private GitHub repo and push

Via `gh` CLI (once authenticated, this replaces the manual browser flow used
the first time this process ran):

```
gh repo create <owner>/<project-name> --private --source=. --remote=origin --push
```

If `gh` isn't authenticated yet, fall back to creating the repo at
`github.com/new` in the browser (owner's own account, **Private** visibility
— never Public, these are client repos), then:

```
git remote add origin git@github.com:<owner>/<project-name>.git
git add -A
git commit -m "Initial commit"
git push -u origin main
```

Confirm `.env.development` is gitignored before the first commit — it holds
the Sanity API token. Check with `git check-ignore -v .env.development`.

## Open questions / TODO as this evolves

- [ ] Verify whether `sanity cors add <origin> --credentials` (CLI) can
      replace the manual browser step for CORS config — untested so far.
- [ ] Once the bespoke starter template exists, replace the ecommerce-seeded
      homepage with a neutral/blank starting point so step 6's caveat goes away.
- [ ] Rename this skill + template references from Sprout → Sumner once the
      template is fully owned rather than purchased.
