import { stats } from "@/data/apps";

interface StatsRowProps {
  onFilterChange?: (filter: string) => void;
}

const StatsRow = ({ onFilterChange }: StatsRowProps) => {
  const items = [
    { value: stats.totalApps.toString(), label: "Apps analyzed", filter: "all" },
    { value: stats.noScimPercent, label: "No SCIM support", filter: "no-scim" },
    { value: stats.scimTaxPercent, label: "Apps with SCIM tax", filter: "scim-tax" },
    { value: stats.avgScimTax, label: "Avg SCIM tax", sublabel: "Avg price increase just to enable SCIM", filter: "scim-tax" },
  ];

  const handleClick = (filter: string) => {
    onFilterChange?.(filter);
    const grid = document.getElementById("app-directory");
    if (grid) grid.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-4">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => handleClick(item.filter)}
          className="flex flex-col items-center justify-center bg-card px-4 py-6 text-center transition-colors hover:bg-accent cursor-pointer"
        >
          <span className="text-3xl font-medium font-sans text-foreground">{item.value}</span>
          <span className="mt-1 text-sm text-muted-foreground">{item.label}</span>
          {item.sublabel && (
            <span className="mt-1 text-[11px] text-primary">{item.sublabel}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default StatsRow;
