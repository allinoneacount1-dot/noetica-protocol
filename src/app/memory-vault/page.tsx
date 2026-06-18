"use client";
import { motion } from "framer-motion";
import ProtocolNav from "@/components/navigation/ProtocolNav";
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

      {/* HERO — Centered large */}
      <section className="min-h-[100dvh] flex items-center justify-center px-6 pt-24">
        <div className="relative z-10 max-w-4xl text-center">
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
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[120px] mb-8 leading-[0.95]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
          >
            Memory
            <br />
            <span className="text-gradient-gold">Vault</span>
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

      {/* FRAGMENTS — Premium 3-col cards */}
      <section className="py-20 md:py-32 px-6 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {copy.memoryVault.fragments.map((fragment, i) => {
              const color = typeColors[fragment.type] || "var(--gold)";
              return (
                <motion.div
                  key={fragment.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="group card-premium p-6 md:p-8 cursor-none relative overflow-hidden"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 w-full h-px opacity-30 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                  />

                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-[10px] tracking-[0.3em]"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
                    >
                      {fragment.id}
                    </span>
                    <span
                      className="text-[9px] px-2 py-1 uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color,
                        border: `1px solid ${color}20`,
                        background: `${color}08`,
                      }}
                    >
                      {fragment.type}
                    </span>
                  </div>

                  <h3
                    className="text-lg md:text-xl mb-5 leading-snug"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
                  >
                    {fragment.title}
                  </h3>

                  <div
                    className="pt-4 border-t flex items-center justify-between"
                    style={{ borderColor: "rgba(176,141,87,0.06)" }}
                  >
                    <span
                      className="text-[10px]"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
                    >
                      {fragment.date}
                    </span>
                    <div
                      className="w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: color }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COUNTER */}
      <section
        className="py-24 md:py-32 px-6 border-t"
        style={{ borderColor: "rgba(176,141,87,0.08)" }}
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
            className="text-5xl md:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            2,847,291
          </motion.p>
          <p
            className="mt-5 text-sm"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--bone-dim)" }}
          >
            fragments of collective intelligence archived
          </p>
        </div>
      </section>
    </div>
  );
}
