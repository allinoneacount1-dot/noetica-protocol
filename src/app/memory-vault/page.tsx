"use client";
import { motion } from "framer-motion";
import ProtocolNav from "@/components/navigation/ProtocolNav";
import GlitchText from "@/components/ui/GlitchText";
import { copy } from "@/lib/theme";

const typeColors: Record<string, string> = {
  genesis: "var(--gold)",
  neural: "var(--glacial)",
  convergence: "var(--violet)",
  awakening: "var(--gold-bright)",
  fragment: "var(--glacial-dim)",
  dream: "var(--bone-dim)",
};

export default function MemoryVaultPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--carbon)" }}>
      <ProtocolNav />

      <section className="min-h-[100dvh] flex items-center justify-center px-6 pt-20">
        <div className="relative z-10 max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            Memory Archive
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl mb-6 leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
          >
            Memory Vault
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-sm md:text-base max-w-xl mx-auto"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--bone-dim)",
              lineHeight: 1.9,
            }}
          >
            Each fragment holds a recollection of collective intelligence.
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {copy.memoryVault.fragments.map((fragment, i) => {
              const color = typeColors[fragment.type] || "var(--gold)";
              return (
                <motion.div
                  key={fragment.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="group border p-6 md:p-8 transition-all duration-500 hover:border-[var(--gold)] hover:bg-[rgba(176,141,87,0.02)]"
                  style={{ borderColor: "rgba(176,141,87,0.1)" }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-[10px] tracking-[0.3em]"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
                    >
                      {fragment.id}
                    </span>
                    <span
                      className="text-[10px] px-2 py-0.5 uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {fragment.type}
                    </span>
                  </div>

                  <h3
                    className="text-lg md:text-xl mb-4 leading-snug"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
                  >
                    {fragment.title}
                  </h3>

                  <div
                    className="pt-4 border-t"
                    style={{ borderColor: "rgba(176,141,87,0.08)" }}
                  >
                    <span
                      className="text-[10px]"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
                    >
                      {fragment.date}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="py-24 md:py-32 px-6 border-t"
        style={{ borderColor: "rgba(176,141,87,0.1)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
          >
            Protocol Memory Count
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            2,847,291
          </motion.p>
          <p
            className="mt-4 text-sm"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--bone-dim)" }}
          >
            fragments of collective intelligence archived
          </p>
        </div>
      </section>
    </div>
  );
}
