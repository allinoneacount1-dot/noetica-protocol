import type { Metadata } from "next";
import "./globals.css";
import GlobalCursor from "@/components/GlobalCursor";
import SystemMood from "@/context/SystemMood";

export const metadata: Metadata = {
  title: "NOETICA PROTOCOL",
  description: "Memory is the new currency of intelligence. An evolving intelligence layer on top of decentralized networks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SystemMood>
          <GlobalCursor />
          <div className="noise-overlay" />
          <div className="scan-line" />
          {children}
        </SystemMood>
      </body>
    </html>
  );
}
