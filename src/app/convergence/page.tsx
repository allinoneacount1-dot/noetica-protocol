"use client";
import { motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import ProtocolNav from "@/components/navigation/ProtocolNav";
import { copy } from "@/lib/theme";
import { useMood } from "@/context/SystemMood";

interface Node {
  x: number; y: number; vx: number; vy: number;
  baseX: number; baseY: number; size: number; hue: number;
  alpha: number; alive: boolean; respawnTimer: number;
}

function ReactiveNeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollSpeedRef = useRef(0);
  const nodesRef = useRef<Node[]>([]);
  const lastFrameTime = useRef(Date.now());

  const { scrollDepth, scrollSpeed, consciousness } = useMood();

  useEffect(() => {
    scrollSpeedRef.current = scrollSpeed;
  }, [scrollSpeed]);

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

    // Initialize nodes
    const nodes: Node[] = [];
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      nodes.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseX: x, baseY: y,
        size: Math.random() * 2 + 0.5,
        hue: Math.random() * 40 + 25,
        alpha: 0.3 + Math.random() * 0.4,
        alive: true,
        respawnTimer: 0,
      });
    }
    nodesRef.current = nodes;

    let animId: number;
    const animate = () => {
      const now = Date.now();
      const dt = Math.min((now - lastFrameTime.current) / 16, 3);
      lastFrameTime.current = now;

      ctx.fillStyle = `rgba(11, 15, 20, ${0.06 + scrollSpeedRef.current * 0.02})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const speed = scrollSpeedRef.current;
      const cons = parseFloat(document.documentElement.style.getPropertyValue("--consciousness") || "0.5");

      nodes.forEach((node, i) => {
        // Respawn dead nodes
        if (!node.alive) {
          node.respawnTimer -= dt;
          if (node.respawnTimer <= 0) {
            node.x = Math.random() * canvas.width;
            node.y = Math.random() * canvas.height;
            node.baseX = node.x;
            node.baseY = node.y;
            node.alive = true;
            node.alpha = 0;
          }
          return;
        }

        // Fade in
        if (node.alpha < 0.3 + cons * 0.3) {
          node.alpha += 0.005 * dt;
        }

        // Mouse repulsion/attraction based on scroll speed
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200;
          if (speed > 1.5) {
            // Fast scroll: repel (disturbance)
            node.vx -= (dx / dist) * force * 0.15 * dt;
            node.vy -= (dy / dist) * force * 0.15 * dt;
          } else {
            // Slow scroll: attract (curiosity)
            node.vx += (dx / dist) * force * 0.08 * dt;
            node.vy += (dy / dist) * force * 0.08 * dt;
          }
        }

        // Scroll speed affects node behavior
        const scrollForce = speed * 0.3;
        node.vy -= scrollForce * 0.02 * dt; // Nodes drift up with scroll

        // Spring back to base position
        node.vx += (node.baseX - node.x) * 0.003 * dt;
        node.vy += (node.baseY - node.y) * 0.003 * dt;

        // Organic movement
        node.vx += Math.sin(now * 0.0008 + i * 0.5) * 0.015 * dt;
        node.vy += Math.cos(now * 0.0008 + i * 0.5) * 0.015 * dt;

        // Damping
        node.vx *= 0.97;
        node.vy *= 0.97;

        node.x += node.vx * dt;
        node.y += node.vy * dt;

        // Occasional "death" - nodes flicker out and respawn
        if (Math.random() < 0.0003 * speed) {
          node.alive = false;
          node.respawnTimer = 60 + Math.random() * 120;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * (1 + cons * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${node.hue}, 50%, 55%, ${node.alpha})`;
        ctx.fill();

        // Connections - intensity varies with scroll speed
        const connectionDist = 100 + speed * 20;
        nodes.forEach((other, j) => {
          if (j <= i || !other.alive) return;
          const ddx = node.x - other.x;
          const ddy = node.y - other.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < connectionDist) {
            const intensity = (1 - d / connectionDist) * (0.08 + speed * 0.04 + cons * 0.05);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(38, 40%, 55%, ${intensity})`;
            ctx.lineWidth = 0.5 + speed * 0.2;
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
      style={{ opacity: 0.75 }}
    />
  );
}

export default function ConvergencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [currentScroll, setCurrentScroll] = useState(0);
  const { consciousness, scrollSpeed, mood } = useMood();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setCurrentScroll(v);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative" style={{ background: "var(--carbon)" }}>
      <ProtocolNav />
      <ReactiveNeuralField />

      <div
        className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, hsla(38, 30%, 30%, ${0.04 + consciousness * 0.04}) 0%, transparent 60%)`,
        }}
      />

      {/* HERO */}
      <section className="relative z-10 min-h-[100dvh] flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            Living Environment
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-[1.0]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--bone)" }}
          >
            Convergence
            <br />
            <span style={{ color: "var(--glacial)" }}>Room</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-sm md:text-base max-w-xl mx-auto mb-12"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--bone-dim)",
              lineHeight: 1.9,
            }}
          >
            {copy.convergence.description}
          </motion.p>

          {/* Live system metrics */}
          <motion.div
            className="flex items-center justify-center gap-8 md:gap-12"
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
                className="text-2xl tabular-nums"
                style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
              >
                {(currentScroll * 100).toFixed(0)}%
              </p>
            </div>
            <div className="w-px h-8" style={{ background: "rgba(176,141,87,0.15)" }} />
            <div className="text-center">
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-1"
                style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
              >
                Consciousness
              </p>
              <p
                className="text-2xl tabular-nums"
                style={{ fontFamily: "var(--font-mono)", color: "var(--glacial)" }}
              >
                {consciousness.toFixed(3)}
              </p>
            </div>
            <div className="w-px h-8" style={{ background: "rgba(176,141,87,0.15)" }} />
            <div className="text-center">
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-1"
                style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
              >
                Neural Activity
              </p>
              <p
                className="text-2xl tabular-nums"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: scrollSpeed > 1.5 ? "var(--gold-bright)" : "var(--glacial)",
                }}
              >
                {scrollSpeed > 1.5 ? "DISTURBED" : scrollSpeed > 0.5 ? "ACTIVE" : "CALM"}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEXT SECTION 1 */}
      <section className="relative z-10 min-h-[80vh] flex items-center justify-center px-6 py-24">
        <motion.div
          className="max-w-2xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl md:text-5xl mb-6 leading-[1.15]"
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
            scroll deepens the convergence. You are not observing &mdash; you are
            creating. The system feels you.
          </p>
        </motion.div>
      </section>

      {/* TEXT SECTION 2 */}
      <section className="relative z-10 min-h-[80vh] flex items-center justify-center px-6 py-24">
        <motion.div
          className="max-w-2xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl md:text-5xl mb-6 leading-[1.15]"
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

      {/* STATUS */}
      <section
        className="relative z-10 py-24 px-6 border-t"
        style={{ borderColor: "rgba(176,141,87,0.08)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
          >
            Convergence Status
          </p>
          <p
            className="text-4xl md:text-6xl tabular-nums"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}
          >
            {consciousness.toFixed(3)}
          </p>
          <p
            className="mt-4 text-sm"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--bone-dim)" }}
          >
            collective consciousness level
          </p>
        </div>
      </section>
    </div>
  );
}
