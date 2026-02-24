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

export const apps: AppData[] = [
  {
    slug: "notion",
    name: "Notion",
    logo: "https://scim-directory.vercel.app/app-logos/notion.png",
    category: "Productivity / Knowledge Management",
    scimStatus: "scim-tax",
    scimTier: "Enterprise",
    manualCost: "$11,754/yr",
    summary: "Notion supports SCIM provisioning, but only on Enterprise plans with custom pricing typically ranging $18-25/user/month.",
    detailedSummary: "Notion supports SCIM provisioning, but only on Enterprise plans with custom pricing typically ranging $18-25/user/month. This creates a significant gap for teams on Business plans ($20/user/month) who already have SAML SSO but can't automate user lifecycle management. The Enterprise requirement means a 100-person team faces $1,800-5,000/month in licensing costs just to unlock basic provisioning automation.",
    strategicAlternative: "Notion gates SCIM behind Enterprise. Skip the Enterprise plan upgrade and automate complete outcomes across your stack. We maintain the integration layer underneath. You focus on judgment, not plumbing.",
    quickFacts: {
      scimAvailable: "Yes",
      scimTierRequired: "Enterprise",
      ssoRequired: "Yes",
      ssoAvailable: "Yes",
      ssoProtocol: "SAML 2.0",
      docsUrl: "https://www.notion.com/help/provision-users-and-groups-with-scim",
    },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "OIN app with full provisioning" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Gallery app with SCIM" },
      { name: "Google Workspace", sso: true, scim: "limited", notes: "No group provisioning/deprovisioning" },
      { name: "OneLogin", sso: true, scim: true, notes: "Supported" },
    ],
    costBreakdown: {
      orphanedAccounts: 7,
      unusedLicenses: 12,
      itHoursPerYear: 101,
      unusedLicenseCost: "$3,925",
      itLaborCost: "$6,088",
      complianceCost: "$1,741",
      totalAnnualImpact: "$11,754",
    },
    pricing: {
      plans: [
        { name: "Plus", price: "$10/user/mo", sso: false, scim: false },
        { name: "Business", price: "$20/user/mo", sso: true, scim: false },
        { name: "Enterprise", price: "$18-25/user/mo (custom)", sso: true, scim: true },
      ],
      note: "The Business tier includes SAML SSO but excludes SCIM provisioning.",
      upgradeCosts: [
        { teamSize: "50 users", annualCost: "+$1,200/year" },
        { teamSize: "100 users", annualCost: "+$2,400/year" },
        { teamSize: "200 users", annualCost: "+$4,800/year" },
      ],
    },
    challenges: [
      "Notion supports SCIM but only at Enterprise tier ($18-25/user/month)",
      "Google Workspace users get limited SCIM (no group sync)",
      "Teams manually provisioning this app spend significant hidden costs annually",
    ],
    communityQuotes: [
      { quote: "Business plan has SSO but not SCIM - frustrating gap", source: "IT Administrator feedback" },
      { quote: "Enterprise pricing not transparent", source: "Community review" },
      { quote: "Google Workspace users miss group sync feature", source: "Integration feedback" },
    ],
    recommendations: [
      { situation: "On Business plan, need SCIM", recommendation: "Use Corma: avoid the Enterprise tier jump" },
      { situation: "On Plus plan, need provisioning", recommendation: "Use Corma: skip two tier upgrades" },
      { situation: "Using Google Workspace as IdP", recommendation: "Use Corma: native SCIM doesn't support group provisioning" },
      { situation: "Already on Enterprise plan", recommendation: "Use native SCIM: you're paying for it" },
      { situation: "Small team with low turnover", recommendation: "Manual provisioning may suffice" },
    ],
    bottomLine: "Notion's SCIM requirement forces teams into Enterprise pricing that's often 2-3x their current Business plan costs, with custom negotiations that lack transparency.",
  },
  {
    slug: "slack",
    name: "Slack",
    logo: "https://scim-directory.vercel.app/app-logos/slack.png",
    category: "Communication / Messaging",
    scimStatus: "scim-tax",
    scimTier: "Business+",
    manualCost: "$11,754/yr",
    summary: "Slack supports SCIM on Business+ and Enterprise Grid plans, requiring significant upgrades from Pro.",
    detailedSummary: "Slack supports SCIM provisioning on Business+ ($12.50/user/month) and Enterprise Grid (custom pricing) plans. Teams on Pro plans ($8.75/user/month) must upgrade to access automated user lifecycle management, creating a 43% price increase just for provisioning capabilities.",
    strategicAlternative: "Slack gates SCIM behind Business+ tier. Skip the plan upgrade and automate user provisioning across your entire stack.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Business+", ssoRequired: "Yes", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0", docsUrl: "https://slack.com/help/articles/220421947" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full provisioning support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Gallery app available" },
      { name: "Google Workspace", sso: true, scim: true, notes: "Supported" },
      { name: "OneLogin", sso: true, scim: true, notes: "Supported" },
    ],
    costBreakdown: { orphanedAccounts: 9, unusedLicenses: 15, itHoursPerYear: 120, unusedLicenseCost: "$4,500", itLaborCost: "$7,200", complianceCost: "$2,054", totalAnnualImpact: "$13,754" },
    pricing: {
      plans: [
        { name: "Pro", price: "$8.75/user/mo", sso: false, scim: false },
        { name: "Business+", price: "$12.50/user/mo", sso: true, scim: true },
        { name: "Enterprise Grid", price: "Custom", sso: true, scim: true },
      ],
      note: "SCIM requires Business+ at minimum.",
      upgradeCosts: [
        { teamSize: "50 users", annualCost: "+$2,250/year" },
        { teamSize: "100 users", annualCost: "+$4,500/year" },
        { teamSize: "200 users", annualCost: "+$9,000/year" },
      ],
    },
    challenges: ["SCIM locked behind Business+ tier", "Pro plan has no SSO or SCIM", "Enterprise Grid pricing is opaque"],
    communityQuotes: [
      { quote: "Upgrading just for SCIM feels excessive", source: "IT Manager" },
      { quote: "Pro should include basic provisioning", source: "Community feedback" },
    ],
    recommendations: [
      { situation: "On Pro plan, need SCIM", recommendation: "Use Corma to avoid the upgrade" },
      { situation: "Already on Business+", recommendation: "Use native SCIM" },
    ],
    bottomLine: "Slack's SCIM tax forces a 43% price increase from Pro to Business+ just for provisioning.",
  },
  {
    slug: "zoom",
    name: "Zoom",
    logo: "https://scim-directory.vercel.app/app-logos/zoom.png",
    category: "Video Conferencing / UCaaS",
    scimStatus: "has-scim",
    scimTier: "Business",
    manualCost: "$9,490/yr",
    summary: "Zoom includes SCIM provisioning on Business plans and above with solid IdP support.",
    detailedSummary: "Zoom provides SCIM provisioning starting from Business plans ($13.33/user/month). The implementation supports user creation, updates, and deactivation across major identity providers. However, group provisioning has limitations depending on the IdP used.",
    strategicAlternative: "Zoom includes SCIM on Business plans. For teams on Pro, consider whether the upgrade cost justifies automated provisioning.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Business", ssoRequired: "No", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0", docsUrl: "https://support.zoom.us/hc/en-us/articles/360034229813" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Gallery app" },
      { name: "Google Workspace", sso: true, scim: true, notes: "Supported" },
    ],
    costBreakdown: { orphanedAccounts: 5, unusedLicenses: 10, itHoursPerYear: 80, unusedLicenseCost: "$3,200", itLaborCost: "$4,800", complianceCost: "$1,490", totalAnnualImpact: "$9,490" },
    pricing: {
      plans: [
        { name: "Pro", price: "$13.33/user/mo", sso: false, scim: false },
        { name: "Business", price: "$18.32/user/mo", sso: true, scim: true },
        { name: "Enterprise", price: "Custom", sso: true, scim: true },
      ],
      note: "SCIM included starting from Business tier.",
      upgradeCosts: [
        { teamSize: "50 users", annualCost: "+$2,994/year" },
        { teamSize: "100 users", annualCost: "+$5,988/year" },
      ],
    },
    challenges: ["Pro plan lacks SCIM", "Group provisioning has IdP-specific limitations"],
    communityQuotes: [{ quote: "SCIM works well once you're on Business", source: "IT Admin" }],
    recommendations: [
      { situation: "On Business or Enterprise", recommendation: "Use native SCIM" },
      { situation: "On Pro plan", recommendation: "Evaluate if upgrade cost is justified" },
    ],
    bottomLine: "Zoom's SCIM is solid on Business plans but requires a meaningful upgrade from Pro.",
  },
  {
    slug: "figma",
    name: "Figma",
    logo: "https://scim-directory.vercel.app/app-logos/figma.png",
    category: "Design / Collaboration",
    scimStatus: "scim-tax",
    scimTier: "Enterprise",
    manualCost: "$11,167/yr",
    summary: "Figma supports SCIM only on Enterprise plans with custom pricing.",
    detailedSummary: "Figma gates SCIM provisioning behind its Enterprise tier with custom pricing. Teams on Organization plans ($45/editor/month) get SSO but no automated provisioning, creating a frustrating gap for design teams managing large contributor pools.",
    strategicAlternative: "Figma requires Enterprise for SCIM. Automate design tool provisioning without the Enterprise tax.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Enterprise", ssoRequired: "Yes", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0", docsUrl: "https://help.figma.com/hc/en-us/articles/360039481034" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Supported" },
      { name: "Google Workspace", sso: true, scim: "limited", notes: "Basic support" },
    ],
    costBreakdown: { orphanedAccounts: 6, unusedLicenses: 8, itHoursPerYear: 90, unusedLicenseCost: "$4,320", itLaborCost: "$5,400", complianceCost: "$1,447", totalAnnualImpact: "$11,167" },
    pricing: {
      plans: [
        { name: "Professional", price: "$15/editor/mo", sso: false, scim: false },
        { name: "Organization", price: "$45/editor/mo", sso: true, scim: false },
        { name: "Enterprise", price: "Custom", sso: true, scim: true },
      ],
      note: "Organization includes SSO but not SCIM.",
      upgradeCosts: [
        { teamSize: "50 editors", annualCost: "+$6,000-12,000/year" },
        { teamSize: "100 editors", annualCost: "+$12,000-24,000/year" },
      ],
    },
    challenges: ["Enterprise required for SCIM", "Organization plan has SSO but no SCIM", "Custom pricing lacks transparency"],
    communityQuotes: [{ quote: "Paying $45/editor and still no SCIM is absurd", source: "Design Lead" }],
    recommendations: [
      { situation: "On Organization plan", recommendation: "Use Corma to avoid Enterprise jump" },
      { situation: "On Enterprise plan", recommendation: "Use native SCIM" },
    ],
    bottomLine: "Figma's SCIM requirement adds significant cost on top of already expensive Organization plans.",
  },
  {
    slug: "github",
    name: "GitHub",
    logo: "https://scim-directory.vercel.app/app-logos/github.png",
    category: "Developer Tools / Version Control",
    scimStatus: "scim-tax",
    scimTier: "Enterprise",
    manualCost: "$11,754/yr",
    summary: "GitHub supports SCIM only on Enterprise Cloud plans at $21/user/month.",
    detailedSummary: "GitHub gates SCIM behind Enterprise Cloud ($21/user/month). Teams on Team plans ($4/user/month) face a 425% price increase to access automated provisioning. The Enterprise requirement is particularly painful for developer tools where team membership changes frequently.",
    strategicAlternative: "GitHub requires Enterprise Cloud for SCIM. Automate developer tool provisioning without the massive price jump.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Enterprise Cloud", ssoRequired: "Yes", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0", docsUrl: "https://docs.github.com/en/organizations/managing-saml-single-sign-on-for-your-organization" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Full support" },
    ],
    costBreakdown: { orphanedAccounts: 8, unusedLicenses: 11, itHoursPerYear: 95, unusedLicenseCost: "$2,772", itLaborCost: "$5,700", complianceCost: "$3,282", totalAnnualImpact: "$11,754" },
    pricing: {
      plans: [
        { name: "Team", price: "$4/user/mo", sso: false, scim: false },
        { name: "Enterprise", price: "$21/user/mo", sso: true, scim: true },
      ],
      note: "SCIM requires Enterprise Cloud plan.",
      upgradeCosts: [
        { teamSize: "50 users", annualCost: "+$10,200/year" },
        { teamSize: "100 users", annualCost: "+$20,400/year" },
      ],
    },
    challenges: ["425% price increase for SCIM", "No mid-tier option", "Enterprise-only feature"],
    communityQuotes: [{ quote: "The jump from Team to Enterprise just for SCIM is brutal", source: "Engineering Manager" }],
    recommendations: [
      { situation: "On Team plan, need SCIM", recommendation: "Use Corma to avoid 5x price increase" },
      { situation: "On Enterprise Cloud", recommendation: "Use native SCIM" },
    ],
    bottomLine: "GitHub's 425% price jump from Team to Enterprise makes SCIM one of the most expensive upgrades in the SaaS ecosystem.",
  },
  {
    slug: "jira",
    name: "Jira",
    logo: "https://scim-directory.vercel.app/app-logos/jira.png",
    category: "Project Management / Issue Tracking",
    scimStatus: "scim-tax",
    scimTier: "Premium",
    manualCost: "$10,200/yr",
    summary: "Jira and Atlassian Cloud support SCIM on Premium and Enterprise plans.",
    detailedSummary: "Atlassian gates SCIM behind Premium ($17.50/user/month for 100 users) and Enterprise plans. Standard plan users ($8.15/user/month) must upgrade to access automated provisioning for Jira, Confluence, and other Atlassian products.",
    strategicAlternative: "Atlassian requires Premium for SCIM. Automate provisioning across your Atlassian stack without the tier upgrade.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Premium", ssoRequired: "Yes", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0", docsUrl: "https://support.atlassian.com/provisioning-users/docs/understand-user-provisioning/" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Full support" },
      { name: "Google Workspace", sso: true, scim: true, notes: "Supported" },
    ],
    costBreakdown: { orphanedAccounts: 6, unusedLicenses: 10, itHoursPerYear: 85, unusedLicenseCost: "$3,400", itLaborCost: "$5,100", complianceCost: "$1,700", totalAnnualImpact: "$10,200" },
    pricing: {
      plans: [
        { name: "Standard", price: "$8.15/user/mo", sso: false, scim: false },
        { name: "Premium", price: "$17.50/user/mo", sso: true, scim: true },
        { name: "Enterprise", price: "Custom", sso: true, scim: true },
      ],
      note: "SCIM requires Premium plan at minimum.",
      upgradeCosts: [
        { teamSize: "50 users", annualCost: "+$5,610/year" },
        { teamSize: "100 users", annualCost: "+$11,220/year" },
      ],
    },
    challenges: ["Standard plan lacks SCIM", "Premium tier doubles the price", "Covers all Atlassian products"],
    communityQuotes: [{ quote: "Premium upgrade for SCIM doubles our Atlassian bill", source: "IT Director" }],
    recommendations: [
      { situation: "On Standard plan", recommendation: "Use Corma to avoid Premium upgrade" },
      { situation: "On Premium or Enterprise", recommendation: "Use native SCIM" },
    ],
    bottomLine: "Atlassian's SCIM requirement effectively doubles costs from Standard to Premium tier.",
  },
  {
    slug: "asana",
    name: "Asana",
    logo: "https://scim-directory.vercel.app/app-logos/asana.png",
    category: "Project Management / Work Management",
    scimStatus: "scim-tax",
    scimTier: "Enterprise",
    manualCost: "$10,500/yr",
    summary: "Asana gates SCIM behind Enterprise with custom pricing.",
    detailedSummary: "Asana supports SCIM only on Enterprise plans with custom pricing. Business plan users ($24.99/user/month) get SSO but no automated provisioning, requiring manual user lifecycle management.",
    strategicAlternative: "Asana requires Enterprise for SCIM. Automate project management provisioning without opaque Enterprise pricing.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Enterprise", ssoRequired: "Yes", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0", docsUrl: "https://asana.com/guide/help/premium/authentication" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Supported" },
    ],
    costBreakdown: { orphanedAccounts: 5, unusedLicenses: 9, itHoursPerYear: 88, unusedLicenseCost: "$3,600", itLaborCost: "$5,280", complianceCost: "$1,620", totalAnnualImpact: "$10,500" },
    pricing: {
      plans: [
        { name: "Premium", price: "$10.99/user/mo", sso: false, scim: false },
        { name: "Business", price: "$24.99/user/mo", sso: true, scim: false },
        { name: "Enterprise", price: "Custom", sso: true, scim: true },
      ],
      note: "Business includes SSO but not SCIM.",
      upgradeCosts: [
        { teamSize: "50 users", annualCost: "+$3,000-6,000/year" },
        { teamSize: "100 users", annualCost: "+$6,000-12,000/year" },
      ],
    },
    challenges: ["Enterprise required for SCIM", "Business has SSO but no SCIM", "Custom pricing"],
    communityQuotes: [{ quote: "Business plan should include SCIM alongside SSO", source: "IT Admin" }],
    recommendations: [
      { situation: "On Business plan", recommendation: "Use Corma to avoid Enterprise upgrade" },
      { situation: "On Enterprise", recommendation: "Use native SCIM" },
    ],
    bottomLine: "Asana follows the common pattern of gating SCIM behind opaque Enterprise pricing despite including SSO on lower tiers.",
  },
  {
    slug: "dropbox",
    name: "Dropbox",
    logo: "https://scim-directory.vercel.app/app-logos/dropbox.png",
    category: "Cloud Storage / File Sharing",
    scimStatus: "has-scim",
    scimTier: "Business",
    manualCost: "$8,900/yr",
    summary: "Dropbox includes SCIM on Business plans with good IdP coverage.",
    detailedSummary: "Dropbox Business and Advanced plans include SCIM provisioning. The implementation supports user and group management across major identity providers with solid documentation.",
    strategicAlternative: "Dropbox includes SCIM on Business plans. Consider native SCIM if already on a qualifying tier.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Business", ssoRequired: "No", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0", docsUrl: "https://help.dropbox.com/admin/team/scim" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Full support" },
      { name: "Google Workspace", sso: true, scim: true, notes: "Supported" },
    ],
    costBreakdown: { orphanedAccounts: 4, unusedLicenses: 8, itHoursPerYear: 70, unusedLicenseCost: "$2,880", itLaborCost: "$4,200", complianceCost: "$1,820", totalAnnualImpact: "$8,900" },
    pricing: {
      plans: [
        { name: "Plus", price: "$11.99/user/mo", sso: false, scim: false },
        { name: "Business", price: "$15/user/mo", sso: true, scim: true },
        { name: "Business Plus", price: "$24/user/mo", sso: true, scim: true },
      ],
      note: "SCIM included on Business and above.",
      upgradeCosts: [{ teamSize: "50 users", annualCost: "+$1,806/year" }],
    },
    challenges: ["Plus plan lacks SCIM", "Business upgrade required for provisioning"],
    communityQuotes: [{ quote: "SCIM on Business plan works well", source: "Sysadmin" }],
    recommendations: [
      { situation: "On Business or above", recommendation: "Use native SCIM" },
      { situation: "On Plus plan", recommendation: "Evaluate upgrade vs Corma" },
    ],
    bottomLine: "Dropbox offers reasonable SCIM access on Business plans without excessive premium pricing.",
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    logo: "https://scim-directory.vercel.app/app-logos/salesforce.png",
    category: "CRM / Sales",
    scimStatus: "has-scim",
    scimTier: "All Editions",
    manualCost: "$13,200/yr",
    summary: "Salesforce includes SCIM across most editions with comprehensive IdP support.",
    detailedSummary: "Salesforce provides SCIM provisioning across most editions. The platform has mature IdP integrations and comprehensive documentation. However, the complexity of Salesforce's permission model means SCIM alone doesn't fully automate user provisioning.",
    strategicAlternative: "Salesforce includes SCIM but its permission complexity means automated provisioning still requires significant configuration.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Most editions", ssoRequired: "No", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0 / OIDC", docsUrl: "https://help.salesforce.com/s/articleView?id=sf.identity_scim_overview.htm" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Full support" },
      { name: "Google Workspace", sso: true, scim: true, notes: "Supported" },
      { name: "OneLogin", sso: true, scim: true, notes: "Supported" },
    ],
    costBreakdown: { orphanedAccounts: 10, unusedLicenses: 14, itHoursPerYear: 130, unusedLicenseCost: "$5,600", itLaborCost: "$5,800", complianceCost: "$1,800", totalAnnualImpact: "$13,200" },
    pricing: {
      plans: [
        { name: "Essentials", price: "$25/user/mo", sso: true, scim: true },
        { name: "Professional", price: "$80/user/mo", sso: true, scim: true },
        { name: "Enterprise", price: "$165/user/mo", sso: true, scim: true },
      ],
      note: "SCIM available across most editions.",
      upgradeCosts: [],
    },
    challenges: ["Complex permission model", "SCIM doesn't handle all provisioning needs", "Profile/role assignment still manual"],
    communityQuotes: [{ quote: "SCIM works but Salesforce permissions are a maze", source: "Salesforce Admin" }],
    recommendations: [
      { situation: "Any Salesforce edition", recommendation: "Use native SCIM for basic provisioning" },
      { situation: "Complex permission needs", recommendation: "Complement SCIM with Corma" },
    ],
    bottomLine: "Salesforce includes SCIM but its complex permission model means automated provisioning still requires significant manual configuration.",
  },
  {
    slug: "linear",
    name: "Linear",
    logo: "https://scim-directory.vercel.app/app-logos/linear.png",
    category: "Project Management / Issue Tracking",
    scimStatus: "scim-tax",
    scimTier: "Enterprise",
    manualCost: "$9,800/yr",
    summary: "Linear supports SCIM only on Enterprise plans with custom pricing.",
    detailedSummary: "Linear gates SCIM behind Enterprise pricing. Teams on Plus plans ($8/user/month) must negotiate custom Enterprise pricing to access automated provisioning, a significant jump for a developer-focused tool.",
    strategicAlternative: "Linear requires Enterprise for SCIM. Skip the upgrade and automate developer tool provisioning.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Enterprise", ssoRequired: "Yes", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0", docsUrl: "https://linear.app/docs/scim-provisioning" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Supported" },
    ],
    costBreakdown: { orphanedAccounts: 4, unusedLicenses: 7, itHoursPerYear: 75, unusedLicenseCost: "$2,520", itLaborCost: "$5,680", complianceCost: "$1,600", totalAnnualImpact: "$9,800" },
    pricing: {
      plans: [
        { name: "Plus", price: "$8/user/mo", sso: true, scim: false },
        { name: "Enterprise", price: "Custom", sso: true, scim: true },
      ],
      note: "Plus includes SSO but not SCIM.",
      upgradeCosts: [{ teamSize: "50 users", annualCost: "Custom pricing" }],
    },
    challenges: ["Enterprise required for SCIM", "Plus has SSO but no SCIM", "Custom pricing"],
    communityQuotes: [{ quote: "Linear's Enterprise pricing isn't published anywhere", source: "Engineering Lead" }],
    recommendations: [
      { situation: "On Plus plan", recommendation: "Use Corma" },
      { situation: "On Enterprise", recommendation: "Use native SCIM" },
    ],
    bottomLine: "Linear follows the SSO-without-SCIM pattern, frustrating teams who need both.",
  },
  {
    slug: "miro",
    name: "Miro",
    logo: "https://scim-directory.vercel.app/app-logos/miro.png",
    category: "Collaboration / Whiteboarding",
    scimStatus: "scim-tax",
    scimTier: "Enterprise",
    manualCost: "$10,100/yr",
    summary: "Miro supports SCIM only on Enterprise plans.",
    detailedSummary: "Miro gates SCIM behind Enterprise pricing. Business plan users ($16/user/month) get SSO but must upgrade for automated provisioning.",
    strategicAlternative: "Miro requires Enterprise for SCIM. Automate whiteboarding tool provisioning without the tier jump.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Enterprise", ssoRequired: "Yes", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0", docsUrl: "https://help.miro.com/hc/en-us/articles/360017571194" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Supported" },
    ],
    costBreakdown: { orphanedAccounts: 5, unusedLicenses: 9, itHoursPerYear: 82, unusedLicenseCost: "$2,880", itLaborCost: "$5,600", complianceCost: "$1,620", totalAnnualImpact: "$10,100" },
    pricing: {
      plans: [
        { name: "Business", price: "$16/user/mo", sso: true, scim: false },
        { name: "Enterprise", price: "Custom", sso: true, scim: true },
      ],
      note: "Business includes SSO but not SCIM.",
      upgradeCosts: [{ teamSize: "100 users", annualCost: "Custom pricing" }],
    },
    challenges: ["Enterprise required for SCIM", "Business has SSO without SCIM"],
    communityQuotes: [{ quote: "SSO without SCIM is only half the solution", source: "IT Manager" }],
    recommendations: [
      { situation: "On Business plan", recommendation: "Use Corma" },
      { situation: "On Enterprise", recommendation: "Use native SCIM" },
    ],
    bottomLine: "Miro's SCIM tax adds Enterprise pricing on top of Business plans that already include SSO.",
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    logo: "https://scim-directory.vercel.app/app-logos/hubspot.png",
    category: "CRM / Marketing",
    scimStatus: "no-scim",
    scimTier: "N/A",
    manualCost: "$12,400/yr",
    summary: "HubSpot does not support SCIM provisioning on any plan.",
    detailedSummary: "HubSpot lacks SCIM support entirely. Despite being a major SaaS platform, all user provisioning must be done manually through the admin portal. SAML SSO is available on Enterprise plans but doesn't address lifecycle management.",
    strategicAlternative: "HubSpot has no SCIM at all. Automate CRM provisioning with Corma without waiting for native support.",
    quickFacts: { scimAvailable: "No", scimTierRequired: "N/A", ssoRequired: "N/A", ssoAvailable: "Yes (Enterprise)", ssoProtocol: "SAML 2.0", docsUrl: "https://knowledge.hubspot.com/account-security/set-up-single-sign-on-sso" },
    idpSupport: [
      { name: "Okta", sso: true, scim: false, notes: "SSO only" },
      { name: "Microsoft Entra ID", sso: true, scim: false, notes: "SSO only" },
    ],
    costBreakdown: { orphanedAccounts: 8, unusedLicenses: 12, itHoursPerYear: 110, unusedLicenseCost: "$4,800", itLaborCost: "$5,600", complianceCost: "$2,000", totalAnnualImpact: "$12,400" },
    pricing: {
      plans: [
        { name: "Professional", price: "$800/mo (5 users)", sso: false, scim: false },
        { name: "Enterprise", price: "$3,600/mo (10 users)", sso: true, scim: false },
      ],
      note: "No SCIM support on any plan.",
      upgradeCosts: [],
    },
    challenges: ["No SCIM on any plan", "Manual provisioning only", "Enterprise SSO doesn't include provisioning"],
    communityQuotes: [{ quote: "No SCIM for a platform this size is inexcusable", source: "Revenue Ops" }],
    recommendations: [
      { situation: "Any HubSpot plan", recommendation: "Use Corma for automated provisioning" },
    ],
    bottomLine: "HubSpot's complete lack of SCIM forces manual provisioning regardless of plan or spend level.",
  },
  {
    slug: "1password",
    name: "1Password",
    logo: "https://scim-directory.vercel.app/app-logos/1password.png",
    category: "Security / Password Management",
    scimStatus: "scim-tax",
    scimTier: "Business",
    manualCost: "$11,167/yr",
    summary: "1Password supports SCIM but requires self-hosting the SCIM Bridge infrastructure.",
    detailedSummary: "1Password supports SCIM on Business plans ($7.99/user/month) but requires deploying and maintaining the 1Password SCIM Bridge on your own infrastructure. This self-hosted approach means operational overhead for updates, connectivity, and troubleshooting.",
    strategicAlternative: "1Password requires self-hosting SCIM Bridge. Skip the infrastructure overhead with automated provisioning.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Business", ssoRequired: "No", ssoAvailable: "Yes", ssoProtocol: "OIDC", docsUrl: "https://support.1password.com/scim/" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Via SCIM Bridge" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Via SCIM Bridge" },
      { name: "Google Workspace", sso: true, scim: true, notes: "Via SCIM Bridge" },
    ],
    costBreakdown: { orphanedAccounts: 6, unusedLicenses: 10, itHoursPerYear: 95, unusedLicenseCost: "$3,200", itLaborCost: "$5,967", complianceCost: "$2,000", totalAnnualImpact: "$11,167" },
    pricing: {
      plans: [
        { name: "Teams", price: "$3.99/user/mo", sso: false, scim: false },
        { name: "Business", price: "$7.99/user/mo", sso: true, scim: true },
        { name: "Enterprise", price: "Custom", sso: true, scim: true },
      ],
      note: "SCIM requires self-hosted SCIM Bridge deployment.",
      upgradeCosts: [{ teamSize: "100 users", annualCost: "+$4,800/year + infra costs" }],
    },
    challenges: ["Self-hosted SCIM Bridge required", "Infrastructure maintenance overhead", "SSO uses OIDC not SAML"],
    communityQuotes: [{ quote: "Managing SCIM Bridge is an ongoing burden", source: "DevOps Engineer" }],
    recommendations: [
      { situation: "On Business plan", recommendation: "Evaluate if SCIM Bridge overhead is worth it" },
      { situation: "Want zero-maintenance provisioning", recommendation: "Use Corma" },
    ],
    bottomLine: "1Password's self-hosted SCIM Bridge creates ongoing operational overhead that defeats the purpose of automated provisioning.",
  },
  {
    slug: "monday",
    name: "monday.com",
    logo: "https://scim-directory.vercel.app/app-logos/monday-com.png",
    category: "Project Management / Work OS",
    scimStatus: "scim-tax",
    scimTier: "Enterprise",
    manualCost: "$10,800/yr",
    summary: "monday.com supports SCIM only on Enterprise plans with custom pricing.",
    detailedSummary: "monday.com gates SCIM behind Enterprise pricing. Pro plan users ($16/seat/month) get integrations but must upgrade for automated provisioning and SSO.",
    strategicAlternative: "monday.com requires Enterprise for SCIM. Automate work management provisioning at predictable pricing.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Enterprise", ssoRequired: "Yes", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0", docsUrl: "https://support.monday.com/hc/en-us/articles/360002767499" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Supported" },
      { name: "OneLogin", sso: true, scim: true, notes: "Supported" },
    ],
    costBreakdown: { orphanedAccounts: 6, unusedLicenses: 11, itHoursPerYear: 90, unusedLicenseCost: "$3,520", itLaborCost: "$5,400", complianceCost: "$1,880", totalAnnualImpact: "$10,800" },
    pricing: {
      plans: [
        { name: "Pro", price: "$16/seat/mo", sso: false, scim: false },
        { name: "Enterprise", price: "Custom", sso: true, scim: true },
      ],
      note: "SCIM and SSO only on Enterprise.",
      upgradeCosts: [{ teamSize: "50 seats", annualCost: "Custom pricing" }],
    },
    challenges: ["Enterprise required for both SSO and SCIM", "No mid-tier option", "Custom pricing"],
    communityQuotes: [{ quote: "Enterprise-only SSO and SCIM is a dealbreaker", source: "Operations Manager" }],
    recommendations: [
      { situation: "On Pro plan", recommendation: "Use Corma" },
      { situation: "On Enterprise", recommendation: "Use native SCIM" },
    ],
    bottomLine: "monday.com bundles SSO and SCIM exclusively in Enterprise, forcing an expensive upgrade for any automation.",
  },
  {
    slug: "airtable",
    name: "Airtable",
    logo: "https://scim-directory.vercel.app/app-logos/airtable.png",
    category: "Database / No-Code",
    scimStatus: "scim-tax",
    scimTier: "Enterprise Scale",
    manualCost: "$9,600/yr",
    summary: "Airtable supports SCIM only on Enterprise Scale plans.",
    detailedSummary: "Airtable gates SCIM behind Enterprise Scale pricing. Business plan users get SSO but must upgrade to Enterprise Scale for automated provisioning, adding significant cost.",
    strategicAlternative: "Airtable requires Enterprise Scale for SCIM. Skip the upgrade and automate provisioning.",
    quickFacts: { scimAvailable: "Yes", scimTierRequired: "Enterprise Scale", ssoRequired: "Yes", ssoAvailable: "Yes", ssoProtocol: "SAML 2.0", docsUrl: "https://support.airtable.com/docs/configuring-scim-provisioning" },
    idpSupport: [
      { name: "Okta", sso: true, scim: true, notes: "Full support" },
      { name: "Microsoft Entra ID", sso: true, scim: true, notes: "Supported" },
    ],
    costBreakdown: { orphanedAccounts: 4, unusedLicenses: 8, itHoursPerYear: 78, unusedLicenseCost: "$2,880", itLaborCost: "$4,680", complianceCost: "$2,040", totalAnnualImpact: "$9,600" },
    pricing: {
      plans: [
        { name: "Business", price: "$20/seat/mo", sso: true, scim: false },
        { name: "Enterprise Scale", price: "Custom", sso: true, scim: true },
      ],
      note: "Business has SSO, Enterprise Scale adds SCIM.",
      upgradeCosts: [{ teamSize: "50 seats", annualCost: "Custom pricing" }],
    },
    challenges: ["Enterprise Scale required for SCIM", "Business has SSO without SCIM", "Custom pricing only"],
    communityQuotes: [{ quote: "Enterprise Scale is vague and expensive", source: "Data Team Lead" }],
    recommendations: [
      { situation: "On Business plan", recommendation: "Use Corma" },
      { situation: "On Enterprise Scale", recommendation: "Use native SCIM" },
    ],
    bottomLine: "Airtable's Enterprise Scale requirement adds opaque costs on top of an already premium Business plan.",
  },
];

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
  totalApps: 721,
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
