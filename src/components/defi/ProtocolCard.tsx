import GlassCard from "@/components/ui/GlassCard"
import { formatUSD, formatPercent } from "@/lib/utils/format"
import { ExternalLink, TrendingUp, TrendingDown } from "lucide-react"

interface ProtocolCardProps {
  name: string
  chain: string
  tvl: number
  change: number
  url: string
  logo?: string
}

const CHAIN_COLORS: Record<string, string> = {
  Ethereum: "#627EEA",
  Solana: "#9945FF",
  BSC: "#F3BA2F",
  Arbitrum: "#28A0F0",
  Polygon: "#8247E5",
  Avalanche: "#E84142",
  Base: "#0052FF",
  Optimism: "#FF0420",
}

export default function ProtocolCard({ name, chain, tvl, change, url, logo }: ProtocolCardProps) {
  const isPositive = change >= 0
  const chainColor = CHAIN_COLORS[chain] ?? "#00F5FF"

  return (
    <GlassCard
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,245,255,0.08)]"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00F5FF]/0 to-[#A855F7]/0 group-hover:from-[#00F5FF]/[0.03] group-hover:to-[#A855F7]/[0.03] transition-all duration-500 pointer-events-none" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {logo ? (
            <img
              src={logo}
              alt={name}
              className="w-10 h-10 rounded-lg bg-white/5 object-cover shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-sm font-bold text-white/40 shrink-0">
              {name.charAt(0)}
            </div>
          )}

          <div className="min-w-0">
            <h4 className="text-sm font-medium text-white/90 truncate">{name}</h4>
            <span
              className="inline-block text-[10px] px-2 py-0.5 rounded-full mt-1"
              style={{
                background: `${chainColor}15`,
                color: chainColor,
              }}
            >
              {chain}
            </span>
          </div>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-2 rounded-lg text-white/20 hover:text-[#00F5FF] hover:bg-[#00F5FF]/10 transition-all"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">TVL</p>
          <p className="text-xl font-mono font-semibold text-white/90 tabular-nums">
            {formatUSD(tvl)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">24h</p>
          <p
            className={`flex items-center justify-end gap-1 text-sm font-mono tabular-nums ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {formatPercent(change)}
          </p>
        </div>
      </div>
    </GlassCard>
  )
}
