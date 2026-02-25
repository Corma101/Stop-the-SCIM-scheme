import { Link } from "react-router-dom";
import { Github, ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is SCIM?",
    answer:
      "SCIM (System for Cross-domain Identity Management) is an open standard that automates user provisioning and de-provisioning between identity providers and SaaS applications. It ensures that when an employee joins, moves, or leaves an organization, their access is updated automatically.",
  },
  {
    question: "Why does SCIM support matter?",
    answer:
      "Without SCIM, IT teams must manually create, update, and remove user accounts across every application. This is time-consuming, error-prone, and creates serious security risks — especially when offboarding is delayed and former employees retain access.",
  },
  {
    question: "What is the 'SCIM tax'?",
    answer:
      "The SCIM tax refers to vendors locking SCIM provisioning behind their most expensive pricing tiers. This forces organizations to pay significantly more just to access a basic security feature, turning identity management into a revenue lever rather than a standard capability.",
  },
  {
    question: "How is this directory maintained?",
    answer:
      "This directory is collaboratively maintained by the community and curated by Corma. Anyone can contribute via our public GitHub repository. We verify submissions and keep entries up to date as vendors change their policies.",
  },
  {
    question: "Can I contribute to the directory?",
    answer:
      "Absolutely! We welcome contributions from IT admins, security engineers, and anyone who has first-hand experience with SCIM implementations. Head over to our GitHub repository to submit updates, corrections, or new app entries.",
  },
  {
    question: "Who is Corma?",
    answer:
      "Corma is an identity governance platform that helps IT teams automate user lifecycle management. We built this directory because we believe SCIM should be a standard feature, not a premium upsell.",
  },
];

const About = () => {
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
          About Stop the SCIM Scheme
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed font-mono">
          We believe SCIM provisioning is a fundamental security feature — not a
          premium add-on. This project exists to bring transparency to how SaaS
          vendors handle identity management and to push the industry toward
          making SCIM available at every pricing tier.
        </p>

        <a
          href="https://github.com/Corma101/Stop-the-SCIM-scheme"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border bg-secondary px-5 py-2 text-sm font-medium text-foreground font-mono shadow-sm transition-colors hover:bg-accent"
        >
          <Github className="h-4 w-4" />
          Contribute on GitHub
        </a>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-medium font-sans mb-6">Our mission</h2>
        <div className="space-y-4 text-muted-foreground font-mono text-sm leading-relaxed">
          <p>
            Every year, organizations lose thousands of hours manually managing
            user accounts across their SaaS stack. Worse, delayed offboarding
            creates security vulnerabilities that put sensitive data at risk.
          </p>
          <p>
            SCIM solves this problem — but too many vendors gate it behind
            enterprise pricing tiers, effectively taxing companies for wanting
            better security. We think that's wrong.
          </p>
          <p>
            This directory catalogs 1,000+ applications and their SCIM support
            status, pricing requirements, and community feedback. Our goal is
            simple: arm IT teams with the information they need to make better
            purchasing decisions and hold vendors accountable.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="text-2xl font-medium font-sans mb-6">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-mono text-sm">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-mono text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-xs text-muted-foreground font-mono">
        <div className="flex items-center justify-center gap-6 mb-3">
          <Link to="/" className="hover:text-foreground transition-colors">
            Directory
          </Link>
          <Link to="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <a
            href="https://github.com/Corma101/Stop-the-SCIM-scheme"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
        <p>© 2026 Corma. SCIM Directory — Helping IT teams navigate provisioning complexity.</p>
      </footer>
    </div>
  );
};

export default About;
