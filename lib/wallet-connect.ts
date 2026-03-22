/** Official install / “get the wallet” pages (user can sign in from the extension or app). */
export const PHANTOM_INSTALL_URL = "https://phantom.app/download";
export const METAMASK_INSTALL_URL = "https://metamask.io/download/";

type EthProvider = {
  isMetaMask?: boolean;
  request: (args: {
    method: string;
    params?: unknown[];
  }) => Promise<unknown>;
};

function getMetaMaskProvider(): EthProvider | null {
  if (typeof window === "undefined") return null;
  const eth = window.ethereum;
  if (!eth) return null;
  if (eth.isMetaMask) return eth;
  const providers = eth.providers;
  if (providers?.length) {
    const mm = providers.find((p) => p.isMetaMask);
    if (mm) return mm;
  }
  return null;
}

export type WalletConnectResult =
  | { ok: true; kind: "phantom"; publicKey: string }
  | { ok: true; kind: "metamask"; address: string }
  | { ok: false; kind: "phantom" | "metamask"; reason: "no_provider" | "rejected" };

export const STORAGE_KEY = "challenge:wallet";

export type WalletSession = {
  kind: "phantom" | "metamask";
  address: string;
};

export function persistWalletSession(payload: WalletSession) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota / private mode */
  }
}

export function readWalletSession(): WalletSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<WalletSession>;
    if (
      !parsed?.address ||
      (parsed.kind !== "phantom" && parsed.kind !== "metamask")
    ) {
      return null;
    }
    return { kind: parsed.kind, address: parsed.address };
  } catch {
    return null;
  }
}

export async function disconnectWallet(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const sol = window.solana;
    if (sol?.isPhantom && typeof sol.disconnect === "function") {
      await sol.disconnect();
    }
  } catch {
    /* ignore */
  }
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Opens Phantom’s connect flow (extension / in-app). If Phantom isn’t available, sends the user to Phantom’s download page to install and sign in.
 */
export async function connectPhantom(): Promise<WalletConnectResult> {
  if (typeof window === "undefined") {
    return { ok: false, kind: "phantom", reason: "no_provider" };
  }

  const sol = window.solana;
  if (!sol?.isPhantom) {
    window.location.assign(PHANTOM_INSTALL_URL);
    return { ok: false, kind: "phantom", reason: "no_provider" };
  }

  try {
    const res = await sol.connect();
    const publicKey = res.publicKey.toString();
    persistWalletSession({ kind: "phantom", address: publicKey });
    return { ok: true, kind: "phantom", publicKey };
  } catch {
    return { ok: false, kind: "phantom", reason: "rejected" };
  }
}

/**
 * Opens MetaMask’s account request (login). If MetaMask isn’t available, sends the user to MetaMask’s download page to install and sign in.
 */
export async function connectMetaMask(): Promise<WalletConnectResult> {
  if (typeof window === "undefined") {
    return { ok: false, kind: "metamask", reason: "no_provider" };
  }

  const mm = getMetaMaskProvider();
  if (!mm) {
    window.location.assign(METAMASK_INSTALL_URL);
    return { ok: false, kind: "metamask", reason: "no_provider" };
  }

  try {
    const accounts = (await mm.request({
      method: "eth_requestAccounts",
    })) as string[];
    const address = accounts[0] ?? "";
    if (!address) {
      return { ok: false, kind: "metamask", reason: "rejected" };
    }
    persistWalletSession({ kind: "metamask", address });
    return { ok: true, kind: "metamask", address };
  } catch {
    return { ok: false, kind: "metamask", reason: "rejected" };
  }
}
