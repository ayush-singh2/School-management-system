"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

export interface NavItem {
  label: string;
  href: string;
  icon: string; // emoji or SVG string
  badge?: number;
}

interface SidebarProps {
  title: string;
  subtitle: string;
  navItems: NavItem[];
  userName?: string;
  userRole?: string;
  accentColor?: string;
}

export function Sidebar({ title, subtitle, navItems, userName, userRole, accentColor = "bg-blue-500" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className={`sidebar-logo-icon ${accentColor}`}>
          {title.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm leading-tight truncate">{title}</p>
          <p className="text-slate-400 text-xs truncate">{subtitle}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className={clsx("nav-item", active && "active")}>
              <span className="text-base leading-none nav-icon">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge != null && item.badge > 0 && (
                <span className="text-[10px] font-bold bg-red-500 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {userName && (
        <div className="border-t border-slate-700/50 p-4">
          <div className="flex items-center gap-3">
            <div className={`avatar w-8 h-8 text-xs ${accentColor}`}>
              {userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName}</p>
              <p className="text-xs text-slate-400 capitalize">{userRole}</p>
            </div>
            <a href="/api/auth/logout" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              ⇥
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}
