"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Genesis" },
  { href: "/protocol", label: "Protocol" },
  { href: "/memory-vault", label: "Memory Vault" },
  { href: "/synapse-market", label: "Synapse" },
  { href: "/convergence", label: "Convergence" },
  { href: "/terminal", label: "Terminal" },
];

export default function ProtocolNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 1 }}
        className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-6"
        style={{
          background: "linear-gradient(180deg, rgba(11,15,20,0.95) 0%, transparent 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-none">
            <motion.div
              className="w-8 h-8 flex items-center justify-center border"
              style={{ borderColor: "var(--gold)" }}
              whileHover={{ rotate: 45, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <span style={{ color: "var(--gold)", fontFamily: "var(--font-serif)" }}>
                Ν
              </span>
            </motion.div>
            <span
              className="text-sm tracking-[0.2em] hidden md:block"
              style={{ fontFamily: "var(--font-sans)", color: "var(--bone)" }}
            >
              NOETICA
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-xs tracking-[0.15em] uppercase cursor-none"
                style={{
                  fontFamily: "var(--font-mono)",
                  color:
                    pathname === item.href ? "var(--gold)" : "var(--glacial-dim)",
                }}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: "var(--gold)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 cursor-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.span
              className="block w-5 h-px"
              style={{ background: "var(--gold)" }}
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }}
            />
            <motion.span
              className="block w-5 h-px"
              style={{ background: "var(--gold)" }}
              animate={{ opacity: isOpen ? 0 : 1 }}
            />
            <motion.span
              className="block w-5 h-px"
              style={{ background: "var(--gold)" }}
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }}
            />
          </button>
        </div>
      </motion.nav>

      <motion.div
        className="fixed inset-0 z-[99] md:hidden"
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        style={{ background: "rgba(11,15,20,0.98)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : 20,
              }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl tracking-[0.2em] uppercase cursor-none"
                style={{
                  fontFamily: "var(--font-serif)",
                  color:
                    pathname === item.href ? "var(--gold)" : "var(--bone-dim)",
                }}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
