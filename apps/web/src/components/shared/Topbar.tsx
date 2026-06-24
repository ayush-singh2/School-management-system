"use client";

interface TopbarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  userName?: string;
  accentColor?: string;
}

export function Topbar({ title, subtitle, actions, userName, accentColor = "bg-blue-500" }: TopbarProps) {
  const now = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <header className="topbar">
      <div>
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle ?? now}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <button className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white" />
        </button>
        {userName && (
          <div className={`avatar w-9 h-9 text-xs font-bold ${accentColor} text-white`}>
            {userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
}
