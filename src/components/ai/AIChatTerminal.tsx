import { useState, useRef, useEffect, useCallback } from "react";
import { useGeminiAI } from "@/hooks/useGeminiAI";
import { useAppStore } from "@/lib/stores/appStore";
import GlassCard from "@/components/ui/GlassCard";
import { Send, Terminal } from "lucide-react";

const QUICK_PROMPTS = [
  "Analyze BTC trend",
  "Explain DeFi to me",
  "Is ETH bullish?",
];

export default function AIChatTerminal() {
  const [input, setInput] = useState("");
  const [displayedText, setDisplayedText] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { ask, loading } = useGeminiAI();
  const { aiChatHistory, addChatMessage } = useAppStore();

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [aiChatHistory, displayedText, scrollToBottom]);

  const typewrite = useCallback((text: string) => {
    setIsTyping(true);
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
        addChatMessage({ role: "ai", text });
        setDisplayedText(null);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [addChatMessage]);

  const handleSend = useCallback(async (prompt?: string) => {
    const message = prompt || input.trim();
    if (!message || loading || isTyping) return;

    setInput("");
    addChatMessage({ role: "user", text: message });

    const marketContext = "Current crypto market context for analysis.";
    const response = await ask(message, marketContext);

    if (response) {
      typewrite(response);
    }
  }, [input, loading, isTyping, addChatMessage, ask, typewrite]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <GlassCard className="flex flex-col h-[600px] overflow-hidden border border-white/5">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <Terminal className="w-4 h-4 text-cyan" />
        <span className="font-mono text-sm text-cyan tracking-wider">
          NEXUS AI TERMINAL
        </span>
        <span className="w-2 h-4 bg-cyan animate-pulse ml-1" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm">
        {aiChatHistory.length === 0 && !loading && (
          <div className="text-white/20 text-center mt-20">
            <p>{">"} NEXUS AI initialized.</p>
            <p className="mt-1">{">"} Type a prompt or select below.</p>
          </div>
        )}

        {aiChatHistory.map((msg, i) => (
          <div key={i} className="flex gap-2">
            <span className={msg.role === "user" ? "text-white/40" : "text-cyan"}>
              {msg.role === "user" ? ">" : "◆"}
            </span>
            <p
              className={
                msg.role === "user"
                  ? "text-white/80"
                  : "text-cyan"
              }
            >
              {msg.text}
            </p>
          </div>
        ))}

        {displayedText !== null && (
          <div className="flex gap-2">
            <span className="text-cyan">◆</span>
            <p className="text-cyan">
              {displayedText}
              <span className="animate-pulse">▊</span>
            </p>
          </div>
        )}

        {loading && !isTyping && (
          <div className="flex gap-2 items-center">
            <span className="text-cyan">◆</span>
            <p className="text-cyan/60 animate-pulse">NEXUS AI is thinking...</p>
          </div>
        )}
      </div>

      <div className="px-4 pb-2 flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            disabled={loading || isTyping}
            className="px-3 py-1 text-xs font-mono rounded border border-cyan/20 text-cyan/60
                       hover:text-cyan hover:border-cyan/40 hover:bg-cyan/5
                       transition-colors disabled:opacity-30 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/5 bg-white/[0.02]">
        <span className="text-cyan font-mono text-sm">{">"}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter prompt..."
          disabled={loading || isTyping}
          className="flex-1 bg-transparent text-white/90 font-mono text-sm
                     placeholder:text-white/20 outline-none disabled:opacity-50"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading || isTyping}
          className="text-cyan/40 hover:text-cyan transition-colors
                     disabled:opacity-30 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </GlassCard>
  );
}
