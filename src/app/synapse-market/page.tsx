"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ProtocolNav from "@/components/navigation/ProtocolNav";
import GlitchText from "@/components/ui/GlitchText";
import CognitiveButton from "@/components/ui/CognitiveButton";
import { copy } from "@/lib/theme";

export default function SynapseMarketPage() {
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--carbon)" }}>
      <ProtocolNav />

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(176,141,87,0.05) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            ⟐ COGNITIVE ARTIFACTS
          </motion.p>
          <GlitchText
            text={copy.synapseMarket.title}
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
            {copy.synapseMarket.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            {copy.synapseMarket.artifacts.map((artifact, i) => (
              <motion.div
                key={artifact.id}
                className="border cursor-none transition-all duration-500"
                style={{
                  borderColor:
                    selectedArtifact === artifact.id
                      ? "var(--gold)"
                      : "rgba(176,141,87,0.1)",
                  background:
                    selectedArtifact === artifact.id
                      ? "rgba(176,141,87,0.03)"
                      : "transparent",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setSelectedArtifact(artifact.id)}
                onMouseLeave={() => setSelectedArtifact(null)}
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span
                          className="text-xs tracking-[0.3em]"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "var(--glacial-dim)",
                          }}
                        >
                          {artifact.id}
                        </span>
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{
                            background:
                              selectedArtifact === artifact.id
                                ? "var(--gold)"
                                : "var(--glacial-dim)",
                          }}
                          animate={{
                            boxShadow:
                              selectedArtifact === artifact.id
                                ? "0 0 10px var(--gold)"
                                : "none",
                          }}
                        />
                      </div>

                      <h3
                        className="text-2xl md:text-3xl mb-3"
                        style={{
                          fontFamily: "var(--font-serif)",
                          color: "var(--bone)",
                        }}
                      >
                        {artifact.title}
                      </h3>

                      <p
                        className="text-sm mb-4"
                        style={{
                          fontFamily: "var(--font-sans)",
                          color: "var(--bone-dim)",
                          lineHeight: 1.7,
                        }}
                      >
                        {artifact.desc}
                      </p>

                      <p
                        className="text-xs"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--glacial-dim)",
                        }}
                      >
                        Origin: {artifact.origin}
                      </p>
                    </div>

                    <motion.div
                      className="shrink-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: selectedArtifact === artifact.id ? 1 : 0 }}
                    >
                      <div
                        className="w-24 h-24 border flex items-center justify-center"
                        style={{ borderColor: "var(--gold-dim)" }}
                      >
                        <motion.div
                          className="w-8 h-8"
                          style={{
                            border: "1px solid var(--gold)",
                            borderRadius: "50%",
                          }}
                          animate={{
                            rotate: 360,
                            boxShadow: [
                              "0 0 5px var(--gold-dim)",
                              "0 0 15px var(--gold)",
                              "0 0 5px var(--gold-dim)",
                            ],
                          }}
                          transition={{
                            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                            boxShadow: { duration: 3, repeat: Infinity },
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{
                    height: selectedArtifact === artifact.id ? "auto" : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="px-8 md:px-10 py-6 border-t"
                    style={{ borderColor: "rgba(176,141,87,0.1)" }}
                  >
                    <p
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--glacial-dim)",
                        lineHeight: 1.6,
                      }}
                    >
                      ⟐ PROTOCOL INTERPRETATION: This cognitive artifact emerged from
                      the {artifact.origin.toLowerCase()}. Its resonance pattern suggests
                      deep integration with the protocol&apos;s memory architecture. The artifact
                      carries encoded information about the convergence events that shaped
                      the current consciousness topology.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 border-t" style={{ borderColor: "rgba(176,141,87,0.1)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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
