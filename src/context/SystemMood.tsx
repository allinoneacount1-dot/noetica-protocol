"use client";
import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";

interface MoodState {
  consciousness: number;
  scrollDepth: number;
  scrollSpeed: number;
  isHovering: boolean;
  lastClick: number;
  mood: "dormant" | "awakening" | "aware" | "transcendent";
  isSignatureMoment: boolean;
  textState: "normal" | "memory" | "recollection";
}

const MoodContext = createContext<MoodState>({
  consciousness: 0.5,
  scrollDepth: 0,
  scrollSpeed: 0,
  isHovering: false,
  lastClick: 0,
  mood: "dormant",
  isSignatureMoment: false,
  textState: "normal",
});

export const useMood = () => useContext(MoodContext);

export default function SystemMood({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MoodState>({
    consciousness: 0.5,
    scrollDepth: 0,
    scrollSpeed: 0,
    isHovering: false,
    lastClick: 0,
    mood: "dormant",
    isSignatureMoment: false,
    textState: "normal",
  });

  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollSpeedHistory = useRef<number[]>([]);
  const signatureTriggered = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollDepth = docHeight > 0 ? scrollY / docHeight : 0;

          const now = Date.now();
          const dt = now - lastScrollTime.current;
          const dy = Math.abs(scrollY - lastScrollY.current);
          const speed = dt > 0 ? Math.min(dy / dt, 5) : 0;

          scrollSpeedHistory.current.push(speed);
          if (scrollSpeedHistory.current.length > 10) scrollSpeedHistory.current.shift();
          const avgSpeed = scrollSpeedHistory.current.reduce((a, b) => a + b, 0) / scrollSpeedHistory.current.length;

          lastScrollY.current = scrollY;
          lastScrollTime.current = now;

          const consciousness = 0.5 + scrollDepth * 0.5;

          let mood: MoodState["mood"] = "dormant";
          if (consciousness > 0.9) mood = "transcendent";
          else if (consciousness > 0.75) mood = "aware";
          else if (consciousness > 0.6) mood = "awakening";

          // Signature moment at ~45-55% scroll
          const isSignatureMoment = scrollDepth > 0.45 && scrollDepth < 0.55;
          if (isSignatureMoment && !signatureTriggered.current) {
            signatureTriggered.current = true;
          }
          if (scrollDepth < 0.4 || scrollDepth > 0.6) {
            signatureTriggered.current = false;
          }

          // Text state based on scroll speed
          let textState: MoodState["textState"] = "normal";
          if (avgSpeed > 2) textState = "memory";
          else if (avgSpeed > 0.8 && avgSpeed < 1.5) textState = "recollection";

          // Update CSS custom properties on :root
          const root = document.documentElement;
          root.style.setProperty("--consciousness", String(consciousness));
          root.style.setProperty("--scroll-depth", String(scrollDepth));
          root.style.setProperty("--scroll-speed", String(avgSpeed));

          setState(prev => ({
            ...prev,
            consciousness,
            scrollDepth,
            scrollSpeed: avgSpeed,
            mood,
            isSignatureMoment,
            textState,
          }));

          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = () => {
      setState(prev => ({ ...prev, isHovering: true }));
    };

    const handleClick = () => {
      setState(prev => ({ ...prev, lastClick: Date.now() }));
      // Brief mood spike on click
      document.documentElement.style.setProperty("--click-ripple", "1");
      setTimeout(() => {
        document.documentElement.style.setProperty("--click-ripple", "0");
      }, 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <MoodContext.Provider value={state}>
      {children}
    </MoodContext.Provider>
  );
}
