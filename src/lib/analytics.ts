import { useEffect } from "react";

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, unknown>) => void;
    };
  }
}

export function track(name: string, data?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.umami?.track(name, data);
}

/** Fire `scroll:depth` once per crossed milestone (25/50/75/100) per
 *  route. Uses max-reached depth so scrolling back up doesn't re-fire.
 *  Resets on route change so each page is measured independently. */
export function useScrollDepth(route: string): void {
  useEffect(() => {
    const milestones = [25, 50, 75, 100] as const;
    const fired = new Set<number>();
    let max = 0;

    const measure = (): number => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return 100;
      const y = window.scrollY + window.innerHeight;
      return Math.min(100, Math.round((y / doc.scrollHeight) * 100));
    };

    const onScroll = () => {
      const pct = measure();
      if (pct <= max) return;
      max = pct;
      for (const m of milestones) {
        if (max >= m && !fired.has(m)) {
          fired.add(m);
          track("scroll:depth", { depth: m, route });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Catch a route whose initial viewport already exceeds a milestone
    // (short page, or mounted with scrollY > 0 from restore).
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [route]);
}

const HEARTBEAT_INTERVAL_MS = 15_000;
const HEARTBEAT_MAX_BEATS = 120; // 120 × 15s = 30 min ceiling per route

/** Fire `heartbeat` every 15s while the tab is visible, up to a 30min
 *  ceiling per route. Tied to route so each page's dwell time is
 *  tracked independently and a long idle on one page doesn't bleed
 *  into the next. */
export function useHeartbeat(route: string): void {
  useEffect(() => {
    let seconds = 0;
    let beats = 0;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      if (beats >= HEARTBEAT_MAX_BEATS) return;
      seconds += HEARTBEAT_INTERVAL_MS / 1000;
      beats += 1;
      track("heartbeat", { seconds, route });
    }, HEARTBEAT_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [route]);
}
