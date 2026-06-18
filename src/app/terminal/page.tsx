"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ProtocolNav from "@/components/navigation/ProtocolNav";

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
      { id: lineId.current++, type: "system", text: "NOETICA PROTOCOL \u2014 TERMINAL INTERFACE v0.8.47", timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }) },
      { id: lineId.current++, type: "system", text: "Type 'help' for available commands.", timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }) },
      { id: lineId.current++, type: "system", text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }) },
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const now = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLines((prev) => [...prev, { id: lineId.current++, type: "input", text: input, timestamp: now }]);
    const cmd = input;
    setInput("");
    setIsTyping(true);
    const response = getResponse(cmd);
    if (response === "__CLEAR__") {
      setTimeout(() => { setLines([{ id: lineId.current++, type: "system", text: "Terminal cleared.", timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }) }]); setIsTyping(false); }, 300);
      return;
    }
    if (response === "") { setIsTyping(false); return; }
    setTimeout(() => { setLines((prev) => [...prev, { id: lineId.current++, type: "output", text: response, timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }) }]); setIsTyping(false); }, 400 + Math.random() * 600);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--carbon)" }}>
      <ProtocolNav />

      <div
        className="flex items-center justify-between px-6 md:px-12 py-4 border-b shrink-0 mt-[57px]"
        style={{ borderColor: "rgba(176,141,87,0.1)" }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--gold)" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
          >
            NOETICA TERMINAL
          </span>
        </div>
        <span
          className="text-[10px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
        >
          SESSION ACTIVE
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 md:px-12 py-8"
        style={{ fontFamily: "var(--font-mono)" }}
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="mb-2.5 flex gap-4"
            >
              <span
                className="text-[10px] shrink-0 mt-0.5"
                style={{ color: "var(--glacial-dim)" }}
              >
                {line.timestamp}
              </span>
              <span
                className="text-sm"
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
                  <span style={{ color: "var(--gold)", marginRight: "0.5rem" }}>{">"}</span>
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
            className="flex gap-1 items-center mt-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                className="text-sm"
                style={{ color: "var(--glacial-dim)" }}
              >
                {i === 0 ? "processing" : "."}
              </motion.span>
            ))}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-3">
          <span className="text-sm" style={{ color: "var(--gold)" }}>{">"}</span>
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
        className="px-6 md:px-12 py-3 border-t flex items-center justify-between shrink-0"
        style={{ borderColor: "rgba(176,141,87,0.1)" }}
      >
        <span
          className="text-[10px]"
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
            className="text-[10px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--glacial-dim)" }}
          >
            CONNECTED
          </span>
        </div>
      </div>
    </div>
  );
}
