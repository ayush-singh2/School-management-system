import { Sidebar, NavItem } from "@/components/shared/Sidebar";
import { StatCard } from "@/components/shared/StatCard";
import { AIInsight } from "@/components/ai/AIInsight";
import { Topbar } from "@/components/shared/Topbar";

const NAV: NavItem[] = [
  { label: "Dashboard",     href: "/dashboard/principal",               icon: "🏠" },
  { label: "Staff",         href: "/dashboard/principal/staff",         icon: "👩‍🏫" },
  { label: "Academic",      href: "/dashboard/principal/academic",      icon: "📊" },
  { label: "Admissions",    href: "/dashboard/principal/admissions",    icon: "📋" },
  { label: "Reports",       href: "/dashboard/principal/reports",       icon: "📄" },
  { label: "Announcements", href: "/dashboard/principal/announcements", icon: "📢" },
];

const CLASS_PERFORMANCE = [
  { class: "Class 10A", avg: 84, strength: 42 },
  { class: "Class 10B", avg: 78, strength: 40 },
  { class: "Class 9A",  avg: 81, strength: 45 },
  { class: "Class 9B",  avg: 73, strength: 43 },
  { class: "Class 8A",  avg: 76, strength: 42 },
  { class: "Class 8B",  avg: 71, strength: 41 },
];

export default function PrincipalDashboard(): React.JSX.Element {
  return (
    <div className="portal-shell">
      <Sidebar title="Jitendra Public School" subtitle="Principal Office"
        navItems={NAV} userName="Dr. A.K. Principal" userRole="principal" accentColor="bg-indigo-600" />

      <div className="portal-main">
        <Topbar title="School Overview" subtitle="Academic Year 2025–26 · Q2 Dashboard"
          userName="AK Principal" accentColor="bg-indigo-600" />

        <div className="content-area">
          <AIInsight type="analytics"
            insight="School-wide attendance is at 91% — excellent. Class 10A continues to lead academically (avg 84%). A 7% decline in Class 9B performance warrants intervention; recommend additional Math coaching sessions. Fee collection is at 94%, 6% higher than last quarter. 14 new admissions confirmed this week." />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Students"   value={487}  subtext="14 new this month" icon="🎓" variant="info" trend="up" />
            <StatCard label="Avg Attendance"   value="91%"  subtext="+3% vs last month" icon="📅" variant="success" trend="up" />
            <StatCard label="School Avg Grade" value="78%"  subtext="Across all classes" icon="📊" variant="info" />
            <StatCard label="Fee Collection"   value="94%"  subtext="₹2.4L this year" icon="💰" variant="success" trend="up" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Class-wise Academic Performance</h2>
              <div className="space-y-3">
                {CLASS_PERFORMANCE.map((c) => (
                  <div key={c.class} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-600 w-20 shrink-0">{c.class}</span>
                    <div className="flex-1 progress-bar">
                      <div
                        className={`progress-fill ${c.avg >= 80 ? "bg-emerald-500" : c.avg >= 75 ? "bg-blue-500" : "bg-amber-500"}`}
                        style={{ width: `${c.avg}%` }}
                      />
                    </div>
                    <span className={`text-xs font-bold w-10 text-right ${c.avg >= 80 ? "text-emerald-600" : c.avg >= 75 ? "text-blue-600" : "text-amber-600"}`}>
                      {c.avg}%
                    </span>
                    <span className="text-xs text-slate-400 w-12 text-right">{c.strength} std</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Operational Metrics</h2>
              <div className="space-y-3">
                {[
                  { label: "Teacher Attendance", value: "96%", status: "excellent", icon: "👩‍🏫" },
                  { label: "New Admissions (This Month)", value: "14", status: "good", icon: "📋" },
                  { label: "Pending Fee Recovery", value: "₹16,000", status: "warning", icon: "⚠️" },
                  { label: "Library Books Issued", value: "128", status: "good", icon: "📚" },
                  { label: "Transport Routes Active", value: "5 of 6", status: "warning", icon: "🚌" },
                  { label: "Hostel Occupancy", value: "92%", status: "excellent", icon: "🏠" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-base">{m.icon}</span>
                      <span className="text-sm text-slate-700">{m.label}</span>
                    </div>
                    <span className={`text-sm font-bold ${
                      m.status === "excellent" ? "text-emerald-600" :
                      m.status === "good" ? "text-blue-600" : "text-amber-600"}`}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary text-sm">📢 Send Announcement</button>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-4 py-2 rounded-xl font-medium transition-colors">
                📊 Generate Report
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-4 py-2 rounded-xl font-medium transition-colors">
                👩‍🏫 Staff Attendance
              </button>
              <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm px-4 py-2 rounded-xl font-medium transition-colors">
                📋 Admission Pipeline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
