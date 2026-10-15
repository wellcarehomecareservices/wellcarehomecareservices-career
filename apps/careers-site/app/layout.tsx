import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WellCare Careers",
  description: "Join the WellCare team and apply for a caregiving role in just a few minutes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
