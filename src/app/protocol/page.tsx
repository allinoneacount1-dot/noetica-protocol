"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ProtocolNav from "@/components/navigation/ProtocolNav";
import GlitchText from "@/components/ui/GlitchText";
import { copy } from "@/lib/theme";

const layers = copy.protocol.layers;

export default function ProtocolPage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--carbon)" }}>
      <ProtocolNav />

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
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
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            ⟐ {copy.protocol.subtitle}
          </motion.p>
          <GlitchText
            text={copy.protocol.title}
            as="h1"
            className="text-5xl md:text-7xl mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm md:text-base max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--bone-dim)",
              lineHeight: 1.9,
            }}
          >
            {copy.protocol.description}
          </motion.p>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl mb-10"
                style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
              >
                Intelligence Layers
              </motion.h2>

              <div className="space-y-3">
                {layers.map((layer, i) => (
                  <motion.div
                    key={i}
                    className="p-5 md:p-6 border cursor-none transition-all duration-500"
                    style={{
                      borderColor:
                        activeLayer === i
                          ? "var(--gold)"
                          : "rgba(176,141,87,0.1)",
                      background:
                        activeLayer === i
                          ? "rgba(176,141,87,0.04)"
                          : "transparent",
                    }}
                    onMouseEnter={() => setActiveLayer(i)}
                    onMouseLeave={() => setActiveLayer(null)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 6 }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="text-xs mt-0.5 shrink-0"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color:
                            activeLayer === i
                              ? "var(--gold)"
                              : "var(--glacial-dim)",
                          transition: "color 0.3s",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3
                          className="text-base md:text-lg mb-1"
                          style={{
                            fontFamily: "var(--font-serif)",
                            color: "var(--bone)",
                          }}
                        >
                          {layer.name}
                        </h3>
                        <p
                          className="text-xs md:text-sm"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: "var(--glacial-dim)",
                            lineHeight: 1.6,
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
                    className="absolute border"
                    style={{
                      borderColor:
                        activeLayer === i
                          ? "var(--gold)"
                          : "rgba(176,141,87,0.12)",
                      top: `${10 + i * 15}%`,
                      left: `${10 + i * 15}%`,
                      right: `${10 + i * 15}%`,
                      bottom: `${10 + i * 15}%`,
                      transition: "border-color 0.5s",
                    }}
                    animate={{
                      rotate: activeLayer === i ? 45 : i * 5,
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
                        "0 0 30px var(--gold), 0 0 60px rgba(176,141,87,0.3)",
                        "0 0 10px var(--gold)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>

                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={`line-${i}`}
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                      width: 1,
                      height: `${25 + i * 10}%`,
                      background: "var(--gold-dim)",
                      transformOrigin: "top center",
                    }}
                    animate={{
                      rotate: activeLayer === i ? i * 90 : i * 90 + 10,
                      opacity: activeLayer === i ? 0.8 : 0.15,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                ))}

                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={`label-${i}`}
                    className="absolute text-[10px] tracking-widest uppercase"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color:
                        activeLayer === i
                          ? "var(--gold)"
                          : "var(--glacial-dim)",
                      top: i < 2 ? `${8 + i * 15}%` : "auto",
                      bottom: i >= 2 ? `${8 + (3 - i) * 15}%` : "auto",
                      left: i % 2 === 0 ? "5%" : "auto",
                      right: i % 2 === 1 ? "5%" : "auto",
                      transition: "color 0.3s",
                    }}
                  >
                    {layers[i]?.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
