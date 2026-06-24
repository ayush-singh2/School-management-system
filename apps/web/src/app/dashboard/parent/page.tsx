import { Sidebar, NavItem } from "@/components/shared/Sidebar";
import { StatCard } from "@/components/shared/StatCard";
import { AIInsight } from "@/components/ai/AIInsight";
import { Topbar } from "@/components/shared/Topbar";

const NAV: NavItem[] = [
  { label: "Child Overview",  href: "/dashboard/parent",             icon: "🏠" },
  { label: "Attendance",      href: "/dashboard/parent/attendance",  icon: "📅" },
  { label: "Marks & Results", href: "/dashboard/parent/marks",       icon: "📝" },
  { label: "Fee Management",  href: "/dashboard/parent/fees",        icon: "💳", badge: 1 },
  { label: "Messages",        href: "/dashboard/parent/messages",    icon: "💬", badge: 2 },
  { label: "Appointments",    href: "/dashboard/parent/appointments", icon: "📆" },
];

export default function ParentDashboard(): React.JSX.Element {
  return (
    <div className="portal-shell">
      <Sidebar title="Jitendra Public School" subtitle="Parent Portal"
        navItems={NAV} userName="Mr. Rajesh Singh" userRole="parent" accentColor="bg-emerald-500" />

      <div className="portal-main">
        <Topbar title="Child Dashboard" subtitle="Ayush Singh · Class 8A · Roll No. 8A-001"
          userName="Rajesh Singh" accentColor="bg-emerald-500" />

        <div className="content-area">
          <AIInsight type="report"
            insight="Ayush has improved by 15% in Mathematics during the last quarter — a significant leap. Attendance is excellent at 92%. Science performance has declined slightly from 89% to 85% and may require attention. Overall, Ayush is on a positive academic trajectory." />

          {/* Four pillars */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Attendance" value="92%" subtext="4% above last month" icon="📅" variant="success" trend="up" />
            <StatCard label="Overall Grade" value="B+" subtext="Avg 82% across subjects" icon="🏆" variant="info" />
            <StatCard label="Behaviour" value="Excellent" subtext="No incidents this term" icon="⭐" variant="success" />
            <StatCard label="Fees Due" value="₹12,500" subtext="Due: 15 Jul 2026" icon="💳" variant="danger" trend="down" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Fee card */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-slate-900">Fee Management</h2>
                <span className="badge badge-red">1 Due</span>
              </div>
              <div className="space-y-3">
                {[
                  { term: "Q1 2026 — Tuition", amount: "₹8,500", status: "Paid", date: "28 Mar 2026", paid: true },
                  { term: "Q2 2026 — Tuition", amount: "₹12,500", status: "Due", date: "15 Jul 2026", paid: false },
                ].map((f) => (
                  <div key={f.term} className={`flex items-center justify-between px-4 py-3 rounded-xl ${f.paid ? "bg-slate-50" : "bg-red-50 border border-red-100"}`}>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{f.term}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{f.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{f.amount}</p>
                      <span className={f.paid ? "badge badge-green text-[10px]" : "badge badge-red text-[10px]"}>{f.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-primary w-full justify-center mt-4">
                💳 Pay ₹12,500 Now
              </button>
            </div>

            {/* Messages */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-900">Recent Messages</h2>
                <button className="text-xs text-blue-600 hover:underline">View all</button>
              </div>
              <div className="space-y-3">
                {[
                  { from: "Mr. Sharma", role: "Math Teacher", msg: "Please ensure Ayush revises Chapter 4 before Friday's unit test.", time: "2h ago", unread: true },
                  { from: "Ms. Priya Verma", role: "Class Teacher", msg: "Parent-teacher meeting scheduled for 28 June at 10 AM.", time: "1d ago", unread: true },
                  { from: "School Admin", role: "Administration", msg: "Annual Day celebration on 28th June. Parents are warmly invited.", time: "3d ago", unread: false },
                ].map((m) => (
                  <div key={m.from} className={`px-4 py-3 rounded-xl border transition-colors ${m.unread ? "border-blue-100 bg-blue-50/50" : "border-slate-100 hover:bg-slate-50"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="avatar w-6 h-6 text-[10px] bg-blue-500">{m.from.split(" ").map((n) => n[0]).join("").slice(0,2)}</div>
                        <p className="text-xs font-semibold text-slate-800">{m.from}</p>
                        <span className="text-[10px] text-slate-400">{m.role}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {m.unread && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                        <span className="text-[10px] text-slate-400">{m.time}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{m.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
