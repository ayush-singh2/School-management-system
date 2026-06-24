import { Sidebar, NavItem } from "@/components/shared/Sidebar";
import { StatCard } from "@/components/shared/StatCard";
import { AIInsight } from "@/components/ai/AIInsight";
import { Topbar } from "@/components/shared/Topbar";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/admin", icon: "🏠" },
  { label: "CRM Leads",  href: "/crm/leads",       icon: "📋" },
  { label: "Chatbot",    href: "/crm/chatbot",      icon: "🤖" },
  { label: "Analytics",  href: "/crm/analytics",   icon: "📊" },
];

type LeadStage = "Inquiry" | "Contacted" | "Visit Scheduled" | "Visit Done" | "Enrolled" | "Lost";

const LEADS: { name: string; parent: string; phone: string; cls: string; source: string; stage: LeadStage; date: string }[] = [
  { name: "Arjun Patel",  parent: "Anil Patel",   phone: "+91 98765 00001", cls: "6",  source: "Website",  stage: "Enrolled",       date: "15 Jun 2026" },
  { name: "Divya Sharma", parent: "Sunil Sharma", phone: "+91 98765 00002", cls: "8",  source: "WhatsApp", stage: "Visit Done",      date: "18 Jun 2026" },
  { name: "Raj Mehta",    parent: "Vijay Mehta",  phone: "+91 98765 00003", cls: "10", source: "Referral", stage: "Visit Scheduled", date: "20 Jun 2026" },
  { name: "Nisha Gupta",  parent: "Deepak Gupta", phone: "+91 98765 00004", cls: "3",  source: "Walk-in",  stage: "Contacted",       date: "21 Jun 2026" },
  { name: "Ravi Kumar",   parent: "Raju Kumar",   phone: "+91 98765 00005", cls: "5",  source: "Website",  stage: "Inquiry",         date: "22 Jun 2026" },
  { name: "Anjali Singh", parent: "Manoj Singh",  phone: "+91 98765 00006", cls: "7",  source: "Google",   stage: "Inquiry",         date: "23 Jun 2026" },
  { name: "Sarthak Rao",  parent: "Ramesh Rao",   phone: "+91 98765 00007", cls: "9",  source: "Referral", stage: "Lost",            date: "14 Jun 2026" },
];

const STAGE_BADGE: Record<LeadStage, string> = {
  "Inquiry":          "badge-gray",
  "Contacted":        "badge-blue",
  "Visit Scheduled":  "badge-yellow",
  "Visit Done":       "badge-purple",
  "Enrolled":         "badge-green",
  "Lost":             "badge-red",
};

const PIPELINE_STAGES: LeadStage[] = ["Inquiry", "Contacted", "Visit Scheduled", "Visit Done", "Enrolled"];

export default function CRMLeadsPage(): React.JSX.Element {
  const enrolled = LEADS.filter((l) => l.stage === "Enrolled").length;
  const active = LEADS.filter((l) => l.stage !== "Lost").length;
  const convRate = Math.round((enrolled / active) * 100);

  return (
    <div className="portal-shell">
      <Sidebar title="Jitendra Public School" subtitle="Admissions CRM"
        navItems={NAV} userName="Admin" userRole="admin" accentColor="bg-teal-500" />

      <div className="portal-main">
        <Topbar title="Admission Pipeline" subtitle="Track enquiries through to enrollment"
          userName="Admin" accentColor="bg-teal-500" />

        <div className="content-area">
          <AIInsight type="analytics"
            insight="14 new leads this week — highest this quarter. Conversion rate stands at 43% (industry avg: 35%). Top source: Website (40%). Leads from referrals convert 2× faster — recommend a referral incentive program. 3 visits scheduled this week; follow-up calls have a 70% conversion to enrollment." />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Leads" value={LEADS.length} subtext="This academic cycle" icon="📋" variant="info" />
            <StatCard label="Enrolled" value={enrolled} subtext="Confirmed admissions" icon="🎓" variant="success" trend="up" />
            <StatCard label="Conversion" value={`${convRate}%`} subtext="Above industry avg" icon="📈" variant="success" trend="up" />
            <StatCard label="Lost" value={LEADS.filter((l) => l.stage === "Lost").length} subtext="Need recovery" icon="⚠️" variant="danger" />
          </div>

          {/* Pipeline stages bar */}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Pipeline Overview</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {PIPELINE_STAGES.map((stage) => {
                const count = LEADS.filter((l) => l.stage === stage).length;
                return (
                  <div key={stage} className="min-w-[140px] flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`badge text-[10px] ${STAGE_BADGE[stage]}`}>{stage}</span>
                      <span className="text-xs font-bold text-slate-600">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-teal-400 transition-all"
                        style={{ width: count > 0 ? `${(count / LEADS.length) * 100}%` : "0%" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">All Leads</h2>
              <div className="flex gap-2">
                <select className="input text-xs py-1.5 px-3">
                  <option>All Stages</option>
                  {PIPELINE_STAGES.map((s) => <option key={s}>{s}</option>)}
                  <option>Lost</option>
                </select>
                <button className="btn-primary text-xs px-3 py-1.5">+ Add Lead</button>
              </div>
            </div>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Parent</th>
                    <th>Phone</th>
                    <th>Class</th>
                    <th>Source</th>
                    <th>Date</th>
                    <th>Stage</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {LEADS.map((lead) => (
                    <tr key={lead.name} className={lead.stage === "Lost" ? "opacity-50" : ""}>
                      <td className="font-medium text-slate-800">{lead.name}</td>
                      <td className="text-slate-600">{lead.parent}</td>
                      <td className="font-mono text-xs text-slate-500">{lead.phone}</td>
                      <td>Class {lead.cls}</td>
                      <td><span className="badge badge-gray text-[10px]">{lead.source}</span></td>
                      <td className="text-xs text-slate-400">{lead.date}</td>
                      <td><span className={`badge text-[10px] ${STAGE_BADGE[lead.stage]}`}>{lead.stage}</span></td>
                      <td>
                        <div className="flex gap-2">
                          <button className="text-xs text-blue-500 hover:underline">Edit</button>
                          <button className="text-xs text-teal-600 hover:underline">→ Move</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
