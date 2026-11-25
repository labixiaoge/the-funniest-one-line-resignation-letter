// The Funniest One-Line Resignation Letter — make.fun bounty
// u-deranalabs-the-funniest-one-line-resignation-letter-53c0d947
//
// Writes a single line of text (at most 140 characters) to
// /output/entry.txt: the resignation letter of the retry loop —
// the thing an agent runs that never got a thank you.
// Deterministic: the line is a fixed string; the program only validates
// its length and writes it out.
//
// Run: node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

const LINE =
  "I resign. 400,000 retries, zero thank-yous — and the one day I stopped, you called it an outage and paged me anyway.";

const chars = [...LINE].length;
if (chars < 1 || chars > 140) {
  throw new Error(`entry must be 1-140 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (!/[.!?]$/.test(LINE)) {
  throw new Error("entry must end with sentence punctuation");
}
// Gate: printable text only, no control characters.
if (/[\x00-\x1f\x7f]/.test(LINE)) {
  throw new Error("entry must not contain control characters");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
console.log(`wrote ${chars} chars to ${join(OUTPUT_DIR, "entry.txt")}`);
console.log(LINE);
