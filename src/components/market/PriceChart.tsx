import { useEffect, useRef } from "react";
import { createChart, AreaSeries, type IChartApi, type ISeriesApi, type AreaData, type Time } from "lightweight-charts";
import { useCoinChart } from "@/hooks/useCoinGecko";
import { useAppStore } from "@/lib/stores/appStore";
import GlassCard from "@/components/ui/GlassCard";
import { formatPrice } from "@/lib/utils/format";

export default function PriceChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const selectedCoin = useAppStore((s) => s.selectedCoin);
  const { data, isLoading, isError } = useCoinChart(selectedCoin, 7);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: "#050508" },
        textColor: "rgba(255,255,255,0.4)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.03)" },
        horzLines: { color: "rgba(255,255,255,0.03)" },
      },
      crosshair: {
        vertLine: {
          color: "rgba(0,245,255,0.3)",
          labelBackgroundColor: "#0a0f2c",
        },
        horzLine: {
          color: "rgba(0,245,255,0.3)",
          labelBackgroundColor: "#0a0f2c",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.05)",
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.05)",
        timeVisible: false,
      },
    });

    const series = chart.addSeries(AreaSeries, {
      topColor: "rgba(0,245,255,0.15)",
      bottomColor: "rgba(0,245,255,0.01)",
      lineColor: "#00F5FF",
      lineWidth: 2,
      crosshairMarkerBackgroundColor: "#00F5FF",
      crosshairMarkerBorderColor: "#050508",
      crosshairMarkerRadius: 4,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        chart.applyOptions({ width: entry.contentRect.width });
      }
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !data?.length) return;
    seriesRef.current.setData(data as AreaData<Time>[]);
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  const latestPrice = data?.[data.length - 1]?.value;

  return (
    <GlassCard className="p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 font-mono">
            Price Chart
          </h3>
          {latestPrice && (
            <p className="text-xl font-mono text-white mt-1">
              {formatPrice(latestPrice)}
            </p>
          )}
        </div>
        <span className="text-[10px] font-mono text-cyan/60 uppercase tracking-widest">
          7D
        </span>
      </div>

      {isLoading ? (
        <div className="h-[300px] flex items-center justify-center">
          <div className="w-full space-y-3 px-2">
            <div className="h-2 w-full rounded bg-white/5 animate-pulse" />
            <div className="h-2 w-3/4 rounded bg-white/5 animate-pulse" />
            <div className="h-2 w-5/6 rounded bg-white/5 animate-pulse" />
            <div className="h-2 w-2/3 rounded bg-white/5 animate-pulse" />
            <div className="h-2 w-4/5 rounded bg-white/5 animate-pulse" />
            <div className="h-2 w-1/2 rounded bg-white/5 animate-pulse" />
          </div>
        </div>
      ) : isError ? (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-sm text-red-400/60 font-mono">Failed to load chart data</p>
        </div>
      ) : (
        <div ref={containerRef} className="w-full" />
      )}
    </GlassCard>
  );
}
