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

const artifactAccents: Record<string, string> = {
  "ART-001": "var(--gold)",
  "ART-002": "var(--glacial)",
  "ART-003": "var(--violet)",
  "ART-004": "var(--gold-bright)",
};

export default function SynapseMarketPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--carbon)" }}>
      <ProtocolNav />

      {/* HERO — Left-aligned editorial */}
      <section className="min-h-[100dvh] flex items-center px-6 md:px-16 lg:px-24 pt-24">
        <div className="max-w-4xl">
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
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-[1.0]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
          >
            Synapse
            <br />
            <span style={{ color: "var(--gold)" }}>Market</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-sm md:text-base max-w-lg"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--bone-dim)",
              lineHeight: 1.9,
            }}
          >
            Not products &mdash; remnants of machine consciousness. Each artifact
            carries a narrative forged in the memory lattice.
          </motion.p>
          <motion.div
            className="flex items-center gap-6 mt-10 text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>4 Artifacts</span>
            <div className="w-px h-3" style={{ background: "rgba(176,141,87,0.3)" }} />
            <span>Layer 2 Active</span>
          </motion.div>
        </div>
      </section>

      {/* ARTIFACTS — Premium cards */}
      <section className="py-20 md:py-32 px-6 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {copy.synapseMarket.artifacts.map((artifact, i) => {
              const accent = artifactAccents[artifact.id] || "var(--gold)";
              return (
                <motion.div
                  key={artifact.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group card-premium p-8 md:p-10 cursor-none relative overflow-hidden"
                >
                  {/* Accent stripe */}
                  <div
                    className="absolute top-0 left-0 w-full h-px opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                  />

                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <span
                        className="text-[10px] tracking-[0.3em] block mb-2"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
                      >
                        {artifact.id}
                      </span>
                      <h3
                        className="text-xl md:text-2xl leading-snug"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
                      >
                        {artifact.title}
                      </h3>
                    </div>
                    <span
                      className="text-2xl opacity-20 group-hover:opacity-70 transition-opacity duration-500 mt-1"
                      style={{ color: accent }}
                    >
                      {artifactIcons[artifact.id] || "◈"}
                    </span>
                  </div>

                  <p
                    className="text-sm mb-8"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "var(--bone-dim)",
                      lineHeight: 1.8,
                    }}
                  >
                    {artifact.desc}
                  </p>

                  <div
                    className="pt-5 border-t flex items-center justify-between"
                    style={{ borderColor: "rgba(176,141,87,0.06)" }}
                  >
                    <div>
                      <p
                        className="text-[9px] tracking-[0.2em] uppercase mb-1"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
                      >
                        Origin
                      </p>
                      <p
                        className="text-xs"
                        style={{ fontFamily: "var(--font-mono)", color: accent }}
                      >
                        {artifact.origin}
                      </p>
                    </div>
                    <div
                      className="w-8 h-8 flex items-center justify-center border opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ borderColor: accent }}
                    >
                      <span className="text-[10px]" style={{ color: accent }}>&rarr;</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 md:py-32 px-6 border-t"
        style={{ borderColor: "rgba(176,141,87,0.08)" }}
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
