"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useWallet } from "@/contexts/wallet-context";
import { truncateAddress } from "@/lib/format-address";

const activeChallenges = [
  {
    id: "1",
    title: "30-day fitness streak",
    progress: 72,
    daysLeft: 8,
    participants: 12,
  },
  {
    id: "2",
    title: "SOL stack sprint",
    progress: 38,
    daysLeft: 21,
    participants: 6,
  },
  {
    id: "3",
    title: "Morning meditation",
    progress: 91,
    daysLeft: 2,
    participants: 24,
  },
];

const leaderboard = [
  { rank: 1, name: "nova_x", wins: 18, streak: 12 },
  { rank: 2, name: "kai_sol", wins: 15, streak: 9 },
  { rank: 3, name: "mira_wins", wins: 14, streak: 11 },
  { rank: 4, name: "dev_streak", wins: 11, streak: 7 },
  { rank: 5, name: "zen_chain", wins: 9, streak: 14 },
];

function AnimatedProgress({ value }: { value: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setWidth(value));
    return () => cancelAnimationFrame(id);
  }, [value]);

  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.08] ring-1 ring-white/[0.06]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-lemon via-[#ffe44d] to-lemon bg-[length:200%_100%] bg-left transition-[width] duration-[1100ms] ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function FrostCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-lemon/20 hover:shadow-[0_12px_48px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,215,0,0.06)] sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const { mounted, session, isConnected } = useWallet();

  return (
    <div className="relative min-h-screen bg-black">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute -left-1/4 top-0 h-[45vh] w-[80vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.07),transparent_65%)]" />
        <div className="absolute -right-1/4 bottom-0 h-[35vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.04),transparent_60%)]" />
      </div>

      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:max-w-4xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lemon/80">
            Overview
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Dashboard
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
            Track challenges, climb the leaderboard, and manage your balances.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <Link
            href="/#features"
            className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-xl border-2 border-lemon/40 bg-transparent px-5 text-sm font-bold text-lemon shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all hover:border-lemon hover:bg-lemon/10 hover:shadow-[0_0_28px_rgba(255,215,0,0.2)] active:scale-[0.99] sm:min-w-[160px] sm:flex-none"
          >
            Join challenge
          </Link>
          <Link
            href="/create"
            className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-xl bg-lemon px-5 text-sm font-bold text-black shadow-[0_0_0_1px_rgba(255,215,0,0.25),0_8px_28px_rgba(255,215,0,0.2)] transition-all hover:bg-[#ffe44d] hover:shadow-[0_10px_36px_rgba(255,215,0,0.3)] active:scale-[0.99] sm:min-w-[160px] sm:flex-none"
          >
            Create challenge
          </Link>
        </div>

        <section className="mb-10" aria-labelledby="wallet-heading">
          <h2
            id="wallet-heading"
            className="font-display text-xl font-bold text-white sm:text-2xl"
          >
            Wallet balance
          </h2>
          <FrostCard className="mt-4">
            {!mounted ? (
              <div className="h-24 animate-pulse rounded-xl bg-white/[0.06]" />
            ) : !isConnected || !session ? (
              <p className="text-sm text-white/55">
                Connect your wallet in the header to see balances and fund
                challenges.
              </p>
            ) : (
              <div className="space-y-4">
                <p className="font-mono text-xs text-white/45">
                  {truncateAddress(session.address, 6, 6)}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4 transition-colors hover:border-lemon/25">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                      SOL
                    </p>
                    <p className="font-display mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                      12.4582
                    </p>
                    <p className="mt-1 text-xs text-white/35">Demo balance</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4 transition-colors hover:border-lemon/25">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                      USDC
                    </p>
                    <p className="font-display mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                      248.50
                    </p>
                    <p className="mt-1 text-xs text-white/35">Demo balance</p>
                  </div>
                </div>
              </div>
            )}
          </FrostCard>
        </section>

        <section className="mb-10" aria-labelledby="active-heading">
          <h2
            id="active-heading"
            className="font-display text-xl font-bold text-white sm:text-2xl"
          >
            Active challenges
          </h2>
          <ul className="mt-4 flex flex-col gap-4">
            {activeChallenges.map((c) => (
              <li key={c.id}>
                <FrostCard className="p-0">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-white">
                        {c.title}
                      </h3>
                      <span className="rounded-full border border-lemon/25 bg-lemon/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-lemon">
                        {c.daysLeft}d left
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/45">
                      {c.participants} participants
                    </p>
                    <div className="mt-4">
                      <div className="mb-2 flex justify-between text-xs font-medium text-white/55">
                        <span>Progress</span>
                        <span className="font-mono text-lemon">{c.progress}%</span>
                      </div>
                      <AnimatedProgress value={c.progress} />
                    </div>
                  </div>
                </FrostCard>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="lb-heading">
          <h2
            id="lb-heading"
            className="font-display text-xl font-bold text-white sm:text-2xl"
          >
            Leaderboard
          </h2>
          <p className="mt-1 text-sm text-white/45">
            Top players by wins &amp; streaks (demo data)
          </p>
          <FrostCard className="mt-4 overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-black/30 text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                    <th className="px-4 py-3 sm:px-6">#</th>
                    <th className="px-4 py-3 sm:px-6">User</th>
                    <th className="px-4 py-3 sm:px-6">Wins</th>
                    <th className="px-4 py-3 sm:px-6">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((row) => (
                    <tr
                      key={row.rank}
                      className="border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.04]"
                    >
                      <td className="px-4 py-3.5 font-display font-bold text-lemon sm:px-6">
                        {row.rank}
                      </td>
                      <td className="px-4 py-3.5 font-medium text-white sm:px-6">
                        {row.name}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-white/80 sm:px-6">
                        {row.wins}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-white/80 sm:px-6">
                        {row.streak}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FrostCard>
        </section>
      </main>
    </div>
  );
}
