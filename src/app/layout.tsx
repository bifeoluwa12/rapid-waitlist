import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Build. Unstoppable.",
  description: "The boilerplate for the 1%. Ship your SaaS in 24 hours.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}