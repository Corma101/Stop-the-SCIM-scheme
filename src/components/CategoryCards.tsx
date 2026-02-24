import { categories } from "@/data/apps";
import { ZapOff, Lock, FileText, TrendingUp } from "lucide-react";

const iconMap = {
  "zap-off": ZapOff,
  lock: Lock,
  "file-text": FileText,
  "trending-up": TrendingUp,
};

const CategoryCards = () => {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Browse by category
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, i) => {
          const Icon = iconMap[cat.icon];
          return (
            <button
              key={i}
              className="group flex flex-col gap-3 rounded-2xl border bg-card p-5 text-left transition-all hover:shadow-md hover:border-primary/20"
            >
              <Icon className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium text-sm font-sans">{cat.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed font-mono">{cat.description}</p>
              </div>
              <p className="mt-auto text-sm">
                <span className="font-bold">{cat.count}</span>{" "}
                <span className="text-muted-foreground">apps</span>
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCards;
