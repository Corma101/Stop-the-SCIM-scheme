import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import StatsRow from "@/components/StatsRow";
import AppGrid from "@/components/AppGrid";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero with light orange gradient */}
      <section className="px-6 pb-16 pt-20 text-center" style={{ background: 'linear-gradient(180deg, hsl(24 100% 97%) 0%, hsl(var(--background)) 100%)' }}>
        <a
          href="https://github.com/Corma101/Stop-the-SCIM-scheme"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground font-mono transition-colors hover:bg-accent hover:text-foreground"
        >
          Maintained by Corma · Public Github repo available here
        </a>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-medium leading-tight font-sans md:text-5xl">
          Your exhaustive guide to SCIM support and tax prices across 1000+ apps
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed font-mono">
          We've built this collaborative list of apps and their SCIM support, pricing tiers, hidden costs and more so you know which vendors actually value security and which try to make money on a core feature that should be included by default. Everyone is free to participate, so join us in stopping the SCIM scheme.
        </p>

        <div className="mx-auto mt-8 max-w-lg">
          <SearchBar navigateOnSelect />
        </div>

        <div className="mt-10">
          <StatsRow onFilterChange={setActiveFilter} />
        </div>
      </section>

      {/* App Directory */}
      <section className="py-6">
        <AppGrid externalFilter={activeFilter} />
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        <p>© 2026 Corma. SCIM Directory — Helping IT teams navigate provisioning complexity.</p>
      </footer>
    </div>
  );
};

export default Index;
