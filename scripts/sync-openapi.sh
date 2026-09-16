#!/usr/bin/env bash
# Regenerates api-reference/openapi.json from the platform's public spec:
# production server only, descriptions trimmed to their first paragraph.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PLATFORM="${RIAL_PLATFORM_DIR:-$HERE/../rial-platform}"
OUT="$HERE/api-reference/openapi.json"
(cd "$PLATFORM" && bun -e "import('./apps/docs/src/spec-json.ts').then(m => process.stdout.write(m.publicSpecJson()))") > "$OUT.raw"
node "$HERE/scripts/trim-openapi.mjs" "$OUT.raw" "$OUT"
rm "$OUT.raw"
echo "wrote $OUT"
