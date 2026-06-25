import { useMemo } from "react";
import { useTopCoins } from "@/hooks/useCoinGecko";
import { useAppStore } from "@/lib/stores/appStore";
import GlassCard from "@/components/ui/GlassCard";
import { formatPrice, formatPercent, formatUSD } from "@/lib/utils/format";

interface CoinRow {
  id: string;
  market_cap_rank: number;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  sparkline_in_7d: { price: number[] };
}

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const points = useMemo(() => {
    if (!data?.length) return "";
    const len = data.length;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const w = 80;
    const h = 24;
    return data
      .map((v, i) => {
        const x = (i / (len - 1)) * w;
        const y = h - ((v - min) / range) * h;
        return `${x},${y}`;
      })
      .join(" ");
  }, [data]);

  if (!points) return null;

  const color = positive ? "#22c55e" : "#ef4444";

  return (
    <svg width="80" height="24" viewBox="0 0 80 24" className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.7}
      />
    </svg>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-white/[0.03]">
      <div className="w-6 h-3 rounded bg-white/5 animate-pulse" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />
        <div className="h-2 w-10 rounded bg-white/5 animate-pulse" />
      </div>
      <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
      <div className="h-3 w-14 rounded bg-white/5 animate-pulse" />
      <div className="h-3 w-20 rounded bg-white/5 animate-pulse hidden md:block" />
      <div className="w-20 h-6 rounded bg-white/5 animate-pulse hidden sm:block" />
    </div>
  );
}

export default function MarketGrid() {
  const { data: coins, isLoading } = useTopCoins(10);
  const selectedCoin = useAppStore((s) => s.selectedCoin);
  const setSelectedCoin = useAppStore((s) => s.setSelectedCoin);

  return (
    <GlassCard className="overflow-hidden">
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 font-mono">
          Market Overview
        </h3>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] sm:grid-cols-[auto_1fr_auto_auto_auto_auto] gap-x-4 items-center px-5 py-2.5 border-b border-white/[0.06] text-[10px] uppercase tracking-widest text-white/25 font-mono">
        <span className="w-6">#</span>
        <span>Name</span>
        <span className="text-right">Price</span>
        <span className="text-right w-20">24h</span>
        <span className="text-right w-24 hidden md:block">Mkt Cap</span>
        <span className="w-20 hidden sm:block">7d</span>
      </div>

      {isLoading ? (
        <div>
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : (
        <div>
          {(coins as CoinRow[])?.map((coin) => {
            const active = selectedCoin === coin.id;
            const positive = coin.price_change_percentage_24h >= 0;

            return (
              <button
                key={coin.id}
                onClick={() => setSelectedCoin(coin.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 border-b border-white/[0.03] last:border-0 text-left transition-colors ${
                  active
                    ? "bg-cyan/[0.04] border-l-2 border-l-cyan/40"
                    : "hover:bg-white/[0.02]"
                }`}
              >
                <span className="w-6 text-xs font-mono text-white/30">
                  {coin.market_cap_rank}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80 truncate">{coin.name}</p>
                  <p className="text-[10px] uppercase text-white/30 font-mono tracking-wider">
                    {coin.symbol}
                  </p>
                </div>

                <span className="text-sm font-mono text-white/70 text-right whitespace-nowrap">
                  {formatPrice(coin.current_price)}
                </span>

                <span
                  className={`text-sm font-mono text-right w-20 whitespace-nowrap ${
                    positive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {formatPercent(coin.price_change_percentage_24h)}
                </span>

                <span className="text-xs font-mono text-white/40 text-right w-24 whitespace-nowrap hidden md:block">
                  {formatUSD(coin.market_cap)}
                </span>

                <div className="w-20 hidden sm:flex justify-end">
                  <MiniSparkline
                    data={coin.sparkline_in_7d?.price}
                    positive={positive}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
