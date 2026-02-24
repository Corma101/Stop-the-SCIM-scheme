import { stats } from "@/data/apps";

const StatsRow = () => {
  const items = [
    { value: stats.totalApps.toString(), label: "Apps analyzed" },
    { value: stats.noScimPercent, label: "No SCIM support" },
    { value: stats.scimTaxPercent, label: "Apps with SCIM tax" },
    { value: stats.avgScimTax, label: "Avg SCIM tax", sublabel: "Avg price increase just to enable SCIM" },
  ];

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-4">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center justify-center bg-card px-4 py-6 text-center">
          <span className="text-3xl font-bold font-serif text-foreground">{item.value}</span>
          <span className="mt-1 text-sm text-muted-foreground">{item.label}</span>
          {item.sublabel && (
            <span className="mt-1 text-[11px] text-primary">{item.sublabel}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
