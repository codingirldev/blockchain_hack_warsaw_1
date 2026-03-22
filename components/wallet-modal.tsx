"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export type WalletId = "phantom" | "metamask";

function PhantomIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#AB9FF2"
        d="M24 6C12.4 6 6 12.4 6 24v12c0 2.2 1.8 4 4 4h2l3-6 3 6 3-6 3 6 3-6 3 6h2c2.2 0 4-1.8 4-4V24c0-11.6-6.4-18-18-18Z"
      />
      <circle cx="17" cy="20" r="3" fill="#1a1a1a" />
      <circle cx="31" cy="20" r="3" fill="#1a1a1a" />
    </svg>
  );
}

function MetaMaskIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#E2761B"
        d="M24 4 6 16v16l6 10 12 6 12-6 6-10V16L24 4Z"
      />
      <path
        fill="#E4761B"
        d="m24 4-9 24 3-1.5L24 10l6 16.5 3 1.5L24 4Z"
      />
      <path
        fill="#D7C1B3"
        d="M15 28 9 34l6 2 4-8-4 4Zm18 0 6 6-6 2-4-8 4 4Z"
      />
      <path
        fill="#233447"
        d="M9 34 6 40l9-2-6-4Zm30 0 3 6-9-2 6-4Z"
      />
    </svg>
  );
}

const wallets: {
  id: WalletId;
  name: string;
  Icon: typeof PhantomIcon;
}[] = [
  { id: "phantom", name: "Phantom Wallet", Icon: PhantomIcon },
  { id: "metamask", name: "MetaMask", Icon: MetaMaskIcon },
];

export function WalletModal({
  open,
  onClose,
  onSelectWallet,
}: {
  open: boolean;
  onClose: () => void;
  onSelectWallet?: (id: WalletId) => void | Promise<void>;
}) {
  const titleId = useId();
  const descId = useId();
  const firstWalletRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    async (id: WalletId) => {
      onClose();
      await onSelectWallet?.(id);
    },
    [onClose, onSelectWallet],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => firstWalletRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-[2px] transition-opacity"
        aria-label="Close wallet modal"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative z-10 flex w-full max-w-md flex-col rounded-t-3xl border border-white/10 bg-[#0a0a0a] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 shadow-[0_-8px_48px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,215,0,0.06),inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-3xl sm:pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-white/15 sm:hidden" aria-hidden />

        <div className="mb-1 flex items-start justify-between gap-3">
          <h2
            id={titleId}
            className="font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl"
          >
            Connect wallet
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white/50 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lemon/60"
            aria-label="Close"
          >
            <span className="text-2xl leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <p
          id={descId}
          className="mb-6 text-center text-sm leading-relaxed text-white/55 sm:text-left"
        >
          Connect your wallet to participate in challenges
        </p>

        <ul className="flex flex-col gap-3" role="list">
          {wallets.map(({ id, name, Icon }, i) => (
            <li key={id}>
              <button
                ref={i === 0 ? firstWalletRef : undefined}
                type="button"
                onClick={() => void handleSelect(id)}
                className="flex w-full min-h-[56px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-200 hover:border-lemon/45 hover:bg-white/[0.07] hover:shadow-[0_0_28px_rgba(255,215,0,0.22),0_0_0_1px_rgba(255,215,0,0.12)] active:scale-[0.99] active:border-lemon/55 active:shadow-[0_0_20px_rgba(255,215,0,0.28)] sm:min-h-[60px] sm:px-5 sm:py-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/40 ring-1 ring-white/10">
                  <Icon className="h-9 w-9" />
                </span>
                <span className="font-display text-base font-bold text-white sm:text-lg">
                  {name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
