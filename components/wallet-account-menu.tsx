"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useWallet } from "@/contexts/wallet-context";
import { truncateAddress } from "@/lib/format-address";

export function WalletAccountMenu() {
  const { mounted, session, nickname, disconnect } = useWallet();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (
        rootRef.current &&
        e.target instanceof Node &&
        !rootRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  if (!mounted || !session) return null;

  const label = nickname
    ? nickname
    : truncateAddress(session.address, 4, 4);

  return (
    <div ref={rootRef} className="relative flex items-center gap-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex max-w-[min(100vw-8rem,14rem)] items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-3 py-2 text-left text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:border-lemon/35 hover:bg-white/[0.09] min-h-[44px] sm:min-h-0 sm:py-1.5"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="truncate font-mono text-xs text-white/90 sm:text-sm">
          {label}
        </span>
        <span className="shrink-0 text-[0.65rem] text-white/45" aria-hidden>
          ▼
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[60] mt-2 w-[min(calc(100vw-2rem),18rem)] rounded-xl border border-white/10 bg-[#0a0a0a] py-2 shadow-[0_12px_48px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,215,0,0.08)]"
        >
          <div className="border-b border-white/[0.06] px-3 py-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
              Wallet
            </p>
            <p className="mt-1 break-all font-mono text-xs text-white/80">
              {session.address}
            </p>
            <p className="mt-1 text-[0.65rem] text-white/35">
              {session.kind === "phantom" ? "Phantom" : "MetaMask"}
            </p>
          </div>
          {nickname ? (
            <div className="border-b border-white/[0.06] px-3 py-2">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                Nickname
              </p>
              <p className="mt-0.5 text-sm text-lemon">{nickname}</p>
            </div>
          ) : null}
          <Link
            href="/settings"
            role="menuitem"
            className="block px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
          <button
            type="button"
            role="menuitem"
            className="w-full px-3 py-2.5 text-left text-sm font-medium text-lemon transition-colors hover:bg-lemon/10"
            onClick={() => {
              setOpen(false);
              void disconnect();
            }}
          >
            Disconnect wallet
          </button>
        </div>
      )}
    </div>
  );
}
