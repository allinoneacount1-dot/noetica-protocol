"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface CognitiveButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export default function CognitiveButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: CognitiveButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    setIsProcessing(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples((prev) => [...prev, { id: Date.now(), x, y }]);

    setTimeout(() => setIsProcessing(false), 600);
    onClick?.();
  };

  const baseStyles =
    "relative overflow-hidden transition-all duration-500 cursor-none select-none";

  const variants = {
    primary:
      "px-8 py-4 border text-sm tracking-[0.2em] uppercase",
    secondary:
      "px-8 py-4 border border-transparent text-sm tracking-[0.2em] uppercase",
    ghost:
      "px-6 py-3 text-sm tracking-[0.15em] uppercase",
  };

  const variantStyles = {
    primary: {
      borderColor: "var(--gold)",
      color: "var(--bone)",
      background: "rgba(176, 141, 87, 0.08)",
    },
    secondary: {
      borderColor: "var(--glacial-dim)",
      color: "var(--glacial)",
      background: "transparent",
    },
    ghost: {
      color: "var(--bone-dim)",
      background: "transparent",
    },
  };

  const content = (
    <motion.span
      className={`${baseStyles} ${variants[variant]} ${className} inline-flex items-center justify-center`}
      style={variantStyles[variant]}
      whileHover={{
        scale: 1.02,
        boxShadow: variant === "primary" ? "0 0 30px rgba(176,141,87,0.15)" : "none",
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      animate={{
        opacity: isProcessing ? 0.7 : 1,
      }}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            background: "var(--gold)",
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => {
            setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
          }}
        />
      ))}

      <span className="relative z-10 flex items-center gap-3">
        {isProcessing && (
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            className="absolute bottom-0 left-0 h-px"
            style={{ background: "var(--gold)" }}
          />
        )}
        {children}
        <motion.span
          animate={{ x: isProcessing ? [0, 5, 0] : 0 }}
          transition={{ repeat: isProcessing ? Infinity : 0, duration: 0.4 }}
        >
          →
        </motion.span>
      </span>
    </motion.span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
