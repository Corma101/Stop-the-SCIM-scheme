import { useState, useMemo, useEffect } from "react";
import { apps, ScimStatus, getScimStatusLabel, getScimStatusColor } from "@/data/apps";
import AppCard from "./AppCard";
import { SlidersHorizontal, ArrowUpDown, LayoutGrid, List } from "lucide-react";
import { Link } from "react-router-dom";

interface AppGridProps {
  externalFilter?: string;
}

const AppGrid = ({ externalFilter }: AppGridProps) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("az");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  useEffect(() => {
    if (externalFilter) setStatusFilter(externalFilter);
  }, [externalFilter]);

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
    <div id="app-directory" className="mx-auto max-w-7xl px-6">
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

        {/* View toggle - right aligned */}
        <div className="ml-auto flex items-center gap-1 rounded-lg border p-1">
          <button
            onClick={() => setViewMode("card")}
            className={`rounded-md p-1.5 transition-colors ${viewMode === "card" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            title="Card view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`rounded-md p-1.5 transition-colors ${viewMode === "table" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            title="Table view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {viewMode === "card" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Logo</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Vendor</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">SCIM Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Base Pricing</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">SCIM Pricing</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">% Increase</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, i) => {
                const basePlan = app.pricing.plans[0];
                const scimPlan = app.pricing.plans.find((p) => p.scim);
                return (
                  <tr key={app.slug} className={`${i % 2 === 0 ? "bg-card" : "bg-muted/30"} transition-colors hover:bg-accent/50`}>
                    <td className="px-4 py-3">
                      <Link to={`/scim/${app.slug}`}>
                        <img src={app.logo} alt={app.name} className="h-8 w-8 rounded-lg" />
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      <Link to={`/scim/${app.slug}`} className="hover:text-primary transition-colors">
                        {app.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${getScimStatusColor(app.scimStatus)}`}>
                        {getScimStatusLabel(app.scimStatus)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{basePlan?.price ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{scimPlan?.price ?? "N/A"}</td>
                    <td className="px-4 py-3 font-medium text-primary">{app.percentIncrease ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{app.lastUpdated ?? "Jan 2026"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">No apps found matching your filters.</p>
      )}
    </div>
  );
};

export default AppGrid;
