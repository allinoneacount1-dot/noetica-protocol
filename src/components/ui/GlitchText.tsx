"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  glitchOnHover?: boolean;
}

const glitchChars = "▓▒░█▄▀■□◊◈◆◇";

export default function GlitchText({
  text,
  className = "",
  as: Tag = "span",
  glitchOnHover = false,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (glitchOnHover) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        const glitched = text
          .split("")
          .map((char) =>
            Math.random() > 0.8
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join("");
        setDisplayText(glitched);
        setTimeout(() => {
          setDisplayText(text);
          setIsGlitching(false);
        }, 100);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [text, glitchOnHover]);

  const triggerGlitch = () => {
    if (!glitchOnHover) return;
    setIsGlitching(true);
    const glitched = text
      .split("")
      .map((char) =>
        Math.random() > 0.7
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
          : char
      )
      .join("");
    setDisplayText(glitched);
    setTimeout(() => {
      setDisplayText(text);
      setIsGlitching(false);
    }, 150);
  };

  return (
    <Tag
      className={`${className} select-none cursor-none`}
      onMouseEnter={triggerGlitch}
      style={{
        textShadow: isGlitching ? "2px 0 var(--gold), -2px 0 var(--glacial)" : "none",
        transition: "text-shadow 0.1s",
      }}
    >
      {displayText}
    </Tag>
  );
}
