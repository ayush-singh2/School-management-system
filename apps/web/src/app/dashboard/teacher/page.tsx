import { Sidebar, NavItem } from "@/components/shared/Sidebar";
import { StatCard } from "@/components/shared/StatCard";
import { AIInsight } from "@/components/ai/AIInsight";
import { Topbar } from "@/components/shared/Topbar";

const NAV: NavItem[] = [
  { label: "Dashboard",    href: "/dashboard/teacher",             icon: "🏠" },
  { label: "Attendance",   href: "/dashboard/teacher/attendance",  icon: "📅" },
  { label: "Marks Entry",  href: "/dashboard/teacher/marks",       icon: "📝" },
  { label: "Assignments",  href: "/dashboard/teacher/assignments", icon: "📚" },
  { label: "Timetable",    href: "/dashboard/teacher/timetable",   icon: "🗓" },
  { label: "Messages",     href: "/dashboard/teacher/messages",    icon: "💬", badge: 4 },
];

const CLASS_STUDENTS = [
  { roll: "8A-001", name: "Ayush Singh",  status: "P" as const },
  { roll: "8A-002", name: "Priya Verma",  status: "P" as const },
  { roll: "8A-003", name: "Rahul Gupta",  status: "A" as const },
  { roll: "8A-004", name: "Sneha Yadav",  status: "P" as const },
  { roll: "8A-005", name: "Kiran Sharma", status: "L" as const },
  { roll: "8A-006", name: "Mohit Mishra", status: "P" as const },
];

export default function TeacherDashboard(): React.JSX.Element {
  const present = CLASS_STUDENTS.filter((s) => s.status === "P").length;

  return (
    <div className="portal-shell">
      <Sidebar title="Jitendra Public School" subtitle="Teacher Portal"
        navItems={NAV} userName="Mr. Rakesh Sharma" userRole="teacher" accentColor="bg-amber-500" />

      <div className="portal-main">
        <Topbar title="Teacher Dashboard" subtitle="Mathematics · Classes 8A, 8B, 9A"
          userName="Rakesh Sharma" accentColor="bg-amber-500" />

        <div className="content-area">
          <AIInsight type="copilot"
            insight="Class 8A average has improved by 6% this month — great progress! Students Rahul Gupta and Kiran Sharma may need additional support in Algebra (below 60%). Suggested action: assign targeted practice worksheets before Friday's unit test. 3 pending assignment submissions." />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Classes Today" value={4} subtext="2 completed, 2 remaining" icon="🗓" variant="info" />
            <StatCard label="Class Avg" value="74%" subtext="+6% vs last month" icon="📊" variant="success" trend="up" />
            <StatCard label="Pending Marks" value={12} subtext="Across 3 subjects" icon="📝" variant="warning" />
            <StatCard label="Attendance" value={`${present}/${CLASS_STUDENTS.length}`} subtext="Present today" icon="✅" variant="success" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Attendance entry */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Mark Attendance</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Class 8A · Mathematics · Today</p>
                </div>
                <button className="btn-primary text-xs px-3 py-1.5">Save All</button>
              </div>
              <div className="space-y-2">
                {CLASS_STUDENTS.map((s) => (
                  <div key={s.roll} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="avatar w-7 h-7 text-[11px] bg-amber-400 text-white font-bold">
                      {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{s.name}</p>
                      <p className="text-xs text-slate-400">{s.roll}</p>
                    </div>
                    <div className="flex gap-1">
                      {(["P", "A", "L"] as const).map((val) => (
                        <button key={val}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            s.status === val
                              ? val === "P" ? "bg-emerald-500 text-white" : val === "A" ? "bg-red-500 text-white" : "bg-amber-400 text-white"
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}>
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's classes */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Today&apos;s Schedule</h2>
              <div className="space-y-2">
                {[
                  { time: "08:00", class: "8A", subject: "Mathematics", room: "101", done: true },
                  { time: "09:45", class: "8B", subject: "Mathematics", room: "102", done: false, live: true },
                  { time: "11:30", class: "9A", subject: "Mathematics", room: "103", done: false },
                  { time: "12:15", class: "9B", subject: "Mathematics", room: "103", done: false },
                ].map((cls) => (
                  <div key={cls.time + cls.class}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      cls.live ? "bg-amber-50 border border-amber-200" :
                      cls.done ? "opacity-50 bg-slate-50" : "hover:bg-slate-50 border border-transparent"}`}>
                    <span className="text-xs font-mono text-slate-400 w-12 shrink-0">{cls.time}</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">{cls.class}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">{cls.subject}</p>
                      <p className="text-xs text-slate-400">Room {cls.room}</p>
                    </div>
                    {cls.live && <span className="badge badge-yellow text-[10px]">LIVE</span>}
                    {cls.done && <span className="text-emerald-500 text-sm">✓</span>}
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Marks Entry</h3>
                <div className="flex gap-2">
                  <select className="input flex-1 text-sm">
                    <option>Class 8A</option>
                    <option>Class 8B</option>
                    <option>Class 9A</option>
                  </select>
                  <select className="input flex-1 text-sm">
                    <option>Unit Test</option>
                    <option>Mid-term</option>
                    <option>Final</option>
                  </select>
                  <button className="btn-primary text-xs px-3 py-1.5 whitespace-nowrap">Go →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
