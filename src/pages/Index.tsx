import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import StatsRow from "@/components/StatsRow";
import CategoryCards from "@/components/CategoryCards";
import AppGrid from "@/components/AppGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="px-6 pb-16 pt-20 text-center">
        <span className="inline-block rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Powered by Stitchflow
        </span>

        <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight font-serif md:text-5xl">
          The definitive guide to SCIM support across 721 apps
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
          We researched every app's provisioning support, pricing tiers, hidden upgrade costs, and technical specs — so you don't have to.
        </p>

        <div className="mx-auto mt-8 max-w-lg">
          <SearchBar navigateOnSelect placeholder="Search for Slack.." />
        </div>

        <div className="mt-10">
          <StatsRow />
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary/50 py-16">
        <CategoryCards />
      </section>

      {/* App Directory */}
      <section className="py-16">
        <AppGrid />
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        <p>© 2026 Stitchflow. SCIM Directory — Helping IT teams navigate provisioning complexity.</p>
      </footer>
    </div>
  );
};

export default Index;
