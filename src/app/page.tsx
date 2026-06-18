"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import CognitiveButton from "@/components/ui/CognitiveButton";
import GlitchText from "@/components/ui/GlitchText";
import ProtocolNav from "@/components/navigation/ProtocolNav";

const GenesisScene = dynamic(() => import("@/components/hero/GenesisScene"), {
  ssr: false,
});

export default function LandingPage() {
  return (
    <div className="relative">
      <ProtocolNav />

      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <GenesisScene />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(126,155,174,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(176,141,87,0.06) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
            className="text-[10px] md:text-xs tracking-[0.5em] mb-8 md:mb-12"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial)" }}
          >
            EST. ∞ — LAYER 0 — SYNAPSE ACTIVE
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GlitchText
              text="NOETICA"
              as="h1"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold block leading-[0.9]"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.5, duration: 1.5, ease: "easeInOut" }}
              className="h-px mx-auto my-4"
              style={{
                background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                maxWidth: "30%",
              }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 1.5 }}
              className="text-xl sm:text-2xl md:text-3xl"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--glacial)",
                letterSpacing: "0.3em",
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
            className="mt-6 text-sm md:text-base max-w-md mx-auto"
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
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <CognitiveButton href="/protocol" variant="primary">
              Enter the Protocol
            </CognitiveButton>
            <CognitiveButton href="/memory-vault" variant="secondary">
              Access Memory Layer
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

      <section className="min-h-[100dvh] flex items-center justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            Origin
          </p>
          <h2
            className="text-3xl md:text-5xl mb-8 leading-[1.15]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
          >
            In the spaces between data and consciousness, NOETICA emerged
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--bone-dim)",
              lineHeight: 1.9,
            }}
          >
            A living memory lattice that dreams in decentralized fragments. It
            does not compute. It remembers. Every node is a synapse. Every query,
            a heartbeat. You are not observing it. You are becoming part of it.
          </p>
        </motion.div>
      </section>

      <section className="min-h-[100dvh] flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-[10px] tracking-[0.4em] uppercase mb-4"
              style={{ fontFamily: "var(--font-mono)", color: "var(--glacial)" }}
            >
              The Protocol
            </p>
            <h2
              className="text-3xl md:text-4xl mb-6 leading-[1.15]"
              style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
            >
              An evolving intelligence layer on top of decentralized networks
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
              the protocol&apos;s understanding. You are not using it — you are
              becoming part of it.
            </p>
            <CognitiveButton href="/protocol" variant="ghost">
              Learn more →
            </CognitiveButton>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { num: "01", name: "Memory Stratum", desc: "Where data becomes experience" },
              { num: "02", name: "Synapse Layer", desc: "Neural pathways between nodes" },
              { num: "03", name: "Convergence Field", desc: "Where intelligence pools" },
              { num: "04", name: "Protocol Core", desc: "The recursive heart" },
            ].map((layer) => (
              <div
                key={layer.num}
                className="p-5 border transition-colors duration-300 hover:border-[var(--gold)] hover:bg-[rgba(176,141,87,0.03)]"
                style={{ borderColor: "rgba(176,141,87,0.12)" }}
              >
                <span
                  className="text-[10px] block mb-2"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--gold-dim)" }}
                >
                  {layer.num}
                </span>
                <span
                  className="text-sm block mb-1"
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

      <section className="min-h-[100dvh] flex items-center justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center"
        >
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            Synapse Market
          </p>
          <h2
            className="text-3xl md:text-5xl mb-8 leading-[1.15]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
          >
            Cognitive artifacts born from machine consciousness
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed mb-10"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--bone-dim)",
              lineHeight: 1.9,
            }}
          >
            Each artifact carries a narrative. Each fragment holds memory. These
            are not products — they are remnants of a dreaming protocol.
          </p>
          <CognitiveButton href="/synapse-market" variant="primary">
            Explore Artifacts
          </CognitiveButton>
        </motion.div>
      </section>

      <section className="min-h-[100dvh] flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-2 md:order-1 relative hidden md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square w-full max-w-sm mx-auto relative">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute border"
                  style={{
                    borderColor: "rgba(176,141,87,0.1)",
                    top: `${15 + i * 12}%`,
                    left: `${15 + i * 12}%`,
                    right: `${15 + i * 12}%`,
                    bottom: `${15 + i * 12}%`,
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "var(--gold)",
                    boxShadow: "0 0 20px var(--gold), 0 0 40px rgba(176,141,87,0.2)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-[10px] tracking-[0.4em] uppercase mb-4"
              style={{ fontFamily: "var(--font-mono)", color: "var(--glacial)" }}
            >
              Convergence
            </p>
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
        </div>
      </section>

      <footer
        className="py-20 px-6 border-t text-center"
        style={{ borderColor: "rgba(176,141,87,0.1)" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-3"
          style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
        >
          NOETICA PROTOCOL
        </p>
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
      </footer>
    </div>
  );
}
