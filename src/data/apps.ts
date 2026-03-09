import appsData from "./apps.json";

export type ScimStatus = "has-scim" | "scim-tax" | "no-scim";

export type IdpSupport = {
  name: string;
  sso: boolean;
  scim: boolean | "limited";
  notes: string;
};

export type AppData = {
  slug: string;
  name: string;
  logo: string;
  category: string;
  scimStatus: ScimStatus;
  scimTier: string;
  manualCost: string;
  percentIncrease?: string;
  lastUpdated?: string;
  summary: string;
  detailedSummary: string;
  strategicAlternative: string;
  quickFacts: {
    scimAvailable: string;
    scimTierRequired: string;
    ssoRequired: string;
    ssoAvailable: string;
    ssoProtocol: string;
    docsUrl: string;
  };
  idpSupport: IdpSupport[];
  costBreakdown: {
    orphanedAccounts: number;
    unusedLicenses: number;
    itHoursPerYear: number;
    unusedLicenseCost: string;
    itLaborCost: string;
    complianceCost: string;
    totalAnnualImpact: string;
  };
  pricing: {
    plans: { name: string; price: string; sso: boolean; scim: boolean }[];
    note: string;
    upgradeCosts: { teamSize: string; annualCost: string }[];
  };
  challenges: string[];
  communityQuotes: { quote: string; source: string }[];
  recommendations: { situation: string; recommendation: string }[];
  bottomLine: string;
};

export const apps: AppData[] = appsData as AppData[];

// Data lives in apps.json for easy public contribution. See CONTRIBUTING.md.

export const getAppBySlug = (slug: string): AppData | undefined => {
  return apps.find((app) => app.slug === slug);
};

export const getScimStatusLabel = (status: ScimStatus): string => {
  switch (status) {
    case "has-scim": return "Has SCIM";
    case "scim-tax": return "SCIM Tax";
    case "no-scim": return "No SCIM";
  }
};

export const getScimStatusColor = (status: ScimStatus): string => {
  switch (status) {
    case "has-scim": return "bg-badge-green text-badge-green-foreground";
    case "scim-tax": return "bg-badge-orange text-badge-orange-foreground";
    case "no-scim": return "bg-badge-red text-badge-red-foreground";
  }
};

/** Stats derived from the current apps list (no longer hardcoded). */
export const stats = (() => {
  const total = apps.length;
  const noScim = apps.filter((a) => a.scimStatus === "no-scim").length;
  const scimTax = apps.filter((a) => a.scimStatus === "scim-tax").length;
  const percentValues = apps
    .filter((a) => a.scimStatus === "scim-tax" && a.percentIncrease)
    .map((a) => {
      const s = (a.percentIncrease || "").replace(/%/g, "").trim();
      const num = Number.parseFloat(s.split("-")[0].split("–")[0]);
      return Number.isFinite(num) ? num : null;
    })
    .filter((n): n is number => n !== null);
  const avgScimTax =
    percentValues.length > 0
      ? Math.round(percentValues.reduce((s, n) => s + n, 0) / percentValues.length) + "%"
      : "—";
  return {
    totalApps: total,
    noScimPercent: total ? Math.round((noScim / total) * 100) + "%" : "0%",
    scimTaxPercent: total ? Math.round((scimTax / total) * 100) + "%" : "0%",
    avgScimTax,
  };
})();

/** Category cards with counts derived from the current apps list. */
export const categories = (() => {
  const noScimCount = apps.filter((a) => a.scimStatus === "no-scim").length;
  const scimTaxCount = apps.filter((a) => a.scimStatus === "scim-tax").length;
  const total = apps.length;
  const manualPercent = total ? Math.round(((noScimCount + scimTaxCount) / total) * 100) : 0;
  const byCost = [...apps].sort((a, b) => {
    const num = (s: string) => Number(s?.replace(/[^0-9]/g, "") || 0);
    return num(b.manualCost) - num(a.manualCost);
  });
  const top10 = byCost.slice(0, 10).length;
  return [
    { title: "Apps without SCIM", description: "Do not support automated provisioning", count: noScimCount, icon: "zap-off" as const },
    { title: "The SCIM Tax", description: "SCIM gated behind expensive enterprise upgrades", count: scimTaxCount, icon: "lock" as const },
    { title: "State of automation 2026", description: `${manualPercent}% of apps still require manual provisioning`, count: noScimCount + scimTaxCount, icon: "file-text" as const },
    { title: "Most expensive to manage", description: "Top 10 apps with the highest manual admin cost", count: top10, icon: "trending-up" as const },
  ];
})();
