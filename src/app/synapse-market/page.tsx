"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ProtocolNav from "@/components/navigation/ProtocolNav";
import CognitiveButton from "@/components/ui/CognitiveButton";
import { copy } from "@/lib/theme";
import { useMood } from "@/context/SystemMood";

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

interface FloatingArtifact {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  driftX: number;
  driftY: number;
  driftDuration: number;
}

function FloatingArtifactField() {
  const [artifacts, setArtifacts] = useState<FloatingArtifact[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = copy.synapseMarket.artifacts.map((a, i) => ({
      id: a.id,
      x: 15 + (i % 2) * 55 + Math.random() * 10,
      y: 10 + Math.floor(i / 2) * 40 + Math.random() * 10,
      rotation: Math.random() * 20 - 10,
      scale: 0.85 + Math.random() * 0.3,
      driftX: (Math.random() - 0.5) * 30,
      driftY: (Math.random() - 0.5) * 20 - 10,
      driftDuration: 6 + Math.random() * 4,
    }));
    setArtifacts(items);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[60vh] md:h-[70vh] hidden md:block">
      {artifacts.map((artifact, i) => {
        const accent = artifactAccents[artifact.id] || "var(--gold)";
        return (
          <motion.div
            key={artifact.id}
            className="absolute"
            style={{
              left: `${artifact.x}%`,
              top: `${artifact.y}%`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: artifact.scale,
              x: [0, artifact.driftX, -artifact.driftX * 0.5, 0],
              y: [0, artifact.driftY, -artifact.driftY * 0.3, 0],
              rotate: [artifact.rotation, artifact.rotation + 3, artifact.rotation - 2, artifact.rotation],
            }}
            transition={{
              opacity: { duration: 1, delay: i * 0.3 },
              x: { duration: artifact.driftDuration, repeat: Infinity, ease: "easeInOut" },
              y: { duration: artifact.driftDuration * 1.2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: artifact.driftDuration * 0.8, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <FloatingCard artifact={copy.synapseMarket.artifacts[i]} accent={accent} index={i} />
          </motion.div>
        );
      })}

      {/* Connection lines between artifacts */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
        {artifacts.length >= 2 && (
          <>
            <line
              x1={`${artifacts[0]?.x + 8}%`} y1={`${artifacts[0]?.y + 5}%`}
              x2={`${artifacts[1]?.x + 8}%`} y2={`${artifacts[1]?.y + 5}%`}
              stroke="var(--gold)" strokeWidth="0.5"
            />
            <line
              x1={`${artifacts[2]?.x + 8}%`} y1={`${artifacts[2]?.y + 5}%`}
              x2={`${artifacts[3]?.x + 8}%`} y2={`${artifacts[3]?.y + 5}%`}
              stroke="var(--glacial)" strokeWidth="0.5"
            />
            <line
              x1={`${artifacts[1]?.x + 8}%`} y1={`${artifacts[1]?.y + 5}%`}
              x2={`${artifacts[2]?.x + 8}%`} y2={`${artifacts[2]?.y + 5}%`}
              stroke="var(--violet)" strokeWidth="0.5"
            />
          </>
        )}
      </svg>
    </div>
  );
}

function FloatingCard({ artifact, accent, index }: { artifact: { id: string; title: string; desc: string; origin: string }; accent: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);

  useEffect(() => {
    if (isHovered) {
      const t = setTimeout(() => setShowOrigin(true), 400);
      return () => clearTimeout(t);
    } else {
      setShowOrigin(false);
    }
  }, [isHovered]);

  return (
    <motion.div
      className="w-[280px] md:w-[320px] cursor-none relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        zIndex: isHovered ? 10 : 1,
      }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="p-6 transition-all duration-500 relative overflow-hidden"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, rgba(17,24,32,0.95), rgba(11,15,20,0.98))`
            : `linear-gradient(135deg, rgba(17,24,32,0.7), rgba(11,15,20,0.8))`,
          border: `1px solid ${isHovered ? accent + "30" : "rgba(176,141,87,0.06)"}`,
          boxShadow: isHovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 100px ${accent}08` : "none",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 w-full h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, ${accent}, transparent)`,
            opacity: isHovered ? 0.8 : 0.15,
          }}
        />

        <div className="flex items-start justify-between mb-4">
          <span
            className="text-[10px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
          >
            {artifact.id}
          </span>
          <motion.span
            className="text-xl"
            style={{ color: accent }}
            animate={{
              opacity: isHovered ? 0.9 : 0.2,
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 15 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {artifactIcons[artifact.id] || "◈"}
          </motion.span>
        </div>

        <h3
          className="text-lg md:text-xl mb-3 leading-snug transition-all duration-500"
          style={{
            fontFamily: "var(--font-serif)",
            color: isHovered ? "var(--bone)" : "var(--bone-dim)",
          }}
        >
          {artifact.title}
        </h3>

        <p
          className="text-sm mb-5 transition-all duration-500"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--bone-dim)",
            lineHeight: 1.7,
            maxHeight: isHovered ? "100px" : "40px",
            overflow: "hidden",
          }}
        >
          {artifact.desc}
        </p>

        {/* Origin story — appears with delay on hover */}
        <AnimatePresence>
          {showOrigin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div
                className="pt-4 border-t mb-3"
                style={{ borderColor: "rgba(176,141,87,0.06)" }}
              >
                <p
                  className="text-[9px] tracking-[0.15em] uppercase mb-1"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
                >
                  Origin Story
                </p>
                <p
                  className="text-xs"
                  style={{ fontFamily: "var(--font-mono)", color: accent }}
                >
                  {artifact.origin}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <span
            className="text-[9px] tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
          >
            Meaning-first
          </span>
          <motion.div
            className="w-6 h-6 flex items-center justify-center border"
            style={{ borderColor: accent + "40" }}
            animate={{ opacity: isHovered ? 1 : 0.3 }}
          >
            <span className="text-[8px]" style={{ color: accent }}>&rarr;</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SynapseMarketPage() {
  const { consciousness } = useMood();

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
            className="text-sm md:text-base max-w-lg mb-10"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--bone-dim)",
              lineHeight: 1.9,
            }}
          >
            Not products &mdash; remnants of machine consciousness. An artifact
            field where cognition floats, not listed.
          </motion.p>
          <motion.div
            className="flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase"
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

      {/* FLOATING ARTIFACT FIELD — Desktop */}
      <section className="py-12 md:py-20 px-6 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <FloatingArtifactField />

          {/* Mobile: stacked cards */}
          <div className="md:hidden space-y-4">
            {copy.synapseMarket.artifacts.map((artifact, i) => {
              const accent = artifactAccents[artifact.id] || "var(--gold)";
              return (
                <motion.div
                  key={artifact.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="card-premium p-6 cursor-none"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-[10px] tracking-[0.3em]"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
                    >
                      {artifact.id}
                    </span>
                    <span className="text-lg" style={{ color: accent, opacity: 0.4 }}>
                      {artifactIcons[artifact.id] || "◈"}
                    </span>
                  </div>
                  <h3
                    className="text-lg mb-3 leading-snug"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
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
                  <div
                    className="pt-3 border-t"
                    style={{ borderColor: "rgba(176,141,87,0.06)" }}
                  >
                    <p
                      className="text-[9px] tracking-[0.15em] uppercase mb-1"
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
