/** Short display for long base58 or hex addresses. */
export function truncateAddress(address: string, head = 4, tail = 4): string {
  const t = address.trim();
  if (t.length <= head + tail + 1) return t;
  return `${t.slice(0, head)}…${t.slice(-tail)}`;
}
