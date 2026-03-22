import Link from "next/link";
import type { ReactNode } from "react";
import { SolanaCrypto } from "@/components/solana-crypto";

function IconCrypto() {
  return (
    <svg
      className="h-8 w-8 text-lemon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 22V12M12 12L3 7M12 12l9-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconHealth() {
  return (
    <svg
      className="h-8 w-8 text-lemon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 21s-6-4.35-6-10a4 4 0 0 1 7-2.5A4 4 0 0 1 18 11c0 5.65-6 10-6 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLeaderboard() {
  return (
    <svg
      className="h-8 w-8 text-lemon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 21V11M12 21V7M16 21v-6M4 21h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 11V5a2 2 0 0 1 2-2h2M18 15v-4a2 2 0 0 0-2-2h-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const features: {
  id: string;
  title: ReactNode;
  description: string;
  icon: typeof IconCrypto;
}[] = [
  {
    id: "payments",
    title: (
      <>
        <SolanaCrypto /> payments
      </>
    ),
    description:
      "Stake, settle, and collect rewards on-chain with transparent payouts.",
    icon: IconCrypto,
  },
  {
    id: "health",
    title: "Health & skill challenges",
    description:
      "Build streaks for fitness, learning, and habits—prove progress, not promises.",
    icon: IconHealth,
  },
  {
    id: "leaderboards",
    title: "Social leaderboards",
    description:
      "Compete with friends, climb ranks, and flex your wins in real time.",
    icon: IconLeaderboard,
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-black">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[50vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.08),transparent_65%)]" />
        <div className="absolute -right-1/4 bottom-0 h-[40vh] w-[60vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.05),transparent_60%)]" />
      </div>

      <main className="flex flex-1 flex-col">
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-12 text-center sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pt-20">
          <p className="mb-4 inline-flex items-baseline rounded-full border border-lemon/25 bg-lemon/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
            <SolanaCrypto />
            <span className="text-lemon">-native challenges</span>
          </p>
          <h1 className="font-display max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Challenge Friends,{" "}
            <span className="bg-gradient-to-r from-lemon via-[#ffe44d] to-lemon bg-clip-text text-transparent">
              Earn
            </span>{" "}
            <SolanaCrypto />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg md:text-xl">
            Stay accountable, gamify your health and skills, win rewards
          </p>
          <div className="mt-10 flex w-full justify-center">
            <Link
              href="/create"
              className="group inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl bg-lemon px-8 text-base font-bold text-black shadow-[0_0_0_1px_rgba(255,215,0,0.3),0_8px_32px_rgba(255,215,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffe44d] hover:shadow-[0_12px_40px_rgba(255,215,0,0.35)] active:translate-y-0"
            >
              Create Challenge
            </Link>
          </div>
        </section>

        <section
          id="features"
          className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
        >
          <h2 className="font-display mb-10 text-center text-2xl font-bold tracking-tight text-white sm:mb-14 sm:text-3xl md:text-4xl">
            Built for accountability &amp; rewards
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {features.map(({ id, title, description, icon: Icon }) => (
              <article
                key={id}
                className="glass-card group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] sm:p-8"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-lemon/10 ring-1 ring-lemon/20 transition-transform duration-300 group-hover:scale-110">
                  <Icon />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer
        id="footer"
        className="mt-auto border-t border-white/[0.06] bg-black/80 backdrop-blur-sm"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-start">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/60 transition-colors hover:text-lemon"
            >
              Twitter
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/60 transition-colors hover:text-lemon"
            >
              Discord
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/60 transition-colors hover:text-lemon"
            >
              GitHub
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
            <a
              href="#privacy-policy"
              className="text-sm font-medium text-white/60 transition-colors hover:text-lemon"
            >
              Privacy policy
            </a>
            <a
              href="mailto:hello@challenge.app"
              className="text-sm font-medium text-white/60 transition-colors hover:text-lemon"
            >
              Contact
            </a>
          </div>
        </div>
        <p
          id="privacy-policy"
          className="mx-auto max-w-2xl px-4 pb-6 text-center text-xs leading-relaxed text-white/40 sm:px-6"
        >
          Privacy: we only use data needed to run challenges and payouts. Contact us
          for questions or data requests.
        </p>
        <div className="border-t border-white/[0.04] py-4 text-center text-xs text-white/35">
          © {new Date().getFullYear()} Challenge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
