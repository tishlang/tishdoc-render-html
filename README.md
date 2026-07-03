# @tishlang/tishdoc-render-html

Tish-native renderer that walks a [`@tishlang/tishdoc-parse`](https://github.com/tishlang/tishdoc-parse) AST and emits **safe, semantic HTML**. Suitable for rendering Markdown documents (e.g. extension marketplace READMEs, docs sites, lesson content) inside any host that wants a Lattish/Tish-only stack.

## Install

```bash
npm install @tishlang/tishdoc-render-html @tishlang/tishdoc-parse @tishlang/tish-syntax-highlight
```

## Usage (Tish)

```tish
import { parseDocument } from "@tishlang/tishdoc-parse"
import { renderToHtmlFragment, renderToHtmlDocument, defaultPrintCss } from "@tishlang/tishdoc-render-html"

let pr = parseDocument(source, null)
let html = renderToHtmlFragment(pr.ast)
```

## Exports

- `renderToHtmlFragment(ast) -> string` — HTML body fragment.
- `renderToHtmlDocument(ast) -> string` — full `<!doctype html>` doc with print CSS.
- `defaultPrintCss() -> string` — print/screen CSS used by `renderToHtmlDocument`.

## What's rendered

Headings, paragraphs, lists (ordered + unordered), fenced code (highlighted via `@tishlang/tish-syntax-highlight`), blockquotes, thematic breaks, GFM tables (with column alignment), inline code, **bold**, *italic*, ~~strikethrough~~, hard line breaks, links, images, autolinks, `:::directives`, and `::leaf{…}` directives.

## Safety

URLs in `<a href>` and `<img src>` are restricted to `http`, `https`, `mailto`, and relative paths / fragments. Anything else (e.g. `javascript:`) is dropped — the link text is rendered verbatim instead.

## Build

```bash
tish build --target js --no-optimize src/main.tish -o dist/tishdoc-render-html.js
TISH_EXPORT_OUT=dist/tishdoc-render-html.js \
  TISH_EXPORT_NAMES=renderToHtmlFragment,renderToHtmlDocument,defaultPrintCss \
  node scripts/append-exports.mjs
```

The renderer imports `@tishlang/tish-syntax-highlight` via a sibling relative path (`../../tish-syntax-highlight/src/main.tish`) so consumers that vendor both packages side-by-side (or that install both into `node_modules`) work without extra configuration.
