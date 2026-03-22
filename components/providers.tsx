"use client";

import { WalletProvider } from "@/contexts/wallet-context";
import { SiteHeader } from "@/components/site-header";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <SiteHeader />
      {children}
    </WalletProvider>
  );
}
