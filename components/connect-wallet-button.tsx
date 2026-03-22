"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WalletModal, type WalletId } from "@/components/wallet-modal";
import { useWallet } from "@/contexts/wallet-context";
import { connectMetaMask, connectPhantom } from "@/lib/wallet-connect";

export function ConnectWalletButton({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { refresh, isConnected, mounted } = useWallet();

  if (!mounted || isConnected) return null;

  const handleWalletSelect = async (id: WalletId) => {
    if (id === "phantom") {
      const result = await connectPhantom();
      if (result.ok) {
        refresh();
        router.replace("/?wallet=phantom");
      }
      return;
    }

    const result = await connectMetaMask();
    if (result.ok) {
      refresh();
      router.replace("/?wallet=metamask");
    }
  };

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
      >
        Connect Wallet
      </button>
      <WalletModal
        open={open}
        onClose={() => setOpen(false)}
        onSelectWallet={handleWalletSelect}
      />
    </>
  );
}
