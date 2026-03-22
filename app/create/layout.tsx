import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Challenge",
  description: "Set up a new on-chain challenge with stake, duration, and participants.",
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
