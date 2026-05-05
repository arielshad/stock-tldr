import raw from "./sweeps.json";
import type { SweepLog, SweepReport } from "./schema";

export const sweepLog = raw as SweepLog;

/**
 * All sweep reports sorted newest-first by timestamp. The underlying
 * sweeps.json is append-only (agent only ever pushes new entries), so
 * normally the last entry is the newest — but we sort defensively in
 * case an out-of-order manual backfill lands.
 */
export const allSweeps = (): SweepReport[] =>
  [...sweepLog.sweeps].sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : -1,
  );

export const sweepCount = (): number => sweepLog.sweeps.length;

/**
 * Total items added across every sweep in the log. Used in the nav
 * badge so users get a sense of the log's scale at a glance.
 */
export const totalItemsAdded = (): number =>
  sweepLog.sweeps.reduce((sum, s) => sum + s.counts.added, 0);
