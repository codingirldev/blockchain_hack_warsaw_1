import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your active challenges, leaderboard, and wallet overview.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
