# Working in this repo

- Commit code changes to `staging` and push it; Vercel builds the preview at https://studio-sumner-site-git-staging-studio-sumner.vercel.app.
- Never push straight to `main`: every push to `main` deploys the live site. Merge `staging` into `main` only after Christopher approves the preview, then push `main`.
- Content lives in Sanity and needs no deploy. See [docs/editing-content.md](docs/editing-content.md).
