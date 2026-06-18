"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Genesis", semantic: "Origin" },
  { href: "/protocol", label: "Protocol", semantic: "Architecture" },
  { href: "/memory-vault", label: "Memory Vault", semantic: "Recollection" },
  { href: "/synapse-market", label: "Synapse", semantic: "Artifacts" },
  { href: "/convergence", label: "Convergence", semantic: "Fusion" },
  { href: "/terminal", label: "Terminal", semantic: "Interface" },
];

export default function ProtocolNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          paddingTop: isScrolled ? "12px" : "20px",
          paddingBottom: isScrolled ? "12px" : "20px",
        }}
        transition={{ delay: 4, duration: 0.5, layout: { duration: 0.4 } }}
        className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12"
        style={{
          background: isScrolled ? "rgba(11,15,20,0.85)" : "rgba(11,15,20,0.4)",
          backdropFilter: `blur(${isScrolled ? 24 : 12}px)`,
          borderBottom: "1px solid rgba(176,141,87,0.06)",
          transition: "background 0.5s ease, backdrop-filter 0.5s ease",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-none">
            <motion.div
              className="flex items-center justify-center border transition-all duration-500"
              style={{
                borderColor: "var(--gold)",
                width: isScrolled ? "28px" : "36px",
                height: isScrolled ? "28px" : "36px",
              }}
              whileHover={{ rotate: 45, scale: 1.05 }}
            >
              <span
                className="transition-all duration-500"
                style={{
                  color: "var(--gold)",
                  fontFamily: "var(--font-serif)",
                  fontSize: isScrolled ? "10px" : "14px",
                }}
              >
                N
              </span>
            </motion.div>
            <span
              className="text-xs tracking-[0.25em] hidden md:block transition-all duration-500"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--bone)",
                opacity: isScrolled ? 0 : 1,
                width: isScrolled ? "0" : "auto",
                overflow: "hidden",
              }}
            >
              NOETICA
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative cursor-none px-3 py-1.5"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span
                  className="text-[11px] tracking-[0.12em] uppercase transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color:
                      pathname === item.href ? "var(--gold)" : "var(--glacial-dim)",
                    fontWeight: pathname === item.href ? 600 : 400,
                    letterSpacing: pathname === item.href ? "0.15em" : "0.12em",
                  }}
                >
                  {hoveredIndex === i ? item.semantic : item.label}
                </span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-3 right-3 h-px"
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
              transition={{ delay: i * 0.06 }}
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
