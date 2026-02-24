import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Lock, Check, X, Minus, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { getAppBySlug, getScimStatusLabel, getScimStatusColor } from "@/data/apps";
import { useState, useEffect } from "react";

const AppDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const app = getAppBySlug(slug || "");
  const [activeSection, setActiveSection] = useState("summary");

  const sections = [
    { id: "summary", label: "Summary" },
    { id: "quick-facts", label: "At a glance" },
    { id: "supported-idps", label: "Identity providers" },
    { id: "cost", label: "Hidden costs" },
    { id: "pricing", label: "Pricing analysis" },
    { id: "challenges", label: "Summary of challenges" },
    { id: "community", label: "What admins say" },
    { id: "decision", label: "Recommendation" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  if (!app) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <h1 className="text-2xl font-medium font-sans">App not found</h1>
          <Link to="/" className="mt-4 text-sm text-primary hover:underline">← Back to directory</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to directory
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <img src={app.logo} alt={app.name} className="h-16 w-16 rounded-2xl" />
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-medium font-sans md:text-4xl">{app.name} SCIM guide</h1>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getScimStatusColor(app.scimStatus)}`}>
                {app.scimStatus === "no-scim" ? "No SCIM" : "Native SCIM"}
              </span>
            </div>
            <p className="mt-2 text-muted-foreground">How to automate {app.name} user provisioning, and what it actually costs</p>
            {app.scimTier !== "N/A" && app.scimTier !== "All Editions" && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                Native SCIM requires <strong className="text-foreground">{app.scimTier}</strong> plan
              </div>
            )}
          </div>
          <div className="w-full max-w-xs">
            <SearchBar navigateOnSelect placeholder="Search apps..." />
          </div>
        </div>

        <div className="mt-12 flex gap-12">
          {/* Sidebar TOC */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Contents</p>
            <nav className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    activeSection === s.id
                      ? "bg-accent font-medium text-foreground border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1 space-y-12">
            {/* Summary */}
            <section id="summary">
              <h2 className="text-2xl font-medium font-sans">Summary and recommendation</h2>
              <p className="mt-4 leading-relaxed text-foreground/90">{app.detailedSummary}</p>
              <div className="mt-6 rounded-2xl border-l-4 border-badge-green-foreground bg-badge-green p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-badge-green-foreground" />
                  <div>
                    <h3 className="font-semibold text-sm">The strategic alternative</h3>
                    <p className="mt-1 text-sm text-foreground/80">{app.strategicAlternative}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Facts */}
            <section id="quick-facts">
              <h2 className="text-2xl font-medium font-sans">Quick SCIM facts</h2>
              <div className="mt-4 overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ["SCIM available?", app.quickFacts.scimAvailable],
                      ["SCIM tier required", app.quickFacts.scimTierRequired],
                      ["SSO required first?", app.quickFacts.ssoRequired],
                      ["SSO available?", app.quickFacts.ssoAvailable],
                      ["SSO protocol", app.quickFacts.ssoProtocol],
                    ].map(([key, val], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                        <td className="px-4 py-3 font-medium text-muted-foreground">{key}</td>
                        <td className="px-4 py-3">{val}</td>
                      </tr>
                    ))}
                    <tr className={5 % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                      <td className="px-4 py-3 font-medium text-muted-foreground">Documentation</td>
                      <td className="px-4 py-3">
                        <a href={app.quickFacts.docsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Official docs
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* IdP Support */}
            <section id="supported-idps">
              <h2 className="text-2xl font-medium font-sans">Supported identity providers</h2>
              <div className="mt-4 overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">IdP</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">SSO</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">SCIM</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {app.idpSupport.map((idp, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                        <td className="px-4 py-3 font-medium">{idp.name}</td>
                        <td className="px-4 py-3">
                          {idp.sso ? <Check className="h-4 w-4 text-badge-green-foreground" /> : <X className="h-4 w-4 text-badge-red-foreground" />}
                        </td>
                        <td className="px-4 py-3">
                          {idp.scim === true ? <Check className="h-4 w-4 text-badge-green-foreground" /> :
                           idp.scim === false ? <X className="h-4 w-4 text-badge-red-foreground" /> :
                           <span className="text-xs text-badge-orange-foreground font-medium">Limited</span>}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{idp.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Cost */}
            <section id="cost">
              <h2 className="text-2xl font-medium font-sans">The cost of not automating</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Without SCIM (or an alternative), your IT team manages {app.name} accounts manually:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Orphaned accounts", value: app.costBreakdown.orphanedAccounts.toString() },
                  { label: "Unused licenses", value: app.costBreakdown.unusedLicenses.toString() },
                  { label: "IT hours/year", value: `${app.costBreakdown.itHoursPerYear} hours` },
                  { label: "Unused license cost/yr", value: app.costBreakdown.unusedLicenseCost },
                  { label: "IT labor cost/yr", value: app.costBreakdown.itLaborCost },
                  { label: "Total annual impact", value: app.costBreakdown.totalAnnualImpact, highlight: true },
                ].map((item, i) => (
                  <div key={i} className={`rounded-xl border p-4 ${item.highlight ? "bg-primary/5 border-primary/20" : "bg-card"}`}>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className={`mt-1 text-lg font-medium font-sans ${item.highlight ? "text-primary" : ""}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing">
              <h2 className="text-2xl font-medium font-sans">The {app.name} pricing problem</h2>
              <div className="mt-4 overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Plan</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Price</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">SSO</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">SCIM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {app.pricing.plans.map((plan, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                        <td className="px-4 py-3 font-medium">{plan.name}</td>
                        <td className="px-4 py-3">{plan.price}</td>
                        <td className="px-4 py-3">
                          {plan.sso ? <Check className="h-4 w-4 text-badge-green-foreground" /> : <Minus className="h-4 w-4 text-muted-foreground" />}
                        </td>
                        <td className="px-4 py-3">
                          {plan.scim ? <Check className="h-4 w-4 text-badge-green-foreground" /> : <Minus className="h-4 w-4 text-muted-foreground" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {app.pricing.note && (
                <p className="mt-3 text-xs text-muted-foreground italic">{app.pricing.note}</p>
              )}
              {app.pricing.upgradeCosts.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium font-sans">What this means in practice</h3>
                  <div className="mt-3 overflow-hidden rounded-xl border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium text-muted-foreground">Team Size</th>
                          <th className="px-4 py-3 text-left font-medium text-muted-foreground">Annual Upgrade Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {app.pricing.upgradeCosts.map((cost, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                            <td className="px-4 py-3">{cost.teamSize}</td>
                            <td className="px-4 py-3 font-medium">{cost.annualCost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            {/* Challenges */}
            <section id="challenges">
              <h2 className="text-2xl font-medium font-sans">Summary of challenges</h2>
              <ul className="mt-4 space-y-2">
                {app.challenges.map((ch, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {ch}
                  </li>
                ))}
              </ul>
            </section>

            {/* Community */}
            <section id="community">
              <h2 className="text-2xl font-medium font-sans">What IT admins are saying</h2>
              <div className="mt-4 space-y-4">
                {app.communityQuotes.map((q, i) => (
                  <blockquote key={i} className="rounded-xl border bg-card p-5">
                    <p className="text-sm italic text-foreground/90">"{q.quote}"</p>
                    <cite className="mt-2 block text-xs text-muted-foreground not-italic">{q.source}</cite>
                  </blockquote>
                ))}
              </div>
            </section>

            {/* Recommendation */}
            <section id="decision">
              <h2 className="text-2xl font-medium font-sans">The decision</h2>
              <div className="mt-4 overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Your Situation</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {app.recommendations.map((rec, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                        <td className="px-4 py-3">{rec.situation}</td>
                        <td className="px-4 py-3 font-medium">{rec.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 rounded-2xl border bg-card p-6">
                <p className="text-sm font-semibold">The bottom line</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{app.bottomLine}</p>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
              <h2 className="text-2xl font-medium font-sans">Make {app.name} workflows AI-native</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground font-mono">
                Skip the Enterprise upgrade. We build complete offboarding, user access reviews, and license workflows without the SCIM Tax.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground font-mono uppercase">
                <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-badge-green-foreground" /> No Enterprise upgrade required</span>
                <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-badge-green-foreground" /> Less than a week setup</span>
                <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-badge-green-foreground" /> We maintain the integration</span>
              </div>
              <a
                href="https://meetings-eu1.hubspot.com/nikolai-fomm/meeting-book-identity-governance?uuid=0790fc0b-b0e7-452c-8845-d81d07c86572"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Book a Demo
              </a>
            </section>
          </main>
        </div>
      </div>

      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        <p>© 2026 Corma. SCIM Directory.</p>
      </footer>
    </div>
  );
};

export default AppDetail;
