import { useState, useMemo } from "react";
import { apps, ScimStatus } from "@/data/apps";
import AppCard from "./AppCard";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

const AppGrid = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("az");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = [...apps];
    if (searchQuery) {
      result = result.filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (statusFilter !== "all") {
      result = result.filter((a) => a.scimStatus === statusFilter);
    }
    if (sortBy === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "za") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    return result;
  }, [statusFilter, sortBy, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">Filter by:</span>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-lg border bg-card px-4 py-2 pr-8 text-sm outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Statuses</option>
            <option value="has-scim">Has SCIM</option>
            <option value="scim-tax">SCIM Tax</option>
            <option value="no-scim">No SCIM</option>
          </select>
          <SlidersHorizontal className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-lg border bg-card px-4 py-2 pr-8 text-sm outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
          <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">No apps found matching your filters.</p>
      )}
    </div>
  );
};

export default AppGrid;
