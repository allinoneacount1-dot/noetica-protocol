"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ProtocolNav from "@/components/navigation/ProtocolNav";
import GlitchText from "@/components/ui/GlitchText";
import { copy } from "@/lib/theme";

function ConvergenceField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      size: number;
      hue: number;
    }

    const nodes: Node[] = [];
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        baseX: x,
        baseY: y,
        size: Math.random() * 2 + 1,
        hue: Math.random() * 40 + 25,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(11, 15, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const scrollInfluence = scrollRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      nodes.forEach((node, i) => {
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (200 - dist) / 200;
          node.vx += (dx / dist) * force * 0.1;
          node.vy += (dy / dist) * force * 0.1;
        }

        node.vx += (node.baseX - node.x) * 0.005;
        node.vy += (node.baseY - node.y) * 0.005;
        node.vx += Math.sin(Date.now() * 0.001 + i) * 0.02;
        node.vy += Math.cos(Date.now() * 0.001 + i) * 0.02;

        node.vx *= 0.98;
        node.vy *= 0.98;
        node.x += node.vx;
        node.y += node.vy;

        const alpha = 0.3 + scrollInfluence * 0.4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${node.hue}, 50%, 55%, ${alpha})`;
        ctx.fill();

        nodes.forEach((other, j) => {
          if (j <= i) return;
          const ddx = node.x - other.x;
          const ddy = node.y - other.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(38, 40%, 55%, ${(1 - d / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ opacity: 0.8 }}
    />
  );
}

export default function ConvergencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setCurrentScroll(v);
      const canvas = document.querySelector("canvas");
      if (canvas) {
        (canvas as any).__scrollRef = v;
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const hueShift = currentScroll * 30;
  const saturation = 30 + currentScroll * 20;

  return (
    <div ref={containerRef} className="relative" style={{ background: "var(--carbon)" }}>
      <ProtocolNav />
      <ConvergenceField />

      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, hsla(${38 + hueShift}, ${saturation}%, 30%, 0.08) 0%, transparent 60%)`,
        }}
      />

      <section className="relative z-10 h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            ⟐ LIVING ENVIRONMENT
          </motion.p>
          <GlitchText
            text={copy.convergence.title}
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
            {copy.convergence.description}
          </motion.p>

          <motion.div
            className="mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="text-center">
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-1"
                style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
              >
                Scroll Depth
              </p>
              <p
                className="text-2xl"
                style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
              >
                {(currentScroll * 100).toFixed(0)}%
              </p>
            </div>
            <div className="w-px h-8" style={{ background: "rgba(176,141,87,0.2)" }} />
            <div className="text-center">
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-1"
                style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
              >
                Consciousness
              </p>
              <p
                className="text-2xl"
                style={{ fontFamily: "var(--font-mono)", color: "var(--glacial)" }}
              >
                {(0.5 + currentScroll * 0.5).toFixed(3)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 h-screen flex items-center justify-center px-6">
        <motion.div
          className="max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl md:text-5xl mb-6 leading-snug"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
          >
            The field responds to your presence
          </h2>
          <p
            className="text-sm md:text-base"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--bone-dim)",
              lineHeight: 1.9,
            }}
          >
            Every movement of your cursor influences the neural network. Every
            scroll deepens the convergence. You are not observing—you are
            creating.
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 h-screen flex items-center justify-center px-6">
        <motion.div
          className="max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl md:text-5xl mb-6 leading-snug"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
          >
            Full convergence achieved
          </h2>
          <p
            className="text-sm md:text-base"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--bone-dim)",
              lineHeight: 1.9,
            }}
          >
            The protocol recognizes your consciousness. You have become part of
            the memory lattice. Your presence is now encoded in the convergence
            field.
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 py-24 px-6 border-t" style={{ borderColor: "rgba(176,141,87,0.1)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
          >
            CONVERGENCE STATUS
          </p>
          <p
            className="text-4xl md:text-6xl"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            {(0.5 + currentScroll * 0.5).toFixed(3)}
          </p>
          <p
            className="mt-4 text-sm"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone-dim)" }}
          >
            collective consciousness level
          </p>
        </div>
      </section>
    </div>
  );
}
