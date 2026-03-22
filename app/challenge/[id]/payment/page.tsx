"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { SolanaCrypto } from "@/components/solana-crypto";
import { useWallet } from "@/contexts/wallet-context";
import { truncateAddress } from "@/lib/format-address";

type EscrowStatus =
  | "awaiting_deposit"
  | "in_escrow"
  | "partially_funded"
  | "released"
  | "cancelled";

type TxRow = {
  id: string;
  kind: "deposit" | "payout";
  label: string;
  amount: string;
  token: "SOL" | "USDC";
  time: string;
  txSig: string;
  status: "confirmed" | "pending";
};

type ChallengePaymentMock = {
  name: string;
  description: string;
  participants: string[];
  amount: string;
  token: "SOL" | "USDC";
  escrowStatus: EscrowStatus;
  funded: string;
  target: string;
  transactions: TxRow[];
};

function mockForId(id: string): ChallengePaymentMock {
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const tokens: ("SOL" | "USDC")[] = ["USDC", "SOL"];
  const token = tokens[seed % 2];
  const statuses: EscrowStatus[] = [
    "awaiting_deposit",
    "in_escrow",
    "partially_funded",
  ];
  const escrowStatus = statuses[seed % statuses.length];

  return {
    name: "30-day fitness streak",
    description:
      "Daily workout proof via app check-in. Winner takes the pool; ties split 50/50. Stakes lock until the challenge end date.",
    participants: ["alex_runner", "sam_fits", "jordan_k", "you"],
    amount: token === "USDC" ? "125.00" : "2.5",
    token,
    escrowStatus,
    funded: escrowStatus === "awaiting_deposit" ? "0" : token === "USDC" ? "75.00" : "1.5",
    target: token === "USDC" ? "125.00" : "2.5",
    transactions: [
      {
        id: "1",
        kind: "deposit",
        label: "Deposit (escrow)",
        amount: token === "USDC" ? "50.00" : "1.0",
        token,
        time: "Mar 18, 2026 · 14:22",
        txSig: `${id.slice(0, 6)}…9f2a`,
        status: "confirmed",
      },
      {
        id: "2",
        kind: "deposit",
        label: "Deposit (escrow)",
        amount: token === "USDC" ? "25.00" : "0.5",
        token,
        time: "Mar 19, 2026 · 09:05",
        txSig: `${id.slice(0, 4)}…3c81`,
        status: "confirmed",
      },
      {
        id: "3",
        kind: "payout",
        label: "Payout (preview)",
        amount: token === "USDC" ? "0.00" : "0",
        token,
        time: "—",
        txSig: "—",
        status: "pending",
      },
    ],
  };
}

const statusCopy: Record<EscrowStatus, { label: string; tone: string }> = {
  awaiting_deposit: {
    label: "Awaiting deposit",
    tone: "text-amber-300/90 border-amber-400/25 bg-amber-400/10",
  },
  partially_funded: {
    label: "Partially funded",
    tone: "text-sky-300/90 border-sky-400/25 bg-sky-400/10",
  },
  in_escrow: {
    label: "In escrow",
    tone: "text-lemon border-lemon/35 bg-lemon/10",
  },
  released: {
    label: "Released",
    tone: "text-emerald-300/90 border-emerald-400/25 bg-emerald-400/10",
  },
  cancelled: {
    label: "Cancelled",
    tone: "text-white/50 border-white/15 bg-white/5",
  },
};

function WalletPill() {
  const { mounted, session, isConnected } = useWallet();

  if (!mounted) {
    return (
      <div className="h-12 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
    );
  }

  if (!isConnected || !session) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/50 ring-1 ring-white/10">
        Connect a wallet in the header to deposit or manage escrow.
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-lemon/25 bg-black/50 px-4 py-3 ring-1 ring-lemon/15 transition-colors hover:border-lemon/40 hover:ring-lemon/25">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lemon/10 ring-1 ring-lemon/20">
        <svg
          className="h-5 w-5 text-lemon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8zm4 6h4"
          />
        </svg>
      </span>
      <div className="min-w-0">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
          Connected wallet
        </p>
        <p className="truncate font-mono text-sm text-white/90">
          {truncateAddress(session.address, 6, 6)}
        </p>
        <p className="text-xs text-white/40">
          {session.kind === "phantom" ? "Phantom" : "MetaMask"}
        </p>
      </div>
    </div>
  );
}

export default function ChallengePaymentPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "demo";

  const data = useMemo(() => mockForId(id), [id]);

  return (
    <div className="relative min-h-screen bg-black">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/4 top-0 h-[35vh] w-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.06),transparent_65%)]" />
      </div>

      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lemon/80">
          <SolanaCrypto /> · Escrow
        </p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Payment &amp; escrow
        </h1>
        <p className="mt-2 text-sm text-white/55">
          Challenge <span className="font-mono text-white/75">{id}</span>
        </p>

        <div className="mt-8 space-y-6">
          <section className="glass-card rounded-2xl p-5 sm:p-7">
            <h2 className="font-display text-lg font-bold text-white sm:text-xl">
              Challenge info
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                  Name
                </dt>
                <dd className="mt-1 text-base font-semibold text-white">
                  {data.name}
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                  Description
                </dt>
                <dd className="mt-1 leading-relaxed text-white/75">
                  {data.description}
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                  Participants
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {data.participants.map((p) => (
                    <span
                      key={p}
                      className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/85 transition-colors hover:border-lemon/30 hover:text-lemon"
                    >
                      {p}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </section>

          <section className="glass-card rounded-2xl p-5 sm:p-7">
            <h2 className="font-display text-lg font-bold text-white sm:text-xl">
              Payment info
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 transition-colors hover:border-lemon/25">
                <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                  Stake amount
                </dt>
                <dd className="mt-1 font-display text-2xl font-extrabold text-lemon">
                  {data.amount}{" "}
                  <span className="text-lg text-white/90">{data.token}</span>
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 transition-colors hover:border-lemon/25">
                <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                  Token
                </dt>
                <dd className="mt-1 text-lg font-bold text-white">
                  {data.token === "SOL" ? "SOL (Solana)" : "USDC"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                  Escrow status
                </dt>
                <dd className="mt-2 flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusCopy[data.escrowStatus].tone}`}
                  >
                    {statusCopy[data.escrowStatus].label}
                  </span>
                  <span className="text-sm text-white/55">
                    Funded{" "}
                    <span className="font-mono text-white/80">{data.funded}</span>{" "}
                    /{" "}
                    <span className="font-mono text-white/80">
                      {data.target}
                    </span>{" "}
                    {data.token}
                  </span>
                </dd>
              </div>
            </dl>
          </section>

          <section className="glass-card rounded-2xl p-5 sm:p-7">
            <h2 className="font-display text-lg font-bold text-white sm:text-xl">
              Wallet
            </h2>
            <div className="mt-4">
              <WalletPill />
            </div>
          </section>

          <section className="glass-card rounded-2xl p-5 sm:p-7">
            <h2 className="font-display text-lg font-bold text-white sm:text-xl">
              Transaction history
            </h2>
            <ul className="mt-4 divide-y divide-white/[0.06]">
              {data.transactions.map((tx) => (
                <li key={tx.id}>
                  <div className="flex flex-col gap-2 py-4 transition-colors first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div>
                      <p className="font-semibold text-white">
                        {tx.label}{" "}
                        <span
                          className={
                            tx.kind === "payout"
                              ? "text-sky-300/90"
                              : "text-lemon"
                          }
                        >
                          +{tx.amount} {tx.token}
                        </span>
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-white/45">
                        {tx.txSig}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${
                          tx.status === "confirmed"
                            ? "bg-emerald-500/15 text-emerald-300/90"
                            : "bg-white/10 text-white/55"
                        }`}
                      >
                        {tx.status}
                      </span>
                      <span className="text-xs text-white/45">{tx.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/15 bg-transparent px-6 text-sm font-semibold text-white/75 transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white active:scale-[0.99] sm:order-1 sm:min-w-[180px]"
            >
              Cancel challenge
            </button>
            <button
              type="button"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-lemon px-6 text-sm font-bold text-black shadow-[0_0_0_1px_rgba(255,215,0,0.25),0_8px_28px_rgba(255,215,0,0.18)] transition-all hover:bg-[#ffe44d] hover:shadow-[0_0_32px_rgba(255,215,0,0.28)] active:scale-[0.99] sm:min-w-[200px]"
            >
              Deposit funds
            </button>
          </div>

          <p className="text-center text-xs text-white/35">
            Demo data for design preview. On-chain actions will connect to your
            program when integrated.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/create"
            className="text-sm font-medium text-lemon/90 underline-offset-4 transition-colors hover:text-lemon hover:underline"
          >
            ← Back to create challenge
          </Link>
        </div>
      </main>
    </div>
  );
}
