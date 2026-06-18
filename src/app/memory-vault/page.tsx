"use client";
import { motion } from "framer-motion";
import ProtocolNav from "@/components/navigation/ProtocolNav";
import MemoryFragment from "@/components/ui/MemoryFragment";
import GlitchText from "@/components/ui/GlitchText";
import { copy } from "@/lib/theme";

export default function MemoryVaultPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--carbon)" }}>
      <ProtocolNav />

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: "var(--gold)",
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            ⟐ MEMORY ARCHIVE
          </motion.p>
          <GlitchText
            text={copy.memoryVault.title}
            as="h1"
            className="text-5xl md:text-7xl mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--bone-dim)",
              lineHeight: 1.8,
            }}
          >
            {copy.memoryVault.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {copy.memoryVault.fragments.map((fragment, i) => (
              <motion.div
                key={fragment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <MemoryFragment
                  id={fragment.id}
                  title={fragment.title}
                  type={fragment.type}
                  date={fragment.date}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 border-t" style={{ borderColor: "rgba(176,141,87,0.1)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
          >
            PROTOCOL MEMORY COUNT
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--gold)",
            }}
          >
            2,847,291
          </motion.p>
          <p
            className="mt-4 text-sm"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone-dim)" }}
          >
            fragments of collective intelligence archived
          </p>
        </div>
      </section>
    </div>
  );
}
