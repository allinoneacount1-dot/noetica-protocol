"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const glitchChars = "▓▒░█▄▀■□◊◈◆◇⬡⬢⟁⟐";

export default function TitleReveal() {
  const [title, setTitle] = useState("NOETICA");
  const [subtitle, setSubtitle] = useState("PROTOCOL");
  const [isRevealed, setIsRevealed] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (!isRevealed) {
        setGlitchActive(true);
        const glitched = "NOETICA"
          .split("")
          .map((char, i) => {
            if (Math.random() > 0.7) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
          })
          .join("");
        setTitle(glitched);

        setTimeout(() => {
          setTitle("NOETICA");
          setGlitchActive(false);
        }, 100);
      }
    }, 2000);

    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
      setTitle("NOETICA");
    }, 3000);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(revealTimer);
    };
  }, [isRevealed]);

  return (
    <div className="relative z-10 text-center select-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="text-xs md:text-sm tracking-[0.5em] mb-6 md:mb-8"
          style={{ fontFamily: "var(--font-mono)", color: "var(--glacial)" }}
        >
          A SENTIENT ARCHIVE OF DECENTRALIZED INTELLIGENCE
        </motion.p>

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{
              opacity: 1,
              letterSpacing: isRevealed ? "0.2em" : "0.5em",
            }}
            transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--bone)",
              textShadow: glitchActive
                ? "2px 0 var(--gold), -2px 0 var(--glacial)"
                : "none",
            }}
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isRevealed ? 1 : 0 }}
            transition={{ delay: 2, duration: 1.5, ease: "easeInOut" }}
            className="h-px mx-auto mt-4 md:mt-6"
            style={{
              background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              maxWidth: "60%",
            }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
            transition={{ delay: 2.5, duration: 1.5 }}
            className="text-2xl sm:text-3xl md:text-4xl mt-4 md:mt-6"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--glacial)",
              letterSpacing: "0.3em",
              fontWeight: 300,
            }}
          >
            {subtitle}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isRevealed ? 1 : 0 }}
          transition={{ delay: 3.5, duration: 2 }}
          className="mt-8 md:mt-12 text-base md:text-lg max-w-lg mx-auto px-6"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            color: "var(--bone-dim)",
            lineHeight: 1.8,
          }}
        >
          Memory is the new currency of intelligence.
        </motion.p>
      </motion.div>
    </div>
  );
}
