import type { Metadata } from "next";
import "./globals.css";

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
        <div className="noise-overlay" />
        <div className="scan-line" />
        {children}
      </body>
    </html>
  );
}
