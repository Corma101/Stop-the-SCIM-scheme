/**
 * Fills `percentIncrease` on each app in src/data/apps.json from base vs SCIM tier prices.
 *
 * Run: npx tsx scripts/compute-percent-increase.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computePercentIncreaseLabel } from "../src/lib/scimPricing.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APPS_PATH = path.join(__dirname, "..", "src", "data", "apps.json");

type AppRecord = Record<string, unknown> & { slug?: string; percentIncrease?: string };

function main() {
  const raw = fs.readFileSync(APPS_PATH, "utf-8");
  const apps = JSON.parse(raw) as AppRecord[];
  let changed = 0;

  for (const app of apps) {
    const next = computePercentIncreaseLabel(app as Parameters<typeof computePercentIncreaseLabel>[0]);
    const prev = app.percentIncrease;
    if (next === undefined) {
      if (prev !== undefined) changed++;
      delete app.percentIncrease;
      continue;
    }
    if (prev !== next) changed++;
    app.percentIncrease = next;
  }

  fs.writeFileSync(APPS_PATH, JSON.stringify(apps, null, 2) + "\n");
  console.log(`Updated ${apps.length} apps (${changed} percentIncrease values created or cleared).`);
}

main();
