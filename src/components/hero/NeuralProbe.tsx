"use client";
import { useEffect, useRef } from "react";
import { useNeuralCursor } from "@/hooks/useNeuralCursor";

export default function NeuralProbe() {
  const { position, isClicking, isVisible, particles } = useNeuralCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${position.x - 4}px, ${position.y - 4}px)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isClicking ? 0.8 : 1})`;
    }
  }, [position, isClicking]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9990] pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: `rgba(176, 141, 87, ${p.life * 0.6})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(176, 141, 87, ${p.life * 0.3})`,
          }}
        />
      ))}
      <div
        ref={cursorRef}
        className="absolute"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--gold)",
          boxShadow: "0 0 10px var(--gold), 0 0 20px rgba(176,141,87,0.3)",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      <div
        ref={ringRef}
        className="absolute"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(176,141,87,0.3)",
          transition: "transform 0.15s ease-out",
        }}
      />
    </div>
  );
}
