"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import { WalletAccountMenu } from "@/components/wallet-account-menu";
import { useWallet } from "@/contexts/wallet-context";

export function SiteHeader() {
  const pathname = usePathname();
  const { mounted, isConnected } = useWallet();
  const isCreate = pathname === "/create";
  const isSettings = pathname === "/settings";
  const isChallengePayment = /^\/challenge\/[^/]+\/payment$/.test(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          {isCreate || isSettings || isChallengePayment ? (
            <Link
              href="/"
              className="shrink-0 text-sm font-medium text-white/55 transition-colors hover:text-white"
            >
              {isSettings ? "← Home" : "← Back"}
            </Link>
          ) : null}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.svg"
              alt="Challenge app"
              width={40}
              height={40}
              priority
              className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
            />
            <span className="font-display truncate text-lg font-extrabold tracking-tight text-white sm:text-xl">
              Challenge
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
          <Link
            href="/dashboard"
            className="transition-colors hover:text-lemon"
          >
            Dashboard
          </Link>
          <Link
            href="/#features"
            className="transition-colors hover:text-lemon"
          >
            Features
          </Link>
          <Link
            href="/#footer"
            className="transition-colors hover:text-lemon"
          >
            Contact
          </Link>
          <Link
            href="/settings"
            className="transition-colors hover:text-lemon"
          >
            Settings
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <Link
            href="/dashboard"
            className="rounded-lg px-2 py-2 text-sm font-medium text-white/65 transition-colors hover:text-lemon"
          >
            Dash
          </Link>
          <Link
            href="/settings"
            className="rounded-lg px-2 py-2 text-sm font-medium text-white/65 transition-colors hover:text-lemon"
          >
            Settings
          </Link>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          {mounted && isConnected ? (
            <WalletAccountMenu />
          ) : mounted ? (
            <ConnectWalletButton className="inline-flex min-h-[38px] items-center justify-center rounded-lg border-2 border-lemon bg-transparent px-3 py-1.5 text-xs font-bold text-lemon transition-all hover:bg-lemon/10 hover:shadow-[0_0_16px_rgba(255,215,0,0.12)] sm:px-3.5 sm:text-sm" />
          ) : (
            <span className="inline-block h-[38px] w-24 rounded-lg bg-white/[0.04] sm:w-28" aria-hidden />
          )}
        </div>
      </div>
    </header>
  );
}
