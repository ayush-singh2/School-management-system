import { Sidebar, NavItem } from "@/components/shared/Sidebar";
import { StatCard } from "@/components/shared/StatCard";
import { AIInsight } from "@/components/ai/AIInsight";
import { Topbar } from "@/components/shared/Topbar";

const NAV: NavItem[] = [
  { label: "Dashboard",    href: "/dashboard/student",             icon: "🏠" },
  { label: "Attendance",   href: "/dashboard/student/attendance",  icon: "📅" },
  { label: "Marks",        href: "/dashboard/student/marks",       icon: "📝" },
  { label: "Assignments",  href: "/dashboard/student/assignments", icon: "📚", badge: 3 },
  { label: "Library",      href: "/dashboard/student/library",     icon: "📖" },
  { label: "Timetable",    href: "/dashboard/student/timetable",   icon: "🗓" },
];

const ATTENDANCE_DAYS = ["M","T","W","T","F","M","T","W","T","F","M","T","W","T","F","M","T","W","T","F"];
const ATTENDANCE_STATUS = ["P","P","P","A","P","P","P","L","P","P","P","P","A","P","P","P","P","P","A","P"];

export default function StudentDashboard(): React.JSX.Element {
  const present = ATTENDANCE_STATUS.filter((s) => s === "P").length;
  const pct = Math.round((present / ATTENDANCE_STATUS.length) * 100);

  return (
    <div className="portal-shell">
      <Sidebar title="Jitendra Public School" subtitle="Student Portal"
        navItems={NAV} userName="Ayush Singh" userRole="student" accentColor="bg-violet-500" />

      <div className="portal-main">
        <Topbar title="Good morning, Ayush 👋" subtitle="Class 8A · Roll No. 8A-001"
          userName="Ayush Singh" accentColor="bg-violet-500" />

        <div className="content-area">
          {/* AI Coach */}
          <AIInsight type="coach"
            insight="Your attendance improved from 78% to 92% this semester — great consistency! Strongest subject: English (92%). You need to focus on Mathematics (78%). Try solving 5 extra problems daily. Overall academic growth: +12% this quarter." />

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Attendance" value={`${pct}%`} subtext="14% above minimum" icon="📅" variant="success" trend="up" />
            <StatCard label="Overall Grade" value="B+" subtext="Avg across 5 subjects" icon="🏆" variant="info" />
            <StatCard label="Pending Tasks" value={3} subtext="Due this week" icon="⏰" variant="warning" />
            <StatCard label="Class Rank" value="7th" subtext="Out of 42 students" icon="🎯" trend="up" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Attendance heatmap */}
            <div className="card p-5 lg:col-span-1">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Attendance — Last 20 Days</h2>
              <div className="flex gap-1.5 flex-wrap mb-4">
                {ATTENDANCE_STATUS.map((s, i) => (
                  <div key={i} title={ATTENDANCE_DAYS[i]}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      s === "P" ? "bg-emerald-100 text-emerald-700" :
                      s === "A" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>
                    {s}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-400 inline-block" />Present</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-400 inline-block" />Absent</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" />Late</span>
              </div>
            </div>

            {/* Subject-wise marks */}
            <div className="card p-5 lg:col-span-2">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Subject Performance</h2>
              <div className="space-y-3">
                {[
                  { subject: "English",       marks: 92, color: "bg-emerald-500" },
                  { subject: "Science",       marks: 85, color: "bg-blue-500" },
                  { subject: "Hindi",         marks: 81, color: "bg-violet-500" },
                  { subject: "Mathematics",   marks: 78, color: "bg-amber-500" },
                  { subject: "Social Studies",marks: 74, color: "bg-rose-500" },
                ].map((s) => (
                  <div key={s.subject} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-600 w-32 shrink-0">{s.subject}</span>
                    <div className="flex-1 progress-bar">
                      <div className={`progress-fill ${s.color}`} style={{ width: `${s.marks}%` }} />
                    </div>
                    <span className={`text-xs font-bold w-10 text-right ${s.marks >= 85 ? "text-emerald-600" : s.marks >= 75 ? "text-amber-600" : "text-red-500"}`}>
                      {s.marks}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today's timetable */}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Today&apos;s Classes</h2>
            <div className="space-y-2">
              {[
                { time: "08:00 – 08:45", subject: "Mathematics",    teacher: "Mr. Sharma",  room: "101",   status: "done" },
                { time: "08:45 – 09:30", subject: "English",        teacher: "Ms. Priya V", room: "102",   status: "live" },
                { time: "09:45 – 10:30", subject: "Science",        teacher: "Mr. Gupta",   room: "Lab 1", status: "next" },
                { time: "10:30 – 11:15", subject: "Social Studies", teacher: "Ms. Rani",    room: "103",   status: "upcoming" },
                { time: "11:30 – 12:15", subject: "Hindi",          teacher: "Mr. Mishra",  room: "104",   status: "upcoming" },
              ].map((cls) => (
                <div key={cls.time}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors
                    ${cls.status === "live" ? "bg-blue-50 border border-blue-200" :
                      cls.status === "done" ? "opacity-50" : "hover:bg-slate-50"}`}>
                  <span className="text-xs font-mono text-slate-400 w-28 shrink-0">{cls.time}</span>
                  <span className="font-semibold text-slate-800 flex-1">{cls.subject}</span>
                  <span className="text-slate-500 hidden sm:block text-xs">{cls.teacher}</span>
                  <span className="text-xs text-slate-400 w-14 text-right">Room {cls.room}</span>
                  {cls.status === "live" && (
                    <span className="badge badge-blue text-[10px]">LIVE</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
