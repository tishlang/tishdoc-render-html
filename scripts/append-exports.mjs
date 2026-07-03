#!/usr/bin/env node
/**
 * Append `export { name };` lines to a Tish `--target js` bundle (ESM).
 *
 * Usage:
 *   TISH_EXPORT_OUT=dist/<bundle>.js \
 *     TISH_EXPORT_NAMES=fnA,fnB \
 *     node scripts/append-exports.mjs
 *
 * Standalone replacement for `tish-creator/scripts/js_append_exports.tish`
 * so this package no longer depends on the tish-creator workspace layout.
 */
import fs from "node:fs";
import path from "node:path";

const out = process.env.TISH_EXPORT_OUT;
const names = (process.env.TISH_EXPORT_NAMES ?? "").split(",").map((s) => s.trim()).filter(Boolean);

if (!out || names.length === 0) {
  console.error("usage: TISH_EXPORT_OUT=dist/x.js TISH_EXPORT_NAMES=a,b node scripts/append-exports.mjs");
  process.exit(1);
}

const abs = path.isAbsolute(out) ? out : path.resolve(process.cwd(), out);
let s = fs.readFileSync(abs, "utf8");
if (!s.endsWith("\n")) s += "\n";
for (const name of names) {
  const pattern = new RegExp(`export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}`);
  if (!pattern.test(s)) s += `export { ${name} };\n`;
}
fs.writeFileSync(abs, s);
console.log(`appended exports to ${abs}: ${names.join(", ")}`);
