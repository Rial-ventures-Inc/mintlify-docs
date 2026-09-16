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

`api-reference/openapi.json` is a docs copy of the platform's public spec: production
server only, every description trimmed to its first paragraph. Never edit it by hand.

```bash
scripts/sync-openapi.sh            # expects ../rial-platform (or RIAL_PLATFORM_DIR)
```

Run it whenever the public API changes, before pushing.

## Activation (owner)

The repo is complete and validated; three steps remain to go live, all outside this repo:

1. Connect the Mintlify GitHub App to `Rial-ventures-Inc/rial-docs` (mintlify.com dashboard → Add site → this repo).
2. Point `docs.get-rial.com` DNS at Mintlify (CNAME, per Mintlify's custom-domain instructions) and retire the old Vercel project.
3. Confirm the Mintlify project's production branch is `main`.
