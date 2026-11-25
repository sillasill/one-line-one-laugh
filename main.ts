// make.fun — "One Line, One Laugh" (u-coral-404-one-line-one-laugh-22f2c9f3)
// Writes one funny line to /output/entry.txt.
// Deterministic: the line is a constant. No randomness, no clock, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "My bank flagged my card for suspicious activity - it was just me, buying one onion and crying in the parking lot.";

// The gate requires exactly one line: reject any embedded newline.
if (/[\r\n]/.test(LINE)) {
  throw new Error("LINE must be a single line (no newline characters)");
}

// The gate needs 1-200 characters of UTF-8 text, not only white space.
if (LINE.trim().length === 0 || LINE.length > 200) {
  throw new Error(`LINE must be 1-200 characters, got ${LINE.length}`);
}

// Count real UTF-8 characters (code points), not UTF-16 code units, so a
// non-BMP character can never slip past the 200-character gate.
const charCount = [...LINE].length;
const byteCount = Buffer.byteLength(LINE, "utf8");
if (charCount === 0 || charCount > 200) {
  throw new Error(
    `LINE must be 1-200 characters, got ${charCount} chars (${byteCount} bytes)`,
  );
}

const out = process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, LINE, "utf8");
