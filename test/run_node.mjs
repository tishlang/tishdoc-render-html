import { parseDocument } from "../../tishdoc-parse/dist/tishdoc-parse.js"
import { renderToHtmlFragment, renderToHtmlDocument } from "../dist/tishdoc-render-html.js"

let src = "---\ntitle: T\n---\n\n# Hi\n\n**Bold** text.\n"
let pr = parseDocument(src, {})
let html = renderToHtmlFragment(pr["ast"])
if (html.indexOf("<h1>") === -1) {
  throw new Error("FAIL expect h1")
}
if (html.indexOf("<strong>Bold</strong>") === -1) {
  throw new Error("FAIL expect strong")
}

let full = renderToHtmlDocument(pr["ast"])
if (full.indexOf("<!DOCTYPE html>") === -1) {
  throw new Error("FAIL doctype")
}
if (full.indexOf("@page") === -1) {
  throw new Error("FAIL print css")
}

let leafSrc = "::status {phase=preview}\n"
let prLeaf = parseDocument(leafSrc, {})
let leafHtml = renderToHtmlFragment(prLeaf["ast"])
if (leafHtml.indexOf("tishdoc-leaf-name") === -1) {
  throw new Error("FAIL leaf name span")
}
if (leafHtml.indexOf("phase:") === -1 || leafHtml.indexOf("preview") === -1) {
  throw new Error("FAIL leaf attrs visible")
}

let fenceSrc = "```ts\nlet x = 1\n```\n"
let prFence = parseDocument(fenceSrc, {})
let fenceHtml = renderToHtmlFragment(prFence["ast"])
if (fenceHtml.indexOf("tish-hl-keyword") === -1) {
  throw new Error("FAIL fenced code highlight: " + fenceHtml.slice(0, 200))
}
if (fenceHtml.indexOf("language-ts") === -1) {
  throw new Error("FAIL fence lang class")
}

console.log("all html render tests passed")
