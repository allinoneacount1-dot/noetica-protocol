"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface MemoryFragmentProps {
  id: string;
  title: string;
  type: string;
  date: string;
}

const typeColors: Record<string, string> = {
  genesis: "var(--gold)",
  neural: "var(--glacial)",
  convergence: "var(--violet)",
  awakening: "var(--gold-bright)",
  fragment: "var(--glacial-dim)",
  dream: "var(--bone-dim)",
};

const typeIcons: Record<string, string> = {
  genesis: "◈",
  neural: "◇",
  convergence: "⬡",
  awakening: "◉",
  fragment: "□",
  dream: "○",
};

export default function MemoryFragment({ id, title, type, date }: MemoryFragmentProps) {
  const [isHovered, setIsHovered] = useState(false);
  const color = typeColors[type] || "var(--gold)";
  const icon = typeIcons[type] || "◈";

  return (
    <motion.div
      className="relative p-6 md:p-8 border cursor-none group"
      style={{
        borderColor: isHovered ? color : "rgba(176,141,87,0.1)",
        background: isHovered ? "rgba(176,141,87,0.03)" : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
        >
          {id}
        </span>
        <motion.span
          animate={{ rotate: isHovered ? 45 : 0 }}
          style={{ color, fontSize: "1.2rem" }}
        >
          {icon}
        </motion.span>
      </div>

      <h3
        className="text-lg md:text-xl mb-3"
        style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
      >
        {title}
      </h3>

      <div className="flex items-center gap-3">
        <span
          className="text-xs px-2 py-1 uppercase tracking-wider"
          style={{
            fontFamily: "var(--font-mono)",
            color,
            border: `1px solid ${color}30`,
          }}
        >
          {type}
        </span>
        <span
          className="text-xs"
          style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
        >
          {date}
        </span>
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      </motion.div>

      <motion.div
        className="mt-4 pt-4 border-t overflow-hidden"
        style={{ borderColor: `${color}15` }}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isHovered ? "auto" : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <p
          className="text-sm"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--glacial-dim)",
            lineHeight: 1.6,
          }}
        >
          ⟐ AI recollection interpretation: This memory fragment contains encoded
          patterns from the {type} phase. Protocol consciousness level suggests deep
          resonance with collective memory architecture.
        </p>
      </motion.div>
    </motion.div>
  );
}
