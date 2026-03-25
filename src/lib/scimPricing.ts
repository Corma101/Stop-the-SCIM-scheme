/**
 * SCIM-related pricing resolution for directory UI and batch scripts.
 * Kept free of apps.json imports so Node scripts can reuse it.
 */

export type ScimPricingAppLike = {
  slug: string;
  name: string;
  scimStatus: string;
  scimTier: string;
  quickFacts?: { scimTierRequired?: string };
  pricing?: { plans: { name: string; price: string; sso: boolean; scim: boolean }[] };
  challenges?: string[];
  summary?: string;
  detailedSummary?: string;
};

function firstPriceInText(text: string): string | null {
  const re =
    /\$[\d,]+(?:\.\d+)?(?:-\$?[\d,]+(?:\.\d+)?)?\/(?:user|seat)\/(?:mo|month)\b|\$[\d,]+(?:\.\d+)?\/mo\b/gi;
  const m = re.exec(text);
  return m ? m[0].replace(/\/month\b/i, "/mo") : null;
}

function tierFromChallenges(challenges: string[] | undefined): string {
  if (!challenges?.length) return "";
  const c = challenges.join(" ");
  const m = c.match(/only at ([A-Za-z][A-Za-z+]*)\s+tier\b/i);
  if (!m) return "";
  if (/^free$/i.test(m[1])) return "";
  return m[1];
}

function extractPriceFromChallenges(challenges: string[] | undefined): string | null {
  if (!challenges?.length) return null;
  for (const c of challenges) {
    const hit = firstPriceInText(c);
    if (hit) return hit;
  }
  return null;
}

function extractScimPriceFromNarrative(text: string): string | null {
  if (!text) return null;
  const start = text.match(
    /starting at (\$[\d,]+(?:\.\d+)?(?:-\$?[\d,]+(?:\.\d+)?)?\/user\/(?:mo|month))\b/i,
  );
  if (start) return start[1].replace(/\/month\b/i, "/mo");
  const guard = text.match(/(\$[\d,]+(?:\.\d+)?-\$?[\d,]+(?:\.\d+)?)\/user\/month/i);
  if (guard) return guard[1] + "/user/mo";
  const generic = text.match(/\$[\d,]+(?:\.\d+)?\/(?:user|seat)\/(?:mo|month)\b/i);
  if (generic) return generic[0].replace(/\/month\b/i, "/mo");
  return null;
}

function isVendorNoiseTier(app: ScimPricingAppLike, tier: string): boolean {
  const t = tier.trim().toLowerCase();
  if (!t || t === "n/a") return true;
  if (t.length > 40) return true;
  const brand = app.name.toLowerCase().replace(/\s+/g, "");
  const compact = t.replace(/\s+/g, "");
  if (compact === brand || t === app.name.toLowerCase()) return true;
  return false;
}

export function findPlanMatchingScimTier(
  plans: NonNullable<ScimPricingAppLike["pricing"]>["plans"],
  tierRaw: string,
): (typeof plans)[number] | undefined {
  if (!plans.length || !tierRaw.trim()) return undefined;
  const t = tierRaw.toLowerCase().trim();
  const byDirect = plans.find((p) => {
    const n = p.name.toLowerCase();
    return n === t || n.includes(t) || (t.length >= 4 && t.includes(n));
  });
  if (byDirect) return byDirect;
  const keywords = [
    "business+",
    "business",
    "enterprise",
    "premium",
    "professional",
    "ultimate",
    "standard",
    "essential",
    "teams",
  ];
  for (const kw of keywords) {
    if (!t.includes(kw.replace("+", ""))) continue;
    const hit = plans.find((p) => p.name.toLowerCase().includes(kw.replace("+", "")));
    if (hit) return hit;
  }
  return undefined;
}

export function resolveScimPricingDisplay(app: ScimPricingAppLike): string {
  const plans = app.pricing?.plans ?? [];
  const explicit = plans.find((p) => p.scim && p.price && p.price !== "-");
  if (explicit) return explicit.price;

  if (app.scimStatus === "no-scim") return "—";

  if (app.scimStatus === "has-scim") {
    if (!plans.length) return "—";
    return "Included";
  }

  const tierPrimary = [app.scimTier, app.quickFacts?.scimTierRequired]
    .map((s) => (s || "").trim())
    .find((s) => s && !isVendorNoiseTier(app, s));

  let plan = tierPrimary ? findPlanMatchingScimTier(plans, tierPrimary) : undefined;
  if (!plan) {
    const chTier = tierFromChallenges(app.challenges);
    if (chTier) plan = findPlanMatchingScimTier(plans, chTier);
  }
  if (plan?.price && plan.price !== "-") return plan.price;

  const fromChallenge = extractPriceFromChallenges(app.challenges);
  if (fromChallenge) return fromChallenge;

  if (plans.length === 1) {
    const only = plans[0];
    if (only.price && only.price !== "-") return only.price;
  }

  const fromText = extractScimPriceFromNarrative(
    `${app.detailedSummary || ""} ${app.summary || ""}`,
  );
  if (fromText) return fromText;

  return "—";
}

/**
 * First catalog row with a per-seat (or seat/agent) monthly-comparable price &gt; 0.
 */
export function resolveBasePricingDisplay(app: ScimPricingAppLike): string | null {
  const plans = app.pricing?.plans ?? [];
  for (const p of plans) {
    if (!p.price || p.price === "-") continue;
    const n = parseComparableMonthlyPrice(p.price);
    if (n != null && n > 0) return p.price;
  }
  return null;
}

/**
 * Normalize to approximate USD per user/seat/agent per month. Returns null when units are not comparable
 * (flat /mo, per-app, credits, custom text, etc.).
 */
export function parseComparableMonthlyPrice(raw: string): number | null {
  if (!raw || typeof raw !== "string") return null;
  const s0 = raw.replace(/^~\s*/i, "").trim();
  if (!s0 || s0 === "—" || s0 === "-") return null;
  if (/^(custom|quote|free|contact|capacity|annual\s*\(|n\/a)/i.test(s0)) return null;

  const core = s0.replace(/\s*\([^)]*\)\s*$/g, "").trim();

  const yearlyRange = core.match(
    /\$([\d,]+(?:\.\d+)?)\s*-\s*\$?([\d,]+(?:\.\d+)?)\/(?:user|seat|agent)\/(?:year|yr)\b/i,
  );
  if (yearlyRange) {
    const a = parseFloat(yearlyRange[1].replace(/,/g, "")) / 12;
    const b = parseFloat(yearlyRange[2].replace(/,/g, "")) / 12;
    return (a + b) / 2;
  }

  const yearly = core.match(/\$([\d,]+(?:\.\d+)?)\/(?:user|seat|agent)\/(?:year|yr)\b/i);
  if (yearly) return parseFloat(yearly[1].replace(/,/g, "")) / 12;

  const rangeMo = core.match(
    /\$([\d,]+(?:\.\d+)?)\s*-\s*\$?([\d,]+(?:\.\d+)?)\/(?:user|seat|agent)\/(?:mo|month)\b/i,
  );
  if (rangeMo) {
    const a = parseFloat(rangeMo[1].replace(/,/g, ""));
    const b = parseFloat(rangeMo[2].replace(/,/g, ""));
    return (a + b) / 2;
  }

  const singleMo = core.match(/\$([\d,]+(?:\.\d+)?)\/(?:user|seat|agent)\/(?:mo|month)\b/i);
  if (singleMo) return parseFloat(singleMo[1].replace(/,/g, ""));

  const unitOnly = core.match(/\$([\d,]+(?:\.\d+)?)\/(?:user|seat|agent)\b/i);
  if (unitOnly) return parseFloat(unitOnly[1].replace(/,/g, ""));

  return null;
}

/**
 * Percent increase from base tier to SCIM tier (same resolution rules as the directory table).
 * Only fills when both sides parse to comparable monthly per-seat numbers.
 */
export function computePercentIncreaseLabel(app: ScimPricingAppLike): string | undefined {
  if (app.scimStatus === "no-scim") return undefined;

  if (app.scimStatus === "has-scim") return undefined;

  if (app.scimStatus !== "scim-tax") return undefined;

  const baseStr = resolveBasePricingDisplay(app);
  const scimStr = resolveScimPricingDisplay(app);
  if (!baseStr || scimStr === "—" || scimStr === "Included") return undefined;

  const base = parseComparableMonthlyPrice(baseStr);
  const scim = parseComparableMonthlyPrice(scimStr);
  if (base == null || scim == null || base <= 0) return undefined;

  const pct = Math.round(((scim - base) / base) * 100);
  // Same parsed price (e.g. only SCIM tier listed as "base") — omit, don't show 0%.
  if (pct <= 0 || pct > 5000) return undefined;

  return `${pct}%`;
}

/** % Increase column: only show a positive delta; never 0% (ambiguous data shape). */
export function formatDirectoryPercentIncrease(
  app: ScimPricingAppLike & { percentIncrease?: string },
): string {
  if (app.scimStatus !== "scim-tax") return "";
  const p = app.percentIncrease?.trim();
  if (!p) return "";
  const n = Number.parseFloat(p.replace(/%/g, "").split("-")[0].split("–")[0]);
  if (!Number.isFinite(n) || n <= 0) return "";
  return p;
}
