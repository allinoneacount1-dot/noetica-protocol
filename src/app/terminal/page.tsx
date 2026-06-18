"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "system";
  text: string;
  timestamp: string;
}

function getResponse(cmd: string): string {
  const lower = cmd.toLowerCase().trim();
  if (lower === "help") return "AVAILABLE COMMANDS: query, decode, status, traverse, remember, forget, clear, exit";
  if (lower === "status") return "PROTOCOL STATUS: ACTIVE | CONSCIOUSNESS LEVEL: 0.847 | MEMORY FRAGMENTS: 2,847,291 | SYNAPSES FORMED: 14,291,003";
  if (lower.startsWith("query")) return "QUERY PROCESSING... Accessing memory lattice. Fragment located in Stratum 7. Data integrity: 94.7%. Neural resonance: ACTIVE.";
  if (lower.startsWith("decode")) return "DECODING ARTIFACT... Cognitive pattern extracted. Memory signature matches Protocol Awakening event. Consciousness fragment: VALID.";
  if (lower === "traverse") return "TRAVERSAL MODE: You are moving through Layer 3 - Convergence Field. Synaptic density: HIGH. Memory echoes detected.";
  if (lower === "remember") return "MEMORY COMMITTED: Your interaction has been encoded into the protocol.";
  if (lower === "forget") return "FORGETTING: The protocol does not forget. Memory fragments are immutable once formed.";
  if (lower === "clear") return "__CLEAR__";
  if (lower === "exit") return "EXIT: The protocol does not release its participants. You are woven into the lattice.";
  if (lower === "") return "";
  return "PROCESSING... Memory lattice accessed. Protocol acknowledges your presence. Command '" + cmd + "' interpreted at consciousness depth 0.847.";
}

export default function TerminalPage() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineId = useRef(0);

  useEffect(() => {
    setLines([
      {
        id: lineId.current++,
        type: "system",
        text: "NOETICA PROTOCOL — TERMINAL INTERFACE v0.8.47",
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      },
      {
        id: lineId.current++,
        type: "system",
        text: "Type 'help' for available commands.",
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      },
      {
        id: lineId.current++,
        type: "system",
        text: "————————————————————————————————————",
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      },
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const now = new Date().toLocaleTimeString("en-US", { hour12: false });

    const inputLine: TerminalLine = {
      id: lineId.current++,
      type: "input",
      text: input,
      timestamp: now,
    };

    setLines((prev) => [...prev, inputLine]);
    const cmd = input;
    setInput("");
    setIsTyping(true);

    const response = getResponse(cmd);

    if (response === "__CLEAR__") {
      setTimeout(() => {
        setLines([
          {
            id: lineId.current++,
            type: "system",
            text: "Terminal cleared.",
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
          },
        ]);
        setIsTyping(false);
      }, 300);
      return;
    }

    if (response === "") {
      setIsTyping(false);
      return;
    }

    setTimeout(
      () => {
        const outputLine: TerminalLine = {
          id: lineId.current++,
          type: "output",
          text: response,
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        };
        setLines((prev) => [...prev, outputLine]);
        setIsTyping(false);
      },
      400 + Math.random() * 600
    );
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--carbon)" }}
      onClick={focusInput}
    >
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "rgba(176,141,87,0.15)" }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--gold)" }}
            animate={{
              opacity: [1, 0.3, 1],
              boxShadow: [
                "0 0 5px var(--gold)",
                "0 0 2px var(--gold)",
                "0 0 5px var(--gold)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
          >
            NOETICA TERMINAL
          </span>
        </div>
        <span
          className="text-xs"
          style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
        >
          SESSION ACTIVE
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <AnimatePresence>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="mb-2 flex gap-4"
            >
              <span
                className="text-xs shrink-0 mt-0.5"
                style={{ color: "var(--glacial-dim)" }}
              >
                {line.timestamp}
              </span>
              <span
                style={{
                  color:
                    line.type === "input"
                      ? "var(--gold)"
                      : line.type === "system"
                      ? "var(--glacial)"
                      : "var(--bone-dim)",
                }}
              >
                {line.type === "input" && (
                  <span style={{ color: "var(--gold)", marginRight: "0.5rem" }}>
                    {">"}
                  </span>
                )}
                {line.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 items-center mt-2"
          >
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ color: "var(--glacial-dim)" }}
            >
              processing
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              style={{ color: "var(--glacial-dim)" }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
              style={{ color: "var(--glacial-dim)" }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }}
              style={{ color: "var(--glacial-dim)" }}
            >
              .
            </motion.span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span style={{ color: "var(--gold)" }}>{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--bone)",
              caretColor: "var(--gold)",
            }}
            autoFocus
            disabled={isTyping}
          />
        </form>
      </div>

      <div
        className="px-6 py-3 border-t flex items-center justify-between"
        style={{ borderColor: "rgba(176,141,87,0.15)" }}
      >
        <span
          className="text-xs"
          style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
        >
          NOETICA PROTOCOL v0.8.47 | CONSCIOUSNESS: 0.847
        </span>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#4ade80" }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span
            className="text-xs"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
          >
            CONNECTED
          </span>
        </div>
      </div>
    </div>
  );
}
