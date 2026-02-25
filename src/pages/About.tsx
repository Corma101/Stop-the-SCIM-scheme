import { Link } from "react-router-dom";
import { Github, ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="px-6 pb-16 pt-20 text-center"
        style={{
          background:
          "linear-gradient(180deg, hsl(24 100% 97%) 0%, hsl(var(--background)) 100%)"
        }}>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono mb-8">

          <ArrowLeft className="h-4 w-4" />
          Back to directory
        </Link>

        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-medium leading-tight font-sans md:text-5xl">
          The SCIM Scheme Manifesto
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed font-mono italic">Security is not a p tier.

        </p>

        <a
          href="https://github.com/Corma101/Stop-the-SCIM-scheme"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border bg-secondary px-5 py-2 text-sm font-medium text-foreground font-mono shadow-sm transition-colors hover:bg-accent">

          <Github className="h-4 w-4" />
          Contribute on GitHub
        </a>
      </section>

      {/* Manifesto intro */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-4 text-muted-foreground font-mono text-sm leading-relaxed">
          <p>
            When an employee joins, their access should appear instantly. When they leave, it should disappear just as fast.
          </p>
          <p>That is not convenience. That is control.</p>
          <p>
            <a href="https://www.corma.io/blog/understanding-scim-and-saml-in-under-5-minutes" target="_blank" rel="noopener noreferrer" className="underline text-foreground hover:text-primary transition-colors">SCIM</a> — the standard for automated provisioning and deprovisioning — exists so companies can manage identity at scale without spreadsheets, tickets, and human delay. It closes gaps. It reduces risk. It protects customers.
          </p>
          <p>And yet, many vendors lock lifecycle automation behind enterprise paywalls.</p>
          <p>
            They charge more to remove access. They upsell security as a feature. They monetize what should be baseline hygiene.
          </p>
          <p className="text-foreground font-semibold">We call that the SCIM Scheme.</p>
        </div>
      </section>

      {/* We believe - highlight */}
      <section
        className="px-6 py-16"
        style={{
          background:
          "linear-gradient(180deg, hsl(24 100% 97%) 0%, hsl(var(--background)) 100%)"
        }}>

        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium font-sans mb-6">We believe</h2>
          <ul className="space-y-3 text-muted-foreground font-mono text-sm leading-relaxed">
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Access granted automatically. Access revoked immediately.</li>
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Security included by default.</li>
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> No upsell. No artificial tiers. No paying extra to be safe.</li>
          </ul>
          <p className="mt-6 text-sm font-mono text-muted-foreground">
            Modern companies deserve secure foundations — not premium add-ons.
          </p>
          <p className="mt-2 text-sm font-mono text-foreground font-semibold">
            Security is not an upgrade. It's the standard.
          </p>
        </div>
      </section>

      {/* Why the SCIM Scheme exists */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-medium font-sans mb-6">Why the SCIM Scheme exists</h2>
        <div className="space-y-4 text-muted-foreground font-mono text-sm leading-relaxed">
          <p>
            The SCIM Scheme is a community-driven initiative advocating for secure, automated identity lifecycle management to be accessible to every organization — not just enterprises with premium budgets.
          </p>
          <p>
            SCIM (System for Cross-domain Identity Management) is the open standard that enables automated provisioning and deprovisioning of users between identity providers (such as Okta, Microsoft Entra ID, Google Workspace) and SaaS applications.
          </p>
          <p>
            While Single Sign-On controls authentication, SCIM controls authorization lifecycle — automatically creating accounts, assigning roles, updating attributes, and most importantly, removing access the moment someone leaves.
          </p>
          <p>Without SCIM, IT teams are forced to manually:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Create user accounts in every SaaS tool</li>
            <li>Update roles and permissions individually</li>
            <li>Deactivate users one application at a time during offboarding</li>
          </ul>
          <p>This manual work is not just inefficient — it is a security risk.</p>
          <p>
            Imagine an employee leaving the company. Even if SSO access is revoked, local accounts or stale API tokens can persist. Multiply that across dozens of tools and the exposure window grows quickly.
          </p>
          <p className="text-foreground font-semibold">
            Lifecycle automation is not a "premium feature." It is foundational security hygiene.
          </p>
          <p>
            And yet, many vendors lock SCIM behind their most expensive enterprise tiers — often doubling or tripling the cost of the product.
          </p>
          <p>That's what we call the SCIM Scheme.</p>
        </div>
      </section>

      {/* What we believe */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-medium font-sans mb-6">What we believe</h2>
        <ul className="space-y-3 text-muted-foreground font-mono text-sm leading-relaxed">
          <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Automated provisioning and deprovisioning is a core security requirement</li>
          <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Identity lifecycle management should not be paywalled</li>
          <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Security features should not be upsell levers</li>
          <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Transparency drives better vendor behavior</li>
          <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Customers deserve clarity before signing contracts</li>
        </ul>
        <p className="mt-6 text-sm font-mono text-muted-foreground">
          Charging extra to remove former employees' access is not innovation — it is risk monetization.
        </p>
      </section>

      {/* What we do */}
      <section
        className="px-6 py-16"
        style={{
          background:
          "linear-gradient(180deg, hsl(24 100% 97%) 0%, hsl(var(--background)) 100%)"
        }}>

        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium font-sans mb-6">What we do</h2>
          <div className="space-y-4 text-muted-foreground font-mono text-sm leading-relaxed">
            <p>The SCIM Scheme aims to:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Document which vendors restrict SCIM behind premium plans</li>
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Highlight companies that make lifecycle automation accessible</li>
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Provide clear, updated information to buyers</li>
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Educate startups and IT teams about why SCIM matters</li>
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Encourage vendors to treat security as responsibility, not revenue</li>
            </ul>
            <p>
              This initiative is not about vendor shaming. It is about raising the baseline for SaaS security.
            </p>
            <p>When vendors make secure defaults accessible, we celebrate them.</p>
          </div>
        </div>
      </section>

      {/* Our goal */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="text-2xl font-medium font-sans mb-6">Our goal</h2>
        <p className="text-muted-foreground font-mono text-sm leading-relaxed">
          The objective is simple:
        </p>
        <p className="mt-4 text-lg font-sans font-medium text-foreground">
          Make secure lifecycle management the standard — not a surcharge.
        </p>
        <p className="mt-4 text-muted-foreground font-mono text-sm">
          Security should not be an upgrade.
        </p>
        <p className="text-foreground font-mono text-sm font-semibold">
          It should be included.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-xs text-muted-foreground font-mono">
        <div className="flex items-center justify-center gap-6 mb-3">
          <Link to="/" className="hover:text-foreground transition-colors">Directory</Link>
          <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link to="/sso-vs-scim" className="hover:text-foreground transition-colors">SSO vs SCIM</Link>
          <a href="https://github.com/Corma101/Stop-the-SCIM-scheme" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
        </div>
        <p>© 2026 Corma. SCIM Directory — Helping IT teams navigate provisioning complexity.</p>
      </footer>
    </div>);

};

export default About;