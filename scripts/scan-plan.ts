#!/usr/bin/env bun
/**
 * Print the deterministic source map the Claude/WebFetch collector must use.
 *
 * This is not a scraper by itself. It gives the scheduled agent a concrete,
 * auditable list of portals, official sources, developer pages, queries,
 * opportunity signals, and duplicate keys to search every run.
 */
import { SCAN_SOURCES } from "../src/data/scan-plan.ts";

const asJson = process.argv.includes("--json");

if (asJson) {
  console.log(JSON.stringify({ sources: SCAN_SOURCES }, null, 2));
} else {
  for (const source of SCAN_SOURCES) {
    console.log(`# ${source.label} (${source.id})`);
    console.log(`kind: ${source.kind}`);
    console.log(`cadence: ${source.cadence}`);
    console.log(`categories: ${source.categories.join(", ")}`);
    console.log("urls:");
    for (const url of source.urls) console.log(`  - ${url}`);
    console.log("queries:");
    for (const query of source.queries) console.log(`  - ${query}`);
    console.log("signals:");
    for (const signal of source.opportunitySignals) console.log(`  - ${signal}`);
    console.log("dedupe keys:");
    for (const key of source.dedupeKeys) console.log(`  - ${key}`);
    console.log();
  }
}
