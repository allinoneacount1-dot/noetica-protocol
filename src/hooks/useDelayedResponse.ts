"use client";
import { useState, useEffect, useCallback } from "react";

export function useDelayedResponse<T>(
  data: T,
  minDelay: number = 200,
  maxDelay: number = 800
): { result: T | null; isReady: boolean } {
  const [result, setResult] = useState<T | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
    setResult(null);
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    const timer = setTimeout(() => {
      setResult(data);
      setIsReady(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [data, minDelay, maxDelay]);

  return { result, isReady };
}

export function useTypewriter(text: string, speed: number = 30): string {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
