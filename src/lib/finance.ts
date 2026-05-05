/**
 * Tiny helpers for finance-flavoured rendering.
 *
 * Kept generous on input formats because the agent emits `metrics`
 * with whatever phrasing the source page used:
 *
 *   "Move":              "+8.4% AH"
 *   "Move (next day)":   "-3.8%"
 *   "Move (24h)":        "+5.2%"
 *   "Move":              "−9.8% premarket"  // unicode minus
 */

export interface MoveInfo {
  pct: number;
  /** Human label (timeframe / qualifier) — e.g. "AH", "next day", "24h". */
  label?: string;
  /** Original raw string from metrics. */
  raw: string;
}

/**
 * Find the first metrics entry whose key starts with "Move" (case-
 * insensitive) and parse a signed percentage out of its value. Tolerant
 * of unicode minus signs and trailing labels like "AH" / "premarket".
 *
 * Returns null when no Move entry is present or the value can't be parsed.
 */
export function extractMove(
  metrics: Record<string, string | number> | undefined,
): MoveInfo | null {
  if (!metrics) return null;
  for (const [key, val] of Object.entries(metrics)) {
    if (!/^move\b/i.test(key)) continue;
    const raw = String(val);
    const m = raw.match(/([+\-−])?\s*(\d+(?:\.\d+)?)\s*%/);
    if (!m) continue;
    const sign = m[1] === "-" || m[1] === "−" ? -1 : 1;
    const pct = sign * parseFloat(m[2]);
    // Strip the matched percentage from the raw string for the label.
    const after = raw.slice((m.index ?? 0) + m[0].length).trim();
    // Also use the key's parenthetical qualifier if present, e.g.
    // "Move (next day open)" → "next day open".
    const keyMatch = key.match(/\(([^)]+)\)/);
    const label =
      after && after.length <= 24
        ? after
        : keyMatch
          ? keyMatch[1]
          : undefined;
    return { pct, label, raw };
  }
  return null;
}

/** Format a move as `+8.4%` / `-3.8%` with one decimal. */
export function formatMovePct(pct: number): string {
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct.toFixed(Math.abs(pct) >= 10 ? 1 : 1)}%`;
}

/** Direction → CSS modifier suffix used by `.move-up` / `.move-down` / `.move-flat`. */
export function moveDirection(pct: number): "up" | "down" | "flat" {
  if (pct > 0.01) return "up";
  if (pct < -0.01) return "down";
  return "flat";
}
