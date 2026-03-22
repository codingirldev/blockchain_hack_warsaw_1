"use client";

import Link from "next/link";
import { useCallback, useId, useState } from "react";
import { SolanaCrypto } from "@/components/solana-crypto";

type StakeToken = "USDC" | "SOL";

function InfoTooltip({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        className="ml-1.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-bold text-white/60 transition-colors hover:border-lemon/40 hover:text-lemon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lemon/60"
        aria-expanded={open}
        aria-controls={id}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        i
      </button>
      <span
        id={id}
        role="tooltip"
        hidden={!open}
        className="absolute left-1/2 top-full z-20 mt-2 w-[min(100vw-2rem,18rem)] -translate-x-1/2 rounded-xl border border-white/10 bg-zinc-950/95 px-3 py-2.5 text-left text-xs leading-relaxed text-white/75 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:left-0 sm:translate-x-0"
      >
        {children}
      </span>
    </span>
  );
}

function FloatingInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  inputMode,
  autoComplete,
  min,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  min?: string | number;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 pb-2.5 pt-6 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors placeholder:text-transparent focus:border-lemon/45 focus:outline-none focus:ring-1 focus:ring-lemon/30"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-base text-white/45 transition-all duration-200 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-lemon peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  rows = 4,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        rows={rows}
        className="peer w-full resize-y rounded-xl border border-white/10 bg-white/[0.06] px-4 pb-2.5 pt-7 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors placeholder:text-transparent focus:border-lemon/45 focus:outline-none focus:ring-1 focus:ring-lemon/30 min-h-[120px]"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-5 text-base text-white/45 transition-all duration-200 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-lemon peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingSelect({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full appearance-none rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 pr-10 pt-6 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors focus:border-lemon/45 focus:outline-none focus:ring-1 focus:ring-lemon/30"
      >
        {children}
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-xs text-lemon"
      >
        {label}
      </label>
      <span className="pointer-events-none absolute right-3.5 top-[calc(50%+0.5rem)] -translate-y-1/2 text-[0.65rem] text-white/35">
        ▼
      </span>
    </div>
  );
}

/** App nickname: 2–32 chars, letters, numbers, spaces, _ - . */
const nickOk = (s: string) => {
  const t = s.trim();
  if (t.length < 2 || t.length > 32) return false;
  return /^[a-zA-Z0-9_\-. ]+$/.test(t);
};

export default function CreateChallengePage() {
  const stakeTipId = useId();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakeToken, setStakeToken] = useState<StakeToken>("USDC");
  const [duration, setDuration] = useState("7");
  const [customDays, setCustomDays] = useState("");
  const [participantInput, setParticipantInput] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);

  const addParticipant = useCallback(() => {
    const raw = participantInput.trim();
    if (!raw || !nickOk(raw)) return;
    const lower = raw.toLowerCase();
    if (participants.some((n) => n.toLowerCase() === lower)) {
      setParticipantInput("");
      return;
    }
    setParticipants((p) => [...p, raw]);
    setParticipantInput("");
  }, [participantInput, participants]);

  const removeParticipant = (nick: string) => {
    setParticipants((p) => p.filter((x) => x !== nick));
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    // Wire to API / wallet flow later
  };

  return (
    <div className="relative min-h-screen bg-black">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[40vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.06),transparent_65%)]" />
      </div>

      <main className="mx-auto w-full max-w-lg px-4 pb-12 pt-6 sm:max-w-xl sm:px-6 sm:pt-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Create challenge
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          Lock a stake in USDC or SOL, add participants by nickname, and settle rewards with{" "}
          <SolanaCrypto className="font-semibold" /> when the challenge ends.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8"
        >
          <FloatingInput
            id="challenge-name"
            label="Challenge name"
            value={name}
            onChange={setName}
            autoComplete="off"
          />

          <FloatingTextarea
            id="challenge-description"
            label="Challenge description"
            value={description}
            onChange={setDescription}
            rows={4}
          />

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-1">
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                Stake amount
              </span>
              <InfoTooltip
                id={stakeTipId}
                label="Staking rules"
              >
                Stakes are held in escrow until the challenge completes. Winners
                split the pool per your rules; ties and disputes can be resolved
                by vote or admin—connect your wallet to confirm on-chain terms
                before funding.
              </InfoTooltip>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="relative min-w-0 flex-1">
                <input
                  id="stake-amount"
                  type="text"
                  inputMode="decimal"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder=" "
                  className="peer w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 pb-2.5 pt-6 font-mono text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors placeholder:text-transparent focus:border-lemon/45 focus:outline-none focus:ring-1 focus:ring-lemon/30"
                />
                <label
                  htmlFor="stake-amount"
                  className="pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-base text-white/45 transition-all duration-200 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-lemon peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Amount
                </label>
              </div>
              <div
                className="flex shrink-0 rounded-xl border border-white/10 bg-black/40 p-1 shadow-inner"
                role="group"
                aria-label="Stake token"
              >
                {(["USDC", "SOL"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setStakeToken(t)}
                    className={`min-h-[48px] flex-1 rounded-lg px-4 text-sm font-bold transition-all sm:min-w-[5.5rem] sm:flex-none ${
                      stakeToken === t
                        ? "bg-lemon text-black shadow-[0_4px_16px_rgba(255,215,0,0.25)]"
                        : "text-white/55 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <FloatingSelect
            id="duration"
            label="Duration"
            value={duration}
            onChange={setDuration}
          >
            <option value="1">1 day</option>
            <option value="7">7 days</option>
            <option value="custom">Custom</option>
          </FloatingSelect>

          {duration === "custom" && (
            <FloatingInput
              id="custom-days"
              label="Custom length (days)"
              value={customDays}
              onChange={setCustomDays}
              type="number"
              inputMode="numeric"
              min="1"
            />
          )}

          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <div className="relative min-w-0 flex-1">
                <input
                  id="participants"
                  type="text"
                  value={participantInput}
                  onChange={(e) => setParticipantInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addParticipant();
                    }
                  }}
                  placeholder=" "
                  autoComplete="username"
                  maxLength={32}
                  className="peer w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 pb-2.5 pt-6 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors placeholder:text-transparent focus:border-lemon/45 focus:outline-none focus:ring-1 focus:ring-lemon/30"
                />
                <label
                  htmlFor="participants"
                  className="pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-base text-white/45 transition-all duration-200 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-lemon peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Participant nickname
                </label>
              </div>
              <button
                type="button"
                onClick={addParticipant}
                className="h-[52px] shrink-0 rounded-xl border border-lemon/35 bg-lemon/10 px-5 text-sm font-bold text-lemon transition-colors hover:bg-lemon/15 sm:h-auto sm:self-end sm:px-6"
              >
                Add
              </button>
            </div>
            <p className="mt-2 text-xs text-white/40">
              Use each person’s in-app nickname (2–32 characters). Press enter or
              tap Add for more.
            </p>
            {participants.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Participants">
                {participants.map((nick) => (
                  <li key={nick}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-3 pr-1 text-sm text-white/85 shadow-sm">
                      <span className="max-w-[200px] truncate sm:max-w-[240px]">
                        {nick}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeParticipant(nick)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label={`Remove ${nick}`}
                      >
                        ×
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-transparent px-6 text-sm font-semibold text-white/70 transition-colors hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-lemon px-6 text-sm font-bold text-black shadow-[0_0_0_1px_rgba(255,215,0,0.25),0_8px_28px_rgba(255,215,0,0.18)] transition-all hover:bg-[#ffe44d] hover:shadow-[0_10px_32px_rgba(255,215,0,0.28)] active:scale-[0.99]"
            >
              Create Challenge
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
