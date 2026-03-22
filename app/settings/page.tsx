"use client";

import Link from "next/link";
import { useState } from "react";
import { useWallet } from "@/contexts/wallet-context";
import type { WalletSession } from "@/lib/wallet-connect";

const nickOk = (s: string) => {
  const t = s.trim();
  if (t.length < 2 || t.length > 32) return false;
  return /^[a-zA-Z0-9_\-. ]+$/.test(t);
};

function NicknameForm({
  session,
  initialNickname,
  setNickname,
}: {
  session: WalletSession;
  initialNickname: string | null;
  setNickname: (value: string) => void;
}) {
  const [draft, setDraft] = useState(initialNickname ?? "");
  const [saved, setSaved] = useState(false);

  const save = () => {
    const t = draft.trim();
    if (t && !nickOk(t)) return;
    setNickname(t);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="mx-auto w-full max-w-lg px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-white">
        Settings
      </h1>
      <p className="mt-2 text-sm text-white/55">
        Your nickname is stored with this account and shown when you’re logged in.
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
            Connected wallet
          </p>
          <p className="mt-2 break-all font-mono text-sm text-white/85">
            {session.address}
          </p>
          <p className="mt-1 text-xs text-white/40">
            {session.kind === "phantom" ? "Phantom" : "MetaMask"}
          </p>
        </div>

        <div className="relative">
          <input
            id="settings-nick"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder=" "
            maxLength={32}
            className="peer w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 pb-2.5 pt-6 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors placeholder:text-transparent focus:border-lemon/45 focus:outline-none focus:ring-1 focus:ring-lemon/30"
          />
          <label
            htmlFor="settings-nick"
            className="pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-base text-white/45 transition-all duration-200 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-lemon peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
          >
            App nickname
          </label>
        </div>
        <p className="text-xs text-white/40">
          2–32 characters: letters, numbers, spaces, _ - .
        </p>

        <button
          type="button"
          onClick={save}
          disabled={Boolean(draft.trim()) && !nickOk(draft.trim())}
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-lemon px-6 text-sm font-bold text-black shadow-[0_0_0_1px_rgba(255,215,0,0.25)] transition-opacity hover:bg-[#ffe44d] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save nickname
        </button>
        {saved ? (
          <p className="text-center text-sm text-lemon" role="status">
            Saved
          </p>
        ) : null}
      </div>
    </main>
  );
}

export default function SettingsPage() {
  const { mounted, session, nickname, setNickname, isConnected } = useWallet();

  if (!mounted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center text-white/50">
        Loading…
      </div>
    );
  }

  if (!isConnected || !session) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-white/70">
          Connect your wallet using the button in the top-right corner.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-lemon hover:underline"
        >
          Back to home
        </Link>
      </main>
    );
  }

  return (
    <NicknameForm
      key={session.address}
      session={session}
      initialNickname={nickname}
      setNickname={setNickname}
    />
  );
}
