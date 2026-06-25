import { useState, useCallback, useEffect } from "react";
import { useGeminiAI } from "@/hooks/useGeminiAI";
import { useTopCoins } from "@/hooks/useCoinGecko";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { Sparkles } from "lucide-react";

interface Signal {
  sentiment: "BULLISH" | "BEARISH" | "NEUTRAL";
  reasoning: string;
}

const SENTIMENT_STYLES: Record<Signal["sentiment"], { color: string; bg: string }> = {
  BULLISH: { color: "text-emerald-400", bg: "bg-emerald-400/10" },
  BEARISH: { color: "text-red-400", bg: "bg-red-400/10" },
  NEUTRAL: { color: "text-yellow-400", bg: "bg-yellow-400/10" },
};

function parseSignal(text: string): Signal {
  const upper = text.toUpperCase();
  let sentiment: Signal["sentiment"] = "NEUTRAL";
  if (upper.includes("BULLISH")) sentiment = "BULLISH";
  else if (upper.includes("BEARISH")) sentiment = "BEARISH";
  return { sentiment, reasoning: text };
}

export default function AISignalCard() {
  const [signal, setSignal] = useState<Signal | null>(null);
  const { ask, loading } = useGeminiAI();
  const { data: coins, isLoading: coinsLoading } = useTopCoins(3) as { data: Array<{ id: string; name: string; symbol: string; current_price: number; price_change_percentage_24h: number; total_volume: number }> | undefined; isLoading: boolean };

  const generateSignal = useCallback(async () => {
    if (!coins || loading) return;

    const marketData = coins
      .map(
        (c: { name: string; current_price: number; price_change_percentage_24h: number; total_volume: number }) =>
          `${c.name}: $${c.current_price.toLocaleString()} (${c.price_change_percentage_24h >= 0 ? "+" : ""}${c.price_change_percentage_24h.toFixed(2)}%), Vol: $${(c.total_volume / 1e9).toFixed(1)}B`
      )
      .join("\n");

    const prompt = `Analyze this crypto market data and give a brief signal (bullish/bearish/neutral) with reasoning.\n\n${marketData}`;
    const response = await ask(prompt);

    if (response) {
      setSignal(parseSignal(response));
    }
  }, [coins, loading, ask]);

  useEffect(() => {
    if (coins && !signal && !loading) {
      generateSignal();
    }
  }, [coins]);

  const isLoading = coinsLoading || loading;

  return (
    <GlassCard glow className="p-6 border border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan" />
          <h3 className="font-display text-lg text-white tracking-wide">
            AI Market Signal
          </h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={generateSignal}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </div>

      {isLoading && !signal && (
        <div className="space-y-3 py-4">
          <div className="h-10 w-32 bg-white/5 rounded animate-pulse mx-auto" />
          <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse mx-auto" />
        </div>
      )}

      {signal && !isLoading && (
        <div className="text-center space-y-3 py-2">
          <div
            className={`inline-block px-6 py-2 rounded-lg ${SENTIMENT_STYLES[signal.sentiment].bg}`}
          >
            <span
              className={`font-mono text-2xl font-bold tracking-widest ${SENTIMENT_STYLES[signal.sentiment].color}`}
            >
              {signal.sentiment}
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-md mx-auto">
            {signal.reasoning}
          </p>
        </div>
      )}

      {coins && (
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
          {coins.map((coin) => (
            <div key={coin.id} className="text-center">
              <p className="text-xs text-white/40 uppercase">{coin.symbol}</p>
              <p className="text-sm text-white/80 font-mono">
                ${coin.current_price.toLocaleString()}
              </p>
              <p
                className={`text-xs font-mono ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
