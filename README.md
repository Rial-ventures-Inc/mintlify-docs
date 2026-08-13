# rial-docs

Developer documentation for rial, built on [Mintlify](https://mintlify.com). Replaces the old Vite site at `docs.get-rial.com`.

## Preview locally

```bash
npx mint@latest dev
```

Serves the site at `http://localhost:3000`.

## Validate

```bash
npx mint@latest broken-links
```

## Regenerate the API reference

`api-reference/openapi.json` is generated from `@rial/openapi` in the `rial-platform` monorepo — it is not hand-written. Regenerate it with:

```bash
cd ../rial-platform && bun -e "import('./apps/docs/src/spec-json.ts').then(async m => { const fs = await import('node:fs'); fs.writeFileSync('../rial-docs/api-reference/openapi.json', m.publicSpecJson()); })"
```

Known follow-up: automate this regeneration (e.g. a CI step or git hook) instead of running it by hand.

## Activation (owner)

The repo is complete and validated; three steps remain to go live, all outside this repo:

1. Connect the Mintlify GitHub App to `Rial-ventures-Inc/rial-docs` (mintlify.com dashboard → Add site → this repo).
2. Point `docs.get-rial.com` DNS at Mintlify (CNAME, per Mintlify's custom-domain instructions) and retire the old Vercel project.
3. Confirm the Mintlify project's production branch is `main`.
