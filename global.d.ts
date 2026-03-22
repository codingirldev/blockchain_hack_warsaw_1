export {};

type PhantomSolanaProvider = {
  isPhantom?: boolean;
  connect: (opts?: {
    onlyIfTrusted?: boolean;
  }) => Promise<{
    publicKey: { toString: () => string };
  }>;
  disconnect?: () => Promise<void>;
};

type EthProvider = {
  isMetaMask?: boolean;
  request: (args: {
    method: string;
    params?: unknown[];
  }) => Promise<unknown>;
};

declare global {
  interface Window {
    solana?: PhantomSolanaProvider;
    ethereum?: EthProvider & {
      providers?: EthProvider[];
    };
  }
}
