import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment & escrow",
  description: "Challenge stake, escrow status, and transaction history.",
};

export default function ChallengePaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
