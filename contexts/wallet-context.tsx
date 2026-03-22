"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  disconnectWallet,
  readWalletSession,
  type WalletSession,
} from "@/lib/wallet-connect";
import { getWalletNickname, setWalletNickname } from "@/lib/wallet-nickname";

type WalletContextValue = {
  mounted: boolean;
  session: WalletSession | null;
  nickname: string | null;
  isConnected: boolean;
  setNickname: (value: string) => void;
  refresh: () => void;
  disconnect: () => Promise<void>;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<WalletSession | null>(null);
  const [nickname, setNicknameState] = useState<string | null>(null);

  const refresh = useCallback(() => {
    const s = readWalletSession();
    setSession(s);
    if (s?.address) {
      setNicknameState(getWalletNickname(s.address));
    } else {
      setNicknameState(null);
    }
  }, []);

  useEffect(() => {
    /* Hydrate wallet from sessionStorage after client mount (avoid SSR mismatch). */
    /* eslint-disable react-hooks/set-state-in-effect -- one-time client hydration */
    setMounted(true);
    refresh();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [refresh]);

  const setNickname = useCallback(
    (value: string) => {
      if (!session?.address) return;
      setWalletNickname(session.address, value);
      setNicknameState(getWalletNickname(session.address));
    },
    [session],
  );

  const disconnect = useCallback(async () => {
    await disconnectWallet();
    refresh();
  }, [refresh]);

  const value = useMemo<WalletContextValue>(
    () => ({
      mounted,
      session,
      nickname,
      isConnected: Boolean(session?.address),
      setNickname,
      refresh,
      disconnect,
    }),
    [mounted, session, nickname, setNickname, refresh, disconnect],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return ctx;
}
