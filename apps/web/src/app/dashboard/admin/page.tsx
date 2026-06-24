import { Sidebar, NavItem } from "@/components/shared/Sidebar";
import { StatCard } from "@/components/shared/StatCard";
import { Topbar } from "@/components/shared/Topbar";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/admin",           icon: "🏠" },
  { label: "Users",     href: "/dashboard/admin/users",     icon: "👥" },
  { label: "Schools",   href: "/dashboard/admin/schools",   icon: "🏫" },
  { label: "Transport", href: "/dashboard/admin/transport", icon: "🚌" },
  { label: "Hostel",    href: "/dashboard/admin/hostel",    icon: "🏠" },
  { label: "Library",   href: "/dashboard/admin/library",   icon: "📖" },
  { label: "Settings",  href: "/dashboard/admin/settings",  icon: "⚙️" },
];

const USERS = [
  { name: "Rakesh Sharma",  role: "teacher",    email: "teacher@school.edu",    status: "Active",  joined: "Aug 2024" },
  { name: "Rajesh Singh",   role: "parent",     email: "parent@school.edu",     status: "Active",  joined: "Jan 2025" },
  { name: "Ayush Singh",    role: "student",    email: "student@school.edu",    status: "Active",  joined: "Jan 2025" },
  { name: "Kavita Rao",     role: "accountant", email: "accountant@school.edu", status: "Active",  joined: "Mar 2024" },
  { name: "AK Principal",   role: "principal",  email: "principal@school.edu",  status: "Active",  joined: "Jun 2023" },
  { name: "New Student",    role: "student",    email: "new.student@school.edu",status: "Pending", joined: "Jun 2026" },
];

const ROLE_COLORS: Record<string, string> = {
  teacher:    "badge-yellow",
  parent:     "badge-green",
  student:    "badge-blue",
  accountant: "badge-gray",
  principal:  "badge-purple",
  admin:      "badge-red",
};

const TRANSPORTS = [
  { route: "Route A", driver: "Ramesh Kumar", bus: "DL-01-XY-1234", capacity: 42, students: 38, status: "Active" },
  { route: "Route B", driver: "Suresh Yadav", bus: "DL-01-AB-5678", capacity: 40, students: 35, status: "Active" },
  { route: "Route C", driver: "Mahesh Singh", bus: "DL-01-CD-9012", capacity: 36, students: 36, status: "Full" },
  { route: "Route D", driver: "Dinesh Gupta", bus: "DL-01-EF-3456", capacity: 42, students: 0,  status: "Inactive" },
];

export default function AdminDashboard(): React.JSX.Element {
  return (
    <div className="portal-shell">
      <Sidebar title="Jitendra Public School" subtitle="Admin Console"
        navItems={NAV} userName="Admin" userRole="admin" accentColor="bg-slate-600" />

      <div className="portal-main">
        <Topbar title="System Administration" subtitle="Manage users, transport, and school config"
          userName="Admin" accentColor="bg-slate-600" />

        <div className="content-area">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Users"   value={6}    subtext="Across all roles" icon="👥" variant="info" />
            <StatCard label="Students"      value={487}  subtext="14 new this month" icon="🎓" variant="success" trend="up" />
            <StatCard label="Bus Routes"    value="4"    subtext="3 active, 1 inactive" icon="🚌" variant="warning" />
            <StatCard label="System Health" value="99%"  subtext="All services online" icon="💚" variant="success" />
          </div>

          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">User Management</h2>
              <div className="flex gap-2">
                <select className="input text-xs py-1.5 px-3">
                  <option>All Roles</option>
                  <option>Teacher</option>
                  <option>Student</option>
                  <option>Parent</option>
                </select>
                <button className="btn-primary text-xs px-3 py-1.5">+ Add User</button>
              </div>
            </div>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {USERS.map((u) => (
                    <tr key={u.email}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar w-7 h-7 text-[11px] bg-slate-400 text-white font-bold">
                            {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <span className="font-medium text-slate-800">{u.name}</span>
                        </div>
                      </td>
                      <td><span className={`badge text-[10px] ${ROLE_COLORS[u.role] ?? "badge-gray"}`}>{u.role}</span></td>
                      <td className="font-mono text-xs text-slate-500">{u.email}</td>
                      <td className="text-xs text-slate-400">{u.joined}</td>
                      <td>
                        <span className={`badge text-[10px] ${u.status === "Active" ? "badge-green" : "badge-yellow"}`}>{u.status}</span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button className="text-xs text-blue-500 hover:underline">Edit</button>
                          <button className="text-xs text-red-400 hover:underline">Disable</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Transport Routes</h2>
              <button className="btn-primary text-xs px-3 py-1.5">+ Add Route</button>
            </div>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Driver</th>
                    <th>Bus No.</th>
                    <th>Capacity</th>
                    <th>Students</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {TRANSPORTS.map((t) => (
                    <tr key={t.route}>
                      <td className="font-semibold">{t.route}</td>
                      <td>{t.driver}</td>
                      <td className="font-mono text-xs">{t.bus}</td>
                      <td>{t.capacity}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 progress-bar w-16">
                            <div className={`progress-fill ${t.students === t.capacity ? "bg-red-500" : "bg-blue-500"}`}
                              style={{ width: `${(t.students / t.capacity) * 100}%` }} />
                          </div>
                          <span className="text-xs text-slate-500">{t.students}/{t.capacity}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge text-[10px] ${
                          t.status === "Active" ? "badge-green" :
                          t.status === "Full" ? "badge-red" : "badge-gray"}`}>
                          {t.status}
                        </span>
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
