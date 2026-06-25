import { useState, useEffect, useCallback } from "react";
import { useConnect, useDisconnect, useAccount, useBalance } from "wagmi";
import { Menu, X, Wallet, ExternalLink } from "lucide-react";
import { formatUnits } from "viem";
import { cn } from "@/lib/utils/cn";
import { formatAddress } from "@/lib/utils/format";

const NAV_LINKS = [
  { label: "Terminal", href: "#terminal" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Vault", href: "#vault" },
  { label: "Manifesto", href: "#manifesto" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleConnect = useCallback(() => {
    const wc = connectors.find((c) => c.id === "walletConnect");
    if (wc) connect({ connector: wc });
    else if (connectors[0]) connect({ connector: connectors[0] });
  }, [connect, connectors]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between",
          "bg-void/80 backdrop-blur-xl border-b border-white/5",
          "transition-all duration-300 ease-out",
          scrolled ? "h-14 px-6" : "h-18 px-8"
        )}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
          <span
            className={cn(
              "font-display font-bold tracking-wider text-white",
              scrolled ? "text-lg" : "text-xl"
            )}
          >
            NEXUS
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop wallet */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isConnected && address ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-xs font-mono text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{formatAddress(address)}</span>
                {balance && (
                  <span className="text-cyan">
                    {parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)} {balance.symbol}
                  </span>
                )}
                <a
                  href={`https://etherscan.io/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View address on Etherscan"
                  className="text-white/30 hover:text-white/60 transition-colors"
                >
                  <ExternalLink size={12} />
                </a>
              </div>
              <button
                onClick={() => disconnect()}
                className="px-3 py-1.5 text-xs text-white/40 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 cursor-pointer"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-cyan text-void rounded-lg hover:bg-cyan/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Wallet size={14} />
              {isPending ? "Connecting…" : "Connect Wallet"}
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-10 h-10 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8",
          "bg-void/95 backdrop-blur-2xl",
          "transition-opacity duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="text-2xl font-display text-white/70 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-4">
          {isConnected && address ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm font-mono text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{formatAddress(address)}</span>
                {balance && (
                  <span className="text-cyan">
                    {parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)} {balance.symbol}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  disconnect();
                  setMobileOpen(false);
                }}
                className="px-6 py-2 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 cursor-pointer"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                handleConnect();
                setMobileOpen(false);
              }}
              disabled={isPending}
              className="flex items-center gap-2 px-6 py-3 text-base font-medium bg-cyan text-void rounded-lg hover:bg-cyan/90 active:scale-95 transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              <Wallet size={16} />
              {isPending ? "Connecting…" : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
