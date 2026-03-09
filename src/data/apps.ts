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

export const stats = {
  totalApps: 1053,
  noScimPercent: "57%",
  scimTaxPercent: "41%",
  avgScimTax: "245%",
};

export const categories = [
  { title: "Apps without SCIM", description: "Do not support automated provisioning", count: 411, icon: "zap-off" as const },
  { title: "The SCIM Tax", description: "SCIM gated behind expensive enterprise upgrades", count: 294, icon: "lock" as const },
  { title: "State of automation 2026", description: "98% of apps still require manual provisioning", count: 721, icon: "file-text" as const },
  { title: "Most expensive to manage", description: "Top 10 apps with the highest manual admin cost", count: 10, icon: "trending-up" as const },
];
