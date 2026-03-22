const prefix = "challenge:nickname:";

export function nicknameStorageKey(address: string): string {
  return `${prefix}${address}`;
}

export function getWalletNickname(address: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(nicknameStorageKey(address));
    return v?.trim() ? v.trim() : null;
  } catch {
    return null;
  }
}

export function setWalletNickname(address: string, nickname: string): void {
  if (typeof window === "undefined") return;
  const t = nickname.trim();
  try {
    if (!t) {
      localStorage.removeItem(nicknameStorageKey(address));
    } else {
      localStorage.setItem(nicknameStorageKey(address), t);
    }
  } catch {
    /* ignore */
  }
}
