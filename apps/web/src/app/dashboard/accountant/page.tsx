import { Sidebar, NavItem } from "@/components/shared/Sidebar";
import { StatCard } from "@/components/shared/StatCard";
import { AIInsight } from "@/components/ai/AIInsight";
import { Topbar } from "@/components/shared/Topbar";

const NAV: NavItem[] = [
  { label: "Dashboard",    href: "/dashboard/accountant",            icon: "🏠" },
  { label: "Fee Records",  href: "/dashboard/accountant/fees",       icon: "💳" },
  { label: "Receipts",     href: "/dashboard/accountant/receipts",   icon: "🧾" },
  { label: "Reports",      href: "/dashboard/accountant/reports",    icon: "📊" },
  { label: "Defaulters",   href: "/dashboard/accountant/defaulters", icon: "⚠️", badge: 3 },
  { label: "Refunds",      href: "/dashboard/accountant/refunds",    icon: "↩️" },
];

const FEE_RECORDS = [
  { receipt: "REC-001", student: "Ayush Singh",  cls: "8A", amount: "₹8,500",  type: "Tuition",   status: "Paid",    date: "28 Mar 2026" },
  { receipt: "REC-002", student: "Priya Verma",  cls: "8A", amount: "₹12,500", type: "Tuition",   status: "Due",     date: "15 Jul 2026" },
  { receipt: "REC-003", student: "Rahul Gupta",  cls: "9A", amount: "₹8,500",  type: "Tuition",   status: "Paid",    date: "30 Mar 2026" },
  { receipt: "REC-004", student: "Sneha Yadav",  cls: "8B", amount: "₹2,000",  type: "Transport", status: "Late",    date: "01 Apr 2026" },
  { receipt: "REC-005", student: "Kiran Sharma", cls: "9B", amount: "₹8,500",  type: "Tuition",   status: "Paid",    date: "25 Mar 2026" },
  { receipt: "REC-006", student: "Mohit Mishra", cls: "7A", amount: "₹1,500",  type: "Hostel",    status: "Pending", date: "10 Jul 2026" },
];

export default function AccountantDashboard(): React.JSX.Element {
  return (
    <div className="portal-shell">
      <Sidebar title="Jitendra Public School" subtitle="Accounts Portal"
        navItems={NAV} userName="Ms. Kavita Rao" userRole="accountant" accentColor="bg-rose-500" />

      <div className="portal-main">
        <Topbar title="Fee Management" subtitle="Academic Year 2025–26"
          userName="Kavita Rao" accentColor="bg-rose-500" />

        <div className="content-area">
          <AIInsight type="recovery"
            insight="3 students are more than 30 days overdue — priority recovery recommended: Priya Verma (₹12,500), Sneha Yadav (₹2,000), Mohit Mishra (₹1,500). Total outstanding: ₹16,000. Sending WhatsApp reminders increased collection by 34% last month. Suggested action: trigger automated payment reminders now." />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Collected" value="₹2.4L" subtext="This academic year" icon="💰" variant="success" trend="up" />
            <StatCard label="Outstanding"     value="₹16K"  subtext="3 defaulters" icon="⚠️" variant="danger" />
            <StatCard label="Due This Month"  value="₹48K"  subtext="12 students" icon="📅" variant="warning" />
            <StatCard label="Collection Rate" value="94%"   subtext="+2% vs last month" icon="📈" variant="info" trend="up" />
          </div>

          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Recent Fee Records</h2>
              <div className="flex gap-2">
                <input className="input text-xs py-1.5 px-3 w-48" placeholder="Search student..." />
                <button className="btn-primary text-xs px-3 py-1.5">+ New Receipt</button>
              </div>
            </div>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Receipt</th>
                    <th>Student</th>
                    <th>Class</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {FEE_RECORDS.map((r) => (
                    <tr key={r.receipt}>
                      <td className="font-mono text-xs text-slate-400">{r.receipt}</td>
                      <td className="font-medium">{r.student}</td>
                      <td>{r.cls}</td>
                      <td>{r.type}</td>
                      <td className="font-semibold">{r.amount}</td>
                      <td className="text-slate-400 text-xs">{r.date}</td>
                      <td>
                        <span className={`badge text-[10px] ${
                          r.status === "Paid" ? "badge-green" :
                          r.status === "Due" ? "badge-red" :
                          r.status === "Late" ? "badge-yellow" : "badge-gray"}`}>
                          {r.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button className="text-xs text-blue-500 hover:underline">Print</button>
                          {r.status !== "Paid" && (
                            <button className="text-xs text-emerald-600 hover:underline ml-2">Record</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Fee Recovery Actions</h2>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary text-sm">📱 WhatsApp All Defaulters</button>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-4 py-2 rounded-xl font-medium transition-colors">
                📧 Email Reminders
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-4 py-2 rounded-xl font-medium transition-colors">
                📊 Export Report
              </button>
              <button className="bg-rose-100 hover:bg-rose-200 text-rose-700 text-sm px-4 py-2 rounded-xl font-medium transition-colors">
                ⚠️ Issue Notice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
