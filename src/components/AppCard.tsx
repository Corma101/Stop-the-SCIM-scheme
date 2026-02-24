import { Link } from "react-router-dom";
import { AppData, getScimStatusLabel, getScimStatusColor } from "@/data/apps";

const AppCard = ({ app }: { app: AppData }) => {
  return (
    <Link
      to={`/scim/${app.slug}`}
      className="group flex flex-col rounded-2xl border bg-card p-5 transition-all hover:shadow-md hover:border-primary/20"
    >
      <div className="flex items-start gap-4">
        <img src={app.logo} alt={`${app.name} logo`} className="h-12 w-12 rounded-xl" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-sm">{app.name}</h3>
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${getScimStatusColor(app.scimStatus)}`}>
              {getScimStatusLabel(app.scimStatus)}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{app.category}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs">
        <div>
          <span className="text-muted-foreground">
            {app.scimStatus === "no-scim" ? "Provisioning" : "SCIM Status"}
          </span>
          <span className="ml-1 font-medium">
            {app.scimStatus === "no-scim" ? "Not Supported" : "Included"}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Manual Cost</span>
          <span className="ml-1 font-medium">{app.manualCost}</span>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-3">
        {app.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-muted-foreground">
        <span className="rounded-md border px-2 py-0.5">Cost Calculator</span>
        <span className="rounded-md border px-2 py-0.5">SCIM Tier Breakdown</span>
        <span className="rounded-md border px-2 py-0.5">IdP Config Steps</span>
      </div>

      <p className="mt-4 text-xs font-medium text-primary group-hover:underline">
        View full guide
      </p>
    </Link>
  );
};

export default AppCard;
