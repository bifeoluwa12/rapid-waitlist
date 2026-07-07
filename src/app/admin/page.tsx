"use client";

import { useState } from "react";
import { getWaitlistEntries } from "../actions";

type Entry = {
  id: number;
  email: string;
  createdAt: Date;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [total, setTotal] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin() {
    setStatus("loading");
    const result = await getWaitlistEntries(password);
    if (result.error) {
      setStatus("error");
      setErrorMsg(result.error);
    } else {
      setEntries(result.entries ?? []);
      setTotal(result.total ?? 0);
      setStatus("success");
    }
  }

  function exportCSV() {
    const rows = [
      ["#", "Email", "Joined At"],
      ...entries.map((e, i) => [
        i + 1,
        e.email,
        new Date(e.createdAt).toLocaleString(),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "waitlist.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="relative min-h-screen bg-[#0f0a1e] px-4 py-12 overflow-hidden">
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-[#7F77DD]/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F77DD]/20 border border-[#7F77DD]/30">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="#AFA9EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Admin Dashboard</h1>
            <p className="text-xs text-[#5a5480]">Waitlist management</p>
          </div>
        </div>

        {status !== "success" ? (
          /* Login form */
          <div className="max-w-sm mx-auto">
            <div className="rounded-2xl border border-[#7F77DD]/25 bg-white/[0.04] p-8 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-white text-center">Enter Admin Password</h2>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Password"
                className="h-11 w-full rounded-xl border border-[#7F77DD]/25 bg-white/[0.04] px-4 text-sm text-[#e2dfff] placeholder-[#5a5480] outline-none focus:border-[#7F77DD]/60"
              />
              {status === "error" && (
                <p className="text-sm text-red-400 text-center">{errorMsg}</p>
              )}
              <button
                onClick={handleLogin}
                disabled={status === "loading"}
                className="h-11 rounded-xl bg-gradient-to-br from-[#7F77DD] to-[#534AB7] text-white text-sm font-bold tracking-wide shadow-[0_4px_20px_rgba(83,74,183,0.5)] hover:shadow-[0_8px_28px_rgba(83,74,183,0.65)] transition-all duration-150 disabled:opacity-50"
              >
                {status === "loading" ? "Checking..." : "Login"}
              </button>
            </div>
          </div>
        ) : (
          /* Dashboard */
          <div className="flex flex-col gap-6">

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[#7F77DD]/20 bg-white/[0.03] p-5">
                <p className="text-[11px] text-[#5a5480] uppercase tracking-widest mb-1">Total Signups</p>
                <p className="text-4xl font-black text-white">{total}</p>
              </div>
              <div className="rounded-2xl border border-[#7F77DD]/20 bg-white/[0.03] p-5">
                <p className="text-[11px] text-[#5a5480] uppercase tracking-widest mb-1">Latest Signup</p>
                <p className="text-sm font-semibold text-[#AFA9EC]">
                  {entries[0] ? new Date(entries[0].createdAt).toLocaleDateString() : "—"}
                </p>
              </div>
              <div className="rounded-2xl border border-[#7F77DD]/20 bg-white/[0.03] p-5 col-span-2 sm:col-span-1 flex items-center justify-center">
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-br from-[#7F77DD] to-[#534AB7] text-white text-sm font-bold shadow-[0_4px_20px_rgba(83,74,183,0.4)] hover:shadow-[0_6px_24px_rgba(83,74,183,0.6)] transition-all duration-150"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Export CSV
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-[#7F77DD]/20 bg-white/[0.03] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#7F77DD]/15">
                <h2 className="text-sm font-bold text-[#c4bfed]">All Subscribers</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#7F77DD]/10">
                      <th className="px-5 py-3 text-left text-[11px] text-[#5a5480] uppercase tracking-widest font-semibold">#</th>
                      <th className="px-5 py-3 text-left text-[11px] text-[#5a5480] uppercase tracking-widest font-semibold">Email</th>
                      <th className="px-5 py-3 text-left text-[11px] text-[#5a5480] uppercase tracking-widest font-semibold">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, i) => (
                      <tr key={entry.id} className="border-b border-[#7F77DD]/8 hover:bg-[#7F77DD]/5 transition-colors">
                        <td className="px-5 py-3 text-[#5a5480] font-mono text-xs">{i + 1}</td>
                        <td className="px-5 py-3 text-[#e2dfff]">{entry.email}</td>
                        <td className="px-5 py-3 text-[#5a5480] text-xs">
                          {new Date(entry.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {entries.length === 0 && (
                  <p className="text-center text-[#5a5480] text-sm py-10">No signups yet.</p>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}