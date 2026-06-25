import { useProtocols, useChains } from "@/hooks/useDeFiLlama"
import GlassCard from "@/components/ui/GlassCard"
import Loader from "@/components/ui/Loader"
import { formatUSD, formatPercent, formatNumber } from "@/lib/utils/format"
import { ExternalLink, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useMemo } from "react"

gsap.registerPlugin(ScrollTrigger)

const BAR_COLORS = ["#00F5FF", "#A855F7", "#FF6B35", "#22C55E"]

export default function TVLDashboard() {
  const { data: protocols, isLoading: pLoading, error: pError, refetch: refetchProtocols } = useProtocols()
  const { data: chains, isLoading: cLoading, error: cError, refetch: refetchChains } = useChains()

  const counterRef = useRef<HTMLSpanElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const totalTVL = useMemo(() => {
    if (!chains?.length) return 0
    return chains.reduce((sum: number, c: Record<string, unknown>) => sum + ((c.tvl as number) ?? 0), 0)
  }, [chains])

  const topChains = useMemo(() => {
    if (!chains?.length) return []
    return [...chains].sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0)).slice(0, 8)
  }, [chains])

  const topProtocols = useMemo(() => {
    if (!protocols?.length) return []
    return [...protocols].sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0)).slice(0, 15)
  }, [protocols])

  const maxChainTVL = topChains[0]?.tvl ?? 1

  useEffect(() => {
    if (!counterRef.current || totalTVL <= 0) return

    const obj = { val: 0 }
    gsap.to(obj, {
      val: totalTVL,
      duration: 2,
      ease: "power2.out",
      onUpdate() {
        if (counterRef.current) {
          const billions = obj.val / 1e9
          counterRef.current.textContent = `$${billions.toFixed(2)} B`
        }
      },
    })
  }, [totalTVL])

  useEffect(() => {
    if (!barsRef.current || topChains.length === 0) return

    const bars = barsRef.current.querySelectorAll("[data-bar]")
    gsap.fromTo(
      bars,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: barsRef.current,
          start: "top 80%",
          once: true,
        },
      }
    )
  }, [topChains])

  useEffect(() => {
    if (!listRef.current || topProtocols.length === 0) return

    const rows = listRef.current.querySelectorAll("[data-row]")
    gsap.fromTo(
      rows,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          once: true,
        },
      }
    )
  }, [topProtocols])

  if (pLoading || cLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <GlassCard key={i} className="h-48 animate-pulse">
            <div className="h-full bg-white/5 rounded-xl" />
          </GlassCard>
        ))}
      </div>
    )
  }

  if (pError || cError) {
    return (
      <GlassCard className="flex flex-col items-center justify-center gap-4 py-16">
        <p className="text-red-400 text-sm font-mono">{pError?.message ?? cError?.message}</p>
        <button
          onClick={() => {
            refetchProtocols()
            refetchChains()
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00F5FF]/10 text-[#00F5FF] text-sm font-medium hover:bg-[#00F5FF]/20 transition-colors"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </GlassCard>
    )
  }

  return (
    <section className="w-full space-y-10">
      {/* Total TVL Counter */}
      <GlassCard className="text-center py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
          Total Value Locked
        </p>
        <span
          ref={counterRef}
          className="text-5xl md:text-7xl font-mono font-bold text-[#00F5FF] tabular-nums"
        >
          $0.00 B
        </span>
      </GlassCard>

      {/* Chain TVL Bar Chart */}
      <GlassCard>
        <h3 className="text-sm uppercase tracking-[0.2em] text-white/50 mb-6">
          Chain TVL Distribution
        </h3>
        <div ref={barsRef} className="space-y-3">
          {topChains.map((chain, i) => {
            const pct = ((chain.tvl ?? 0) / maxChainTVL) * 100
            return (
              <div key={chain.name ?? i} className="flex items-center gap-4">
                <span className="w-28 text-sm text-white/70 truncate shrink-0">
                  {chain.name}
                </span>
                <div className="flex-1 h-7 rounded-md bg-white/5 overflow-hidden relative">
                  <div
                    data-bar
                    className="h-full rounded-md"
                    style={{
                      width: `${pct}%`,
                      background: BAR_COLORS[i % BAR_COLORS.length],
                      boxShadow: `0 0 16px ${BAR_COLORS[i % BAR_COLORS.length]}40`,
                    }}
                  />
                </div>
                <span className="w-24 text-right text-sm font-mono text-white/60 tabular-nums shrink-0">
                  {formatUSD(chain.tvl ?? 0)}
                </span>
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Protocol List */}
      <GlassCard>
        <h3 className="text-sm uppercase tracking-[0.2em] text-white/50 mb-6">
          Top Protocols
        </h3>
        <div ref={listRef} className="space-y-1">
          {/* Header */}
          <div className="grid grid-cols-[3rem_1fr_6rem_7rem_5rem_5rem] gap-2 px-3 pb-2 text-[10px] uppercase tracking-widest text-white/30">
            <span>#</span>
            <span>Protocol</span>
            <span>Chain</span>
            <span className="text-right">TVL</span>
            <span className="text-right">24h</span>
            <span />
          </div>

          {topProtocols.map((p, i) => {
            const change = p.change_1d ?? 0
            const isPositive = change >= 0
            return (
              <div
                key={p.name ?? i}
                data-row
                className="grid grid-cols-[3rem_1fr_6rem_7rem_5rem_5rem] gap-2 items-center px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors"
              >
                <span className="text-xs font-mono text-white/30 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-white/90 truncate">{p.name}</span>
                <span>
                  <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50">
                    {p.chain ?? "Multi"}
                  </span>
                </span>
                <span className="text-right text-sm font-mono text-white/70 tabular-nums">
                  {formatUSD(p.tvl ?? 0)}
                </span>
                <span
                  className={`flex items-center justify-end gap-1 text-right text-sm font-mono tabular-nums ${
                    isPositive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {formatPercent(change)}
                </span>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-end gap-1 text-xs text-[#00F5FF]/60 hover:text-[#00F5FF] transition-colors"
                >
                  Explore <ExternalLink size={10} />
                </a>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </section>
  )
}
