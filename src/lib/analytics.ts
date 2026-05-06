/**
 * Analytics — currently a no-op stub.
 *
 * The previous implementation pointed at a self-hosted Umami instance
 * at analytics.pomegra.io. That dependency was removed; this module
 * stays so existing call sites (~13 components) keep compiling without
 * having to import from elsewhere or be edited piecemeal. To re-enable
 * analytics, replace the bodies below with whichever provider you wire
 * up — there's no consumer-side change needed.
 */

export function track(name: string, data?: Record<string, unknown>): void {
  void name;
  void data;
}

export function useScrollDepth(route: string): void {
  void route;
  /* no-op — was scroll-depth milestone tracking on the old umami pipe */
}

export function useHeartbeat(route: string): void {
  void route;
  /* no-op — was per-route dwell-time heartbeat on the old umami pipe */
}
