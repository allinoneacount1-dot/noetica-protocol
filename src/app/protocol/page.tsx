"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ProtocolNav from "@/components/navigation/ProtocolNav";
import { copy } from "@/lib/theme";

const layers = copy.protocol.layers;

export default function ProtocolPage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--carbon)" }}>
      <ProtocolNav />

      {/* HERO — Left-aligned */}
      <section className="min-h-[100dvh] flex items-center px-6 md:px-16 lg:px-24 pt-24">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            The Protocol
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-[1.0]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
          >
            Intelligence
            <br />
            <span style={{ color: "var(--glacial)" }}>Layers</span>
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
            NOETICA is not software. It is an evolving intelligence layer.
          </motion.p>
        </div>
      </section>

      {/* LAYERS — Interactive visualization */}
      <section className="py-20 md:py-32 px-6 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <div className="space-y-3">
              {layers.map((layer, i) => (
                <motion.div
                  key={i}
                  className="p-6 md:p-7 border transition-all duration-500 cursor-none group relative overflow-hidden"
                  style={{
                    borderColor: activeLayer === i ? "var(--gold)" : "rgba(176,141,87,0.08)",
                    background: activeLayer === i ? "rgba(176,141,87,0.03)" : "transparent",
                  }}
                  onMouseEnter={() => setActiveLayer(i)}
                  onMouseLeave={() => setActiveLayer(null)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 8 }}
                >
                  {/* Left accent */}
                  <div
                    className="absolute top-0 left-0 w-px h-full transition-opacity duration-500"
                    style={{
                      background: activeLayer === i ? "var(--gold)" : "rgba(176,141,87,0.08)",
                      opacity: activeLayer === i ? 1 : 0,
                    }}
                  />
                  <div className="flex items-start gap-5">
                    <span
                      className="text-xs mt-0.5 shrink-0"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: activeLayer === i ? "var(--gold)" : "var(--glacial-dim)",
                        transition: "color 0.3s",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="text-lg md:text-xl mb-2"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
                      >
                        {layer.name}
                      </h3>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "var(--font-sans)",
                          color: "var(--glacial-dim)",
                          lineHeight: 1.7,
                        }}
                      >
                        {layer.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visualization */}
          <motion.div
            className="relative hidden md:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square w-full max-w-md relative">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border transition-all duration-700"
                  style={{
                    borderColor: activeLayer === i ? "var(--gold)" : "rgba(176,141,87,0.08)",
                    top: `${10 + i * 15}%`,
                    left: `${10 + i * 15}%`,
                    right: `${10 + i * 15}%`,
                    bottom: `${10 + i * 15}%`,
                  }}
                  animate={{
                    rotate: activeLayer === i ? 45 : i * 5,
                    scale: activeLayer === i ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "var(--gold)" }}
                  animate={{
                    boxShadow: [
                      "0 0 10px var(--gold)",
                      "0 0 40px var(--gold), 0 0 80px rgba(176,141,87,0.2)",
                      "0 0 10px var(--gold)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`label-${i}`}
                  className="absolute text-[10px] tracking-widest uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: activeLayer === i ? "var(--gold)" : "var(--glacial-dim)",
                    top: i < 2 ? `${8 + i * 15}%` : "auto",
                    bottom: i >= 2 ? `${8 + (3 - i) * 15}%` : "auto",
                    left: i % 2 === 0 ? "2%" : "auto",
                    right: i % 2 === 1 ? "2%" : "auto",
                    transition: "color 0.3s",
                  }}
                >
                  {layers[i]?.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
