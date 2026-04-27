"use client";

import { useState } from "react";
import { joinWaitlist } from "./actions";

export default function Home() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    const result = await joinWaitlist(formData);
    if (result?.success) {
      setStatus("success");
      setMessage("You're on the list! We'll notify you the moment it's available.");
    } else if (result?.error) {
      setStatus("error");
      setMessage(result.error);
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0f0a1e] px-4 sm:px-6 overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-[#7F77DD]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] bg-[#534AB7]/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[40px] left-[-40px] w-[200px] h-[200px] bg-[#AFA9EC]/10 blur-[80px] pointer-events-none" />

      {/* Twinkling stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <section className="relative z-10 w-full max-w-lg text-center flex flex-col items-center">

        {/* Badge */}
        <div className="mb-7 flex items-center gap-2 w-fit rounded-full border border-[#7F77DD]/35 bg-[#7F77DD]/12 px-4 py-1.5 text-[11px] font-bold tracking-widest text-[#AFA9EC] uppercase">
          <span className="h-2 w-2 rounded-full bg-[#7F77DD] animate-pulse" />
          Coming Soon
        </div>

        {/* Live activity ticker */}
        <div className="mb-7 flex items-center gap-2 rounded-lg border border-[#7F77DD]/18 bg-[#7F77DD]/8 px-4 py-2 text-[11px] text-[#7a709e]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7F77DD] animate-pulse" />
          12 people signed up in the last hour
        </div>

        {/* Icon */}
        <div className="mb-7 flex h-[76px] w-[76px] items-center justify-center rounded-[22px] border border-[#7F77DD]/30 bg-[#7F77DD]/12">
          <svg
            className="h-9 w-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#AFA9EC"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>

        {/* Headline — your exact wording */}
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.08] text-white mb-5">
          Our Product{" "}
          <span className="bg-gradient-to-br from-[#c4bfed] via-[#7F77DD] to-[#534AB7] bg-clip-text text-transparent">
            Would Be
          </span>{" "}
          Available Soon.
        </h1>

        {/* Subtext — your exact wording, enhanced */}
        <p className="max-w-sm text-[#8880b8] text-base sm:text-lg leading-relaxed mb-9">
          Be the first to know when the item is available. Drop your email
          and we'll{" "}
          <span className="text-[#c4bfed] font-semibold">
            notify you the moment it's in store
          </span>{" "}
          — before anyone else gets the chance.
        </p>

        {/* Form */}
        <div className="w-full max-w-md mb-3">
          {status === "success" ? (
            <div className="rounded-2xl border border-[#7F77DD]/40 bg-[#7F77DD]/15 px-6 py-5 text-sm font-semibold text-[#AFA9EC]">
              🎉 You're on the list! We'll notify you the moment it's available.
            </div>
          ) : (
            <form
              action={handleSubmit}
              className="flex items-center gap-2 rounded-[18px] border border-[#7F77DD]/28 bg-white/[0.04] px-5 py-2"
            >
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 h-11 bg-transparent outline-none text-sm text-[#e2dfff] placeholder-[#5a5480]"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-11 px-6 rounded-[13px] bg-gradient-to-br from-[#7F77DD] to-[#534AB7] text-white text-sm font-extrabold tracking-wide shadow-[0_4px_20px_rgba(83,74,183,0.5)] hover:shadow-[0_8px_28px_rgba(83,74,183,0.65)] hover:-translate-y-0.5 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "loading" ? "Saving..." : "Notify Me"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-sm text-red-400 text-center">{message}</p>
          )}
        </div>

        {/* Privacy */}
        <p className="text-[11px] text-[#3d3860] mb-9">
          No spam, ever.{" "}
          <span className="text-[#7F77DD]">Unsubscribe anytime.</span>
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-3 gap-3 w-full mb-10">
          {[
            {
              label: "Instant Alert",
              desc: "Get notified the second it goes live",
              icon: (
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              ),
            },
            {
              label: "Early Access",
              desc: "Subscribers get in before everyone else",
              icon: (
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
            },
            {
              label: "Launch Deal",
              desc: "Exclusive pricing for early signups",
              icon: (
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              ),
            },
          ].map((f) => (
            <div
              key={f.label}
              className="flex flex-col items-center gap-2 rounded-[16px] border border-[#7F77DD]/14 bg-white/[0.025] p-4 sm:p-5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#7F77DD]/14">
                {f.icon}
              </div>
              <strong className="text-[12px] font-bold text-[#c4bfed]">{f.label}</strong>
              <p className="text-[11px] text-[#6b6090] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex -space-x-2">
            {[10, 11, 12, 13, 14].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/100?u=${i}`}
                className="h-8 w-8 rounded-full border-2 border-[#1a1133] outline outline-[1.5px] outline-[#7F77DD]/40 bg-[#2a2050]"
                alt="user"
              />
            ))}
          </div>
          <p className="text-sm text-[#4a4470]">
            <span className="font-semibold text-[#AFA9EC]">3,200+ people</span>{" "}
            already waiting
          </p>
        </div>

      </section>
    </main>
  );
}