interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
  icon: string;
  iconBg?: string;
  variant?: "default" | "success" | "danger" | "warning" | "info";
}

const VARIANT_STYLES = {
  default:  { icon: "bg-slate-100 text-slate-600",  border: "" },
  success:  { icon: "bg-emerald-100 text-emerald-600", border: "border-l-4 border-l-emerald-400" },
  danger:   { icon: "bg-red-100 text-red-600",      border: "border-l-4 border-l-red-400" },
  warning:  { icon: "bg-amber-100 text-amber-600",  border: "border-l-4 border-l-amber-400" },
  info:     { icon: "bg-blue-100 text-blue-600",    border: "border-l-4 border-l-blue-400" },
};

export function StatCard({ label, value, subtext, trend, icon, variant = "default" }: StatCardProps) {
  const s = VARIANT_STYLES[variant];
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "";
  const trendColor = trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-slate-400";

  return (
    <div className={`stat-card ${s.border}`}>
      <div className={`stat-icon ${s.icon} text-xl`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-900 leading-none">{value}</p>
        {subtext && (
          <p className={`text-xs mt-1.5 font-medium ${trendColor}`}>
            {trendIcon && <span className="mr-0.5">{trendIcon}</span>}{subtext}
          </p>
        )}
      </div>
    </div>
  );
}
