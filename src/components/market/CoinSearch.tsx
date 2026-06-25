import { useState, useRef, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { useCoinSearch } from "@/hooks/useCoinGecko";
import { useAppStore } from "@/lib/stores/appStore";

export default function CoinSearch() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const setSelectedCoin = useAppStore((s) => s.setSelectedCoin);
  const { data, isLoading } = useCoinSearch(debounced);

  const coins = data?.coins?.slice(0, 5) ?? [];

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedCoin(id);
      setQuery("");
      setDebounced("");
      setOpen(false);
    },
    [setSelectedCoin]
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="glass rounded-xl flex items-center gap-3 px-4 py-3 border border-white/[0.06] focus-within:border-cyan/30 transition-colors">
        <Search size={16} className="text-white/30 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder="Search coins..."
          className="bg-transparent w-full text-sm text-white/80 placeholder:text-white/20 outline-none font-mono"
        />
        {isLoading && query.length >= 2 && (
          <div className="w-3.5 h-3.5 border-2 border-white/10 border-t-cyan rounded-full animate-spin shrink-0" />
        )}
      </div>

      {open && debounced.length >= 2 && coins.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl border border-white/[0.06] overflow-hidden z-50 backdrop-blur-xl">
          {coins.map((coin: { id: string; name: string; symbol: string; market_cap_rank: number | null }) => (
            <button
              key={coin.id}
              onClick={() => handleSelect(coin.id)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-colors text-left border-b border-white/[0.03] last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-mono text-cyan/50 w-6 shrink-0">
                  {coin.market_cap_rank ? `#${coin.market_cap_rank}` : "—"}
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-white/80 truncate">{coin.name}</p>
                  <p className="text-[10px] uppercase text-white/30 font-mono tracking-wider">
                    {coin.symbol}
                  </p>
                </div>
              </div>
              <Search size={12} className="text-white/10 shrink-0" />
            </button>
          ))}
        </div>
      )}

      {open && debounced.length >= 2 && !isLoading && coins.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl border border-white/[0.06] p-4 z-50 backdrop-blur-xl">
          <p className="text-xs text-white/30 font-mono text-center">No results found</p>
        </div>
      )}
    </div>
  );
}
