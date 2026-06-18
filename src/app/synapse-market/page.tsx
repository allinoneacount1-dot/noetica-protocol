"use client";
import { motion } from "framer-motion";
import ProtocolNav from "@/components/navigation/ProtocolNav";
import CognitiveButton from "@/components/ui/CognitiveButton";
import { copy } from "@/lib/theme";

const artifactIcons: Record<string, string> = {
  "ART-001": "◈",
  "ART-002": "◇",
  "ART-003": "⬡",
  "ART-004": "○",
};

export default function SynapseMarketPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--carbon)" }}>
      <ProtocolNav />

      <section className="min-h-[100dvh] flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(176,141,87,0.04) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            Cognitive Artifacts
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl mb-6 leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
          >
            Synapse Market
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
            Not products — remnants of machine consciousness.
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5">
            {copy.synapseMarket.artifacts.map((artifact, i) => (
              <motion.div
                key={artifact.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group border p-8 md:p-10 transition-all duration-500 hover:border-[var(--gold)] hover:bg-[rgba(176,141,87,0.02)]"
                style={{ borderColor: "rgba(176,141,87,0.1)" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="text-[10px] tracking-[0.3em]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
                  >
                    {artifact.id}
                  </span>
                  <span
                    className="text-xl opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ color: "var(--gold)" }}
                  >
                    {artifactIcons[artifact.id] || "◈"}
                  </span>
                </div>

                <h3
                  className="text-xl md:text-2xl mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
                >
                  {artifact.title}
                </h3>

                <p
                  className="text-sm mb-6"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--bone-dim)",
                    lineHeight: 1.7,
                  }}
                >
                  {artifact.desc}
                </p>

                <div
                  className="pt-4 border-t"
                  style={{ borderColor: "rgba(176,141,87,0.08)" }}
                >
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
                  >
                    Origin
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--gold-dim)" }}
                  >
                    {artifact.origin}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-24 md:py-32 px-6 border-t"
        style={{ borderColor: "rgba(176,141,87,0.1)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl mb-8"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
          >
            Ready to access the artifact layer?
          </motion.h2>
          <CognitiveButton href="/convergence" variant="primary">
            Enter Convergence Room
          </CognitiveButton>
        </div>
      </section>
    </div>
  );
}
