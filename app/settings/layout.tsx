import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Profile and nickname for your connected wallet.",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
