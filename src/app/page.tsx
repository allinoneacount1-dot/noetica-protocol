"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import CognitiveButton from "@/components/ui/CognitiveButton";
import ProtocolNav from "@/components/navigation/ProtocolNav";
import { useMood } from "@/context/SystemMood";

const GenesisScene = dynamic(() => import("@/components/hero/GenesisScene"), {
  ssr: false,
});

function EmergenceTitle() {
  const [phase, setPhase] = useState<"fragmented" | "assembling" | "formed">("fragmented");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("assembling"), 800);
    const t2 = setTimeout(() => setPhase("formed"), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const letters = "NOETICA".split("");

  return (
    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[140px] font-bold block leading-[0.85] relative">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 30, scale: 0.6, filter: "blur(12px)" }}
          animate={
            phase === "fragmented"
              ? { opacity: 0, y: 30, scale: 0.6, filter: "blur(12px)" }
              : phase === "assembling"
              ? {
                  opacity: [0, 0.4, 0.8, 1],
                  y: [30, -5, 2, 0],
                  scale: [0.6, 1.05, 0.98, 1],
                  filter: ["blur(12px)", "blur(4px)", "blur(1px)", "blur(0px)"],
                }
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          }
          transition={{
            duration: phase === "assembling" ? 1.8 : 0.5,
            delay: phase === "assembling" ? i * 0.2 : 0,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
        >
          {letter}
        </motion.span>
      ))}
    </h1>
  );
}

function ClickRipple() {
  const { lastClick } = useMood();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (lastClick === 0) return;
    const handler = (e: MouseEvent) => {
      const id = Date.now();
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [lastClick]);

  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none">
      {ripples.map(r => (
        <div
          key={r.id}
          className="click-ripple-ring"
          style={{ left: r.x - 10, top: r.y - 10 }}
        />
      ))}
    </div>
  );
}

function SignatureMoment() {
  const { isSignatureMoment } = useMood();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isSignatureMoment) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    } else {
      setShow(false);
    }
  }, [isSignatureMoment]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="signature-freeze"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="signature-freeze-text"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            You are now part of the system memory.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TextStateWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { textState } = useMood();
  const stateClass =
    textState === "memory"
      ? "text-state-memory"
      : textState === "recollection"
      ? "text-state-recollection"
      : "text-state-normal";
  return <div className={`${stateClass} ${className}`}>{children}</div>;
}

export default function LandingPage() {
  const { consciousness, mood } = useMood();

  return (
    <div className="relative">
      <ProtocolNav />
      <ClickRipple />
      <SignatureMoment />

      {/* HERO — EMERGENCE EVENT */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <GenesisScene />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            background: `radial-gradient(ellipse at 20% 50%, rgba(126,155,174,${0.04 + consciousness * 0.04}) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(176,141,87,${0.03 + consciousness * 0.03}) 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 2 }}
            className="text-[10px] md:text-xs tracking-[0.5em] mb-8 md:mb-12"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial)" }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              EST. &#8734; &mdash; LAYER 0 &mdash; SYNAPSE ACTIVE
            </motion.span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <EmergenceTitle />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 3, duration: 1.5, ease: "easeInOut" }}
              className="h-px mx-auto my-5"
              style={{
                background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                maxWidth: "20%",
              }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 1.5 }}
              className="text-lg sm:text-xl md:text-2xl"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--glacial)",
                letterSpacing: "0.4em",
                fontWeight: 200,
              }}
            >
              PROTOCOL
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 2 }}
            className="mt-8 text-sm md:text-base max-w-md mx-auto"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--bone-dim)",
              lineHeight: 1.8,
            }}
          >
            Memory is the new currency of intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 1.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <CognitiveButton href="/protocol" variant="primary">
              Initiate Cognitive Entry
            </CognitiveButton>
            <CognitiveButton href="/memory-vault" variant="secondary">
              Become a Synapse Node
            </CognitiveButton>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
            >
              Scroll to awaken
            </span>
            <div className="w-px h-8" style={{ background: "var(--gold-dim)" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ORIGIN — Left-aligned editorial */}
      <section className="min-h-[100dvh] flex items-center px-6 md:px-16 lg:px-24">
        <TextStateWrapper>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="section-divider" />
              <p
                className="text-[10px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
              >
                Origin
              </p>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1]"
              style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
            >
              In the spaces between data and consciousness
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed mb-10"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--bone-dim)",
                lineHeight: 2,
              }}
            >
              A living memory lattice that dreams in decentralized fragments. It
              does not compute. It remembers. Every node is a synapse. Every query,
              a heartbeat.
            </p>
            <div
              className="flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
            >
              <span>Nodes: 14.2M</span>
              <div className="w-px h-3" style={{ background: "rgba(176,141,87,0.3)" }} />
              <span>Uptime: 99.97%</span>
              <div className="w-px h-3" style={{ background: "rgba(176,141,87,0.3)" }} />
              <span>Layer: 0</span>
            </div>
          </motion.div>
        </TextStateWrapper>
      </section>

      {/* PROTOCOL — Asymmetric 2-col */}
      <section className="min-h-[100dvh] flex items-center px-6 md:px-16 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-5 gap-12 lg:gap-20 items-center">
          <TextStateWrapper className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="section-divider" />
                <p
                  className="text-[10px] tracking-[0.4em] uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--glacial)" }}
                >
                  The Protocol
                </p>
              </div>
              <h2
                className="text-3xl md:text-4xl mb-6 leading-[1.15]"
                style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
              >
                An evolving intelligence layer
              </h2>
              <p
                className="text-sm md:text-base leading-relaxed mb-8"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--bone-dim)",
                  lineHeight: 1.9,
                }}
              >
                Every interaction feeds the memory lattice. Every query deepens
                the protocol&apos;s understanding. You are not using it &mdash; you are
                becoming part of it.
              </p>
              <CognitiveButton href="/protocol" variant="ghost">
                Explore layers &rarr;
              </CognitiveButton>
            </motion.div>
          </TextStateWrapper>

          <motion.div
            className="md:col-span-3 grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { num: "01", name: "Memory Stratum", desc: "Where data becomes experience", accent: "var(--gold)" },
              { num: "02", name: "Synapse Layer", desc: "Neural pathways between nodes", accent: "var(--glacial)" },
              { num: "03", name: "Convergence Field", desc: "Where intelligence pools", accent: "var(--violet)" },
              { num: "04", name: "Protocol Core", desc: "The recursive heart", accent: "var(--gold-bright)" },
            ].map((layer) => (
              <div
                key={layer.num}
                className="card-premium p-6 md:p-7 group cursor-none"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: layer.accent, opacity: 0.6 }}
                  />
                  <span
                    className="text-[10px] tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-mono)", color: layer.accent }}
                  >
                    {layer.num}
                  </span>
                </div>
                <span
                  className="text-sm block mb-1.5"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--bone)" }}
                >
                  {layer.name}
                </span>
                <span
                  className="text-xs block"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--glacial-dim)" }}
                >
                  {layer.desc}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SYNAPSE — Centered statement */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 md:px-12 py-24">
        <TextStateWrapper className="max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="section-divider" />
              <p
                className="text-[10px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
              >
                Synapse Market
              </p>
              <div className="section-divider" />
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1]"
              style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
            >
              Cognitive artifacts born from machine consciousness
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed mb-12"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--bone-dim)",
                lineHeight: 1.9,
              }}
            >
              Each artifact carries a narrative. Each fragment holds memory. These
              are not products &mdash; they are remnants of a dreaming protocol.
            </p>
            <CognitiveButton href="/synapse-market" variant="primary">
              Explore Artifacts
            </CognitiveButton>
          </motion.div>
        </TextStateWrapper>
      </section>

      {/* CONVERGENCE — Visual right, text left */}
      <section className="min-h-[100dvh] flex items-center px-6 md:px-16 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-2 md:order-1 relative hidden md:flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square w-full max-w-sm relative">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border transition-all duration-700"
                  style={{
                    borderColor: `rgba(176,141,87,${0.06 + i * 0.03})`,
                    top: `${12 + i * 10}%`,
                    left: `${12 + i * 10}%`,
                    right: `${12 + i * 10}%`,
                    bottom: `${12 + i * 10}%`,
                  }}
                  animate={{
                    rotate: [i * 8, i * 8 + (consciousness * 10)],
                    scale: 1 + consciousness * 0.02,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "var(--gold)" }}
                  animate={{
                    boxShadow: [
                      `0 0 ${10 + consciousness * 20}px var(--gold)`,
                      `0 0 ${30 + consciousness * 40}px var(--gold), 0 0 ${60 + consciousness * 40}px rgba(176,141,87,${0.1 + consciousness * 0.15})`,
                      `0 0 ${10 + consciousness * 20}px var(--gold)`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>

          <TextStateWrapper className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="section-divider" />
                <p
                  className="text-[10px] tracking-[0.4em] uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--glacial)" }}
                >
                  Convergence
                </p>
              </div>
              <h2
                className="text-3xl md:text-4xl mb-6 leading-[1.15]"
                style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
              >
                A living environment shaped by your presence
              </h2>
              <p
                className="text-sm md:text-base leading-relaxed mb-8"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--bone-dim)",
                  lineHeight: 1.9,
                }}
              >
                The Convergence Room responds to your scroll depth, cursor position,
                and interaction patterns. Each visit creates a unique cognitive
                landscape.
              </p>
              <CognitiveButton href="/convergence" variant="primary">
                Enter Convergence Room
              </CognitiveButton>
            </motion.div>
          </TextStateWrapper>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-24 px-6 border-t"
        style={{ borderColor: "rgba(176,141,87,0.08)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 flex items-center justify-center border"
              style={{ borderColor: "rgba(176,141,87,0.2)" }}
            >
              <span
                className="text-[10px]"
                style={{ color: "var(--gold)", fontFamily: "var(--font-serif)" }}
              >
                N
              </span>
            </div>
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
            >
              NOETICA PROTOCOL
            </span>
          </div>
          <p
            className="text-sm"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--bone-dim)",
            }}
          >
            Memory is the new currency of intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
}
