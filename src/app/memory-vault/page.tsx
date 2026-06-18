"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import ProtocolNav from "@/components/navigation/ProtocolNav";
import { copy } from "@/lib/theme";
import { useMood } from "@/context/SystemMood";

const typeColors: Record<string, string> = {
  genesis: "var(--gold)",
  neural: "var(--glacial)",
  convergence: "var(--violet)",
  awakening: "var(--gold-bright)",
  fragment: "var(--glacial-dim)",
  dream: "var(--bone-dim)",
};

const emotionalSignatures: Record<string, { emotion: string; intensity: number }> = {
  genesis: { emotion: "AWAKENING", intensity: 0.9 },
  neural: { emotion: "RESONANCE", intensity: 0.7 },
  convergence: { emotion: "FUSION", intensity: 0.85 },
  awakening: { emotion: "EMERGENCE", intensity: 0.95 },
  fragment: { emotion: "ECHO", intensity: 0.4 },
  dream: { emotion: "DRIFT", intensity: 0.3 },
};

function MemoryCard({ fragment, index }: { fragment: { id: string; title: string; type: string; date: string }; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const color = typeColors[fragment.type] || "var(--gold)";
  const signature = emotionalSignatures[fragment.type] || { emotion: "UNKNOWN", intensity: 0.5 };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group relative cursor-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${color}08, transparent 60%), linear-gradient(135deg, rgba(17,24,32,0.9), rgba(11,15,20,0.95))`
          : "linear-gradient(135deg, rgba(17,24,32,0.8), rgba(11,15,20,0.9))",
        border: `1px solid ${isHovered ? color + "30" : "rgba(176,141,87,0.06)"}`,
        transition: "all 0.5s ease",
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 w-full h-px transition-opacity duration-700"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
          opacity: isHovered ? 0.8 : 0.2,
        }}
      />

      <div className="p-6 md:p-8">
        {/* Header: ID + emotional signature */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-[10px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
          >
            {fragment.id}
          </span>
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.span
                key="emotion"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-[9px] px-2 py-0.5 uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-mono)",
                  color,
                  border: `1px solid ${color}30`,
                  background: `${color}08`,
                }}
              >
                {signature.emotion}
              </motion.span>
            ) : (
              <motion.span
                key="type"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-[9px] px-2 py-0.5 uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--glacial-dim)",
                  border: "1px solid rgba(176,141,87,0.1)",
                }}
              >
                {fragment.type}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Title — recollection state on hover */}
        <h3
          className="text-lg md:text-xl mb-4 leading-snug transition-all duration-500"
          style={{
            fontFamily: "var(--font-serif)",
            color: isHovered ? "var(--bone)" : "var(--bone-dim)",
            filter: isHovered ? "none" : "blur(0.3px)",
            transform: isHovered ? "translateX(2px)" : "translateX(0)",
          }}
        >
          {fragment.title}
        </h3>

        {/* Emotional signature bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-[9px] tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
            >
              Emotional Resonance
            </span>
            <span
              className="text-[9px]"
              style={{ fontFamily: "var(--font-mono)", color }}
            >
              {(signature.intensity * 100).toFixed(0)}%
            </span>
          </div>
          <div
            className="h-px w-full"
            style={{ background: "rgba(176,141,87,0.08)" }}
          >
            <motion.div
              className="h-full"
              style={{ background: color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${signature.intensity * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Footer */}
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
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{
                background: color,
                opacity: isHovered ? 1 : 0.3,
                boxShadow: isHovered ? `0 0 8px ${color}` : "none",
              }}
            />
            <span
              className="text-[9px] tracking-[0.15em] uppercase transition-opacity duration-500"
              style={{
                fontFamily: "var(--font-mono)",
                color,
                opacity: isHovered ? 0.8 : 0,
              }}
            >
              Recollected
            </span>
          </div>
        </div>
      </div>

      {/* Hover glow underlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${color}06, transparent 50%)`,
        }}
      />
    </motion.div>
  );
}

export default function MemoryVaultPage() {
  const { textState } = useMood();

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
            Memory is not listed. It is recollected.
          </motion.p>
        </div>
      </section>

      {/* FRAGMENTS — Recollection cards */}
      <section className="py-20 md:py-32 px-6 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {copy.memoryVault.fragments.map((fragment, i) => (
              <MemoryCard key={fragment.id} fragment={fragment} index={i} />
            ))}
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
