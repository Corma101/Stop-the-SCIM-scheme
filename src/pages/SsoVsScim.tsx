import { Link } from "react-router-dom";
import { ArrowLeft, Github } from "lucide-react";
import { useEffect } from "react";

const SsoVsScim = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="px-6 pb-16 pt-20 text-center"
        style={{
          background:
            "linear-gradient(180deg, hsl(24 100% 97%) 0%, hsl(var(--background)) 100%)",
        }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to directory
        </Link>

        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-medium leading-tight font-sans md:text-5xl">
          SSO vs SCIM
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed font-mono italic">
          Understanding Authentication vs. Identity Lifecycle
        </p>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-4 text-muted-foreground font-mono text-sm leading-relaxed">
          <p>Many vendors advertise SSO and SCIM together.<br />Many buyers assume they solve the same problem.</p>
          <p className="text-foreground font-semibold">They don't.</p>
          <p>SSO and SCIM address two completely different — but equally critical — parts of identity security.</p>
          <p>Understanding the difference can save your company from security gaps, manual processes, and expensive upsells.</p>
        </div>
      </section>

      {/* What is SSO */}
      <section
        className="px-6 py-16"
        style={{
          background:
            "linear-gradient(180deg, hsl(24 100% 97%) 0%, hsl(var(--background)) 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium font-sans mb-6">What is SSO?</h2>
          <div className="space-y-4 text-muted-foreground font-mono text-sm leading-relaxed">
            <p>SSO (Single Sign-On) centralizes authentication.</p>
            <p>It allows users to log in to multiple applications using one identity provider (IdP) such as:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Okta</li>
              <li>Microsoft Entra ID</li>
              <li>Google Workspace</li>
              <li>OneLogin</li>
            </ul>
            <p>Instead of managing passwords per tool, authentication is delegated to the identity provider using protocols like SAML or OpenID Connect (OIDC).</p>

            <p className="text-foreground font-semibold mt-6">What SSO does well:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Centralized login</li>
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Enforced Multi-Factor Authentication (MFA)</li>
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Immediate login revocation</li>
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Reduced password sprawl</li>
            </ul>

            <p className="text-foreground font-semibold mt-6">What SSO does not do:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Automatically create user accounts</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Assign roles or permissions</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Update user attributes</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Remove local accounts</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Deprovision API tokens</li>
            </ul>

            <p className="mt-6">SSO controls <span className="text-foreground font-semibold">who can log in</span>.</p>
            <p>It does not control the full lifecycle of access.</p>
          </div>
        </div>
      </section>

      {/* What is SCIM */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-medium font-sans mb-6">What is SCIM?</h2>
        <div className="space-y-4 text-muted-foreground font-mono text-sm leading-relaxed">
          <p>SCIM (System for Cross-domain Identity Management) automates user provisioning and deprovisioning.</p>
          <p>It is the protocol that allows your identity provider to:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Automatically create user accounts in SaaS tools</li>
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Assign roles and groups</li>
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Update profile attributes</li>
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Disable or delete accounts instantly when someone leaves</li>
          </ul>
          <p className="text-foreground font-semibold">SCIM is not about logging in. It is about managing identity lifecycle.</p>

          <p className="text-foreground font-semibold mt-6">What SCIM does:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Automates onboarding</li>
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Automates role changes</li>
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Automates offboarding</li>
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Eliminates manual account cleanup</li>
            <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Reduces orphaned accounts</li>
          </ul>

          <p className="mt-6">SCIM controls <span className="text-foreground font-semibold">what exists inside the application</span>.</p>
        </div>
      </section>

      {/* Comparison Table */}
      <section
        className="px-6 py-16"
        style={{
          background:
            "linear-gradient(180deg, hsl(24 100% 97%) 0%, hsl(var(--background)) 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium font-sans mb-6">The Simple Comparison</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-foreground font-semibold">Feature</th>
                  <th className="px-4 py-3 text-center text-foreground font-semibold">SSO</th>
                  <th className="px-4 py-3 text-center text-foreground font-semibold">SCIM</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Centralized login", true, false],
                  ["Enforces MFA", true, false],
                  ["Creates user accounts automatically", false, true],
                  ["Assigns roles & groups", false, true],
                  ["Updates user attributes", false, true],
                  ["Automatically removes access", false, true],
                  ["Prevents orphaned accounts", false, true],
                ].map(([feature, sso, scim], i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="px-4 py-3">{feature as string}</td>
                    <td className="px-4 py-3 text-center">{sso ? "✅" : "❌"}</td>
                    <td className="px-4 py-3 text-center">{scim ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why You Need Both */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-medium font-sans mb-6">Why You Need Both</h2>
        <div className="space-y-6 text-muted-foreground font-mono text-sm leading-relaxed">
          <div>
            <p className="text-foreground font-semibold mb-2">SSO without SCIM means:</p>
            <ul className="space-y-1 pl-2">
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Users may still have manually created accounts</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Offboarding requires manual cleanup</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Access may persist even after SSO is disabled</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> IT teams rely on tickets and spreadsheets</li>
            </ul>
          </div>
          <div>
            <p className="text-foreground font-semibold mb-2">SCIM without SSO means:</p>
            <ul className="space-y-1 pl-2">
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Lifecycle is automated</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> But authentication is fragmented</li>
            </ul>
          </div>
          <div>
            <p className="text-foreground font-semibold mb-2">Together, they provide:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Centralized authentication</li>
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Automated lifecycle management</li>
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Immediate deprovisioning</li>
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Reduced operational overhead</li>
              <li className="flex items-start gap-2"><span className="text-foreground mt-0.5">→</span> Stronger compliance posture</li>
            </ul>
          </div>
          <p className="text-foreground font-semibold">
            SSO controls access to the door.<br />SCIM controls whether the door exists.
          </p>
        </div>
      </section>

      {/* Where the Problem Begins */}
      <section
        className="px-6 py-16"
        style={{
          background:
            "linear-gradient(180deg, hsl(24 100% 97%) 0%, hsl(var(--background)) 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium font-sans mb-6">Where the Problem Begins</h2>
          <div className="space-y-4 text-muted-foreground font-mono text-sm leading-relaxed">
            <p>Many SaaS vendors:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Include SSO only in enterprise plans</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Lock SCIM behind even higher tiers</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Charge 2x–4x more for identity features</li>
            </ul>
            <p>This creates a dangerous dynamic:</p>
            <p className="text-foreground font-semibold">Security becomes an upsell.</p>
            <p>Companies must pay more to:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Enforce MFA</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Automatically remove former employees</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 mt-0.5">✗</span> Prevent access sprawl</li>
            </ul>
            <p className="text-foreground font-semibold">
              Lifecycle management is not a luxury feature.<br />It is baseline infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-medium font-sans mb-6">Real-World Example</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <p className="text-foreground font-semibold font-mono text-sm mb-4">Without SCIM:</p>
            <ol className="space-y-2 text-muted-foreground font-mono text-sm leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-muted-foreground/40 font-semibold">1.</span> HR marks employee as terminated</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/40 font-semibold">2.</span> IT disables SSO access</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/40 font-semibold">3.</span> IT manually logs into 25 SaaS tools</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/40 font-semibold">4.</span> Accounts are suspended one by one</li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground/60 font-semibold">5.</span> Some tools are forgotten</li>
            </ol>
          </div>
          <div className="rounded-lg border bg-muted/30 p-6">
            <p className="text-foreground font-semibold font-mono text-sm mb-4">With SCIM:</p>
            <ol className="space-y-2 text-muted-foreground font-mono text-sm leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-foreground/40 font-semibold">1.</span> HR updates status</li>
              <li className="flex items-start gap-2"><span className="text-foreground/40 font-semibold">2.</span> Identity provider updates</li>
              <li className="flex items-start gap-2"><span className="text-foreground/40 font-semibold">3.</span> All connected apps disable access automatically</li>
              <li className="flex items-start gap-2"><span className="text-foreground/40 font-semibold">4.</span> Audit logs reflect instant revocation</li>
            </ol>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-muted-foreground font-mono text-sm">
            The difference is <span className="text-foreground font-semibold">hours vs seconds</span>.<br />
            The difference is <span className="text-foreground font-semibold">risk vs control</span>.
          </p>
        </div>
      </section>

      {/* Bottom Line */}
      <section
        className="px-6 py-16 text-center"
        style={{
          background:
            "linear-gradient(180deg, hsl(24 100% 97%) 0%, hsl(var(--background)) 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium font-sans mb-6">The Bottom Line</h2>
          <div className="space-y-2 text-muted-foreground font-mono text-sm leading-relaxed">
            <p><span className="text-foreground font-semibold">SSO</span> = Authentication</p>
            <p><span className="text-foreground font-semibold">SCIM</span> = Identity Lifecycle Automation</p>
          </div>
          <p className="mt-6 text-muted-foreground font-mono text-sm">
            They are complementary — not interchangeable.
          </p>
          <p className="mt-2 text-muted-foreground font-mono text-sm">
            Modern SaaS security requires both.
          </p>
          <p className="mt-2 text-muted-foreground font-mono text-sm">
            And neither should be treated as a premium add-on.
          </p>
          <p className="mt-6 text-lg font-sans font-medium text-foreground">
            Security should not be an upgrade tier.
          </p>
          <p className="text-foreground font-mono text-sm font-semibold">
            It should be the default.
          </p>
        </div>
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
    </div>
  );
};

export default SsoVsScim;
