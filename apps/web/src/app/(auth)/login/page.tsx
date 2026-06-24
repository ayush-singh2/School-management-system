"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ROLE_REDIRECTS: Record<string, string> = {
  student: "/dashboard/student",
  parent: "/dashboard/parent",
  teacher: "/dashboard/teacher",
  accountant: "/dashboard/accountant",
  principal: "/dashboard/principal",
  admin: "/dashboard/admin",
};

const DEMO_CREDS = [
  { role: "Student", email: "student@school.edu", password: "Student@123", color: "bg-violet-500" },
  { role: "Parent", email: "parent@school.edu", password: "Parent@123", color: "bg-emerald-500" },
  { role: "Teacher", email: "teacher@school.edu", password: "Teacher@123", color: "bg-amber-500" },
  { role: "Admin", email: "admin@school.edu", password: "Admin@123", color: "bg-rose-500" },
  { role: "Principal", email: "principal@school.edu", password: "Principal@123", color: "bg-blue-500" },
  { role: "Accounts", email: "accounts@school.edu", password: "Accounts@123", color: "bg-teal-500" },
];

export default function LoginPage(): React.JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message ?? "Invalid credentials");
        return;
      }
      const { role } = await res.json();
      router.push(ROLE_REDIRECTS[role] ?? "/");
    } catch {
      setError("Cannot connect to server. Make sure the API is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 p-12 relative overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-lg">S</div>
            <span className="text-white font-bold text-lg">School OS</span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            The modern operating system for schools
          </h1>
          <p className="text-blue-200 text-base leading-relaxed">
            AI-powered portals for students, parents, teachers, and administrators — unified in one platform.
          </p>
        </div>

        {/* Feature chips */}
        <div className="relative z-10 space-y-3">
          {[
            { icon: "🤖", text: "AI-generated insights for every role" },
            { icon: "📊", text: "Real-time attendance & marks tracking" },
            { icon: "💳", text: "Integrated fee collection & receipts" },
            { icon: "📱", text: "Mobile-first parent & student portals" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-3 text-sm text-blue-100">
              <span className="text-base">{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
          <p className="text-blue-400 text-xs mt-6">© 2026 Modern School OS</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">Sign in</h2>
            <p className="text-slate-400 text-sm">Enter your credentials to access your portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="you@school.edu"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-950 border border-red-800 text-red-300 text-sm rounded-xl px-4 py-3">
                <span>⚠</span> {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mt-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in…</>
              ) : "Sign in →"}
            </button>
          </form>

          {/* Demo credentials */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick demo — click to fill</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_CREDS.map((c) => (
                <button key={c.role} type="button"
                  onClick={() => { setEmail(c.email); setPassword(c.password); }}
                  className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl px-3 py-2.5 transition-colors text-left group">
                  <span className={`w-6 h-6 rounded-lg ${c.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {c.role[0]}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">{c.role}</p>
                    <p className="text-[10px] text-slate-500 truncate">{c.email}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
