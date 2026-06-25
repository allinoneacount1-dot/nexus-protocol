import { useEffect, useState } from "react";

interface Price {
  [key: string]: number;
}

export default function HeroTicker() {
  const [prices, setPrices] = useState<Price>({
    bitcoin: 0,
    ethereum: 0,
    solana: 0,
  });
  const [prevPrices, setPrevPrices] = useState<Price>({});

  useEffect(() => {
    const ws = new WebSocket(
      "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana,binance-coin,ripple"
    );
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setPrevPrices(prices);
      setPrices((prev) => ({ ...prev, ...data }));
    };
    return () => ws.close();
  }, []);

  const coins = [
    { key: "bitcoin", label: "BTC" },
    { key: "ethereum", label: "ETH" },
    { key: "solana", label: "SOL" },
    { key: "binance-coin", label: "BNB" },
    { key: "ripple", label: "XRP" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/60 backdrop-blur-md border-t border-white/5 flex items-center gap-6 px-6 overflow-hidden font-mono text-sm">
      {coins.map((c) => {
        const price = prices[c.key];
        const prev = prevPrices[c.key];
        const up = prev && price > prev;
        const down = prev && price < prev;
        return (
          <div
            key={c.key}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <span className="text-white/40">{c.label}</span>
            <span
              className={
                up
                  ? "text-green-400"
                  : down
                    ? "text-red-400"
                    : "text-white/80"
              }
            >
              $
              {price
                ? price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                : "---"}
            </span>
            <span
              className={
                up
                  ? "text-green-500"
                  : down
                    ? "text-red-500"
                    : "text-white/20"
              }
            >
              {up ? "▲" : down ? "▼" : "—"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
