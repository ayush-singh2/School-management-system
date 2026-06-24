"use client";

interface AIInsightProps {
  insight: string;
  loading?: boolean;
  label?: string;
  type?: "coach" | "report" | "copilot" | "analytics" | "recovery";
}

const TYPE_CONFIG = {
  coach:     { emoji: "🎯", label: "Student Coach", color: "from-violet-50 to-purple-50 border-violet-100", badge: "text-violet-700 bg-violet-100" },
  report:    { emoji: "📋", label: "AI Report",     color: "from-blue-50 to-indigo-50 border-blue-100",    badge: "text-blue-700 bg-blue-100" },
  copilot:   { emoji: "✨", label: "Teacher Copilot", color: "from-amber-50 to-orange-50 border-amber-100", badge: "text-amber-700 bg-amber-100" },
  analytics: { emoji: "📊", label: "Executive AI",  color: "from-emerald-50 to-teal-50 border-emerald-100", badge: "text-emerald-700 bg-emerald-100" },
  recovery:  { emoji: "💡", label: "Recovery AI",   color: "from-rose-50 to-pink-50 border-rose-100",      badge: "text-rose-700 bg-rose-100" },
};

export function AIInsight({ insight, loading, type = "report", label }: AIInsightProps) {
  const cfg = TYPE_CONFIG[type];
  const displayLabel = label ?? cfg.label;

  return (
    <div className={`rounded-2xl border bg-gradient-to-r ${cfg.color} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{cfg.emoji}</span>
        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${cfg.badge}`}>
          {displayLabel}
        </span>
        <span className="ml-auto text-[10px] text-slate-400 font-medium">AI · Groq LLaMA</span>
      </div>
      {loading ? (
        <div className="space-y-2 mt-1">
          <div className="h-3 bg-slate-200 rounded-full animate-pulse w-5/6" />
          <div className="h-3 bg-slate-200 rounded-full animate-pulse w-4/6" />
          <div className="h-3 bg-slate-200 rounded-full animate-pulse w-3/4" />
        </div>
      ) : (
        <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
      )}
    </div>
  );
}
