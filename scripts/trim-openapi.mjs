// Docs copy of the spec: production only, first paragraph of every description.
import { readFileSync, writeFileSync } from 'node:fs';

const [src, dst] = process.argv.slice(2);
const spec = JSON.parse(readFileSync(src, 'utf8'));

const first = (text) =>
  typeof text === 'string' ? text.trim().split(/\n\s*\n/)[0].replace(/\s+/g, ' ').trim() : text;

spec.info.title = 'rial API';
spec.info.description = 'Prove a photo is real. Base URL: https://api.rial.io';
spec.servers = [{ url: 'https://api.rial.io', description: 'Production' }];

for (const ops of Object.values(spec.paths ?? {})) {
  for (const [method, op] of Object.entries(ops)) {
    if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue;
    if (op.description) op.description = first(op.description);
    for (const p of op.parameters ?? []) if (p.description) p.description = first(p.description);
    const body = op.requestBody?.description;
    if (body) op.requestBody.description = first(body);
    for (const r of Object.values(op.responses ?? {})) if (r.description) r.description = first(r.description);
  }
}
const walk = (node) => {
  if (Array.isArray(node)) return node.forEach(walk);
  if (node && typeof node === 'object') {
    if (typeof node.description === 'string') node.description = first(node.description);
    Object.values(node).forEach(walk);
  }
};
walk(spec.components ?? {});
writeFileSync(dst, JSON.stringify(spec, null, 2) + '\n');
