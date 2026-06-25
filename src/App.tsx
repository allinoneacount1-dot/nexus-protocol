import { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import CoinSearch from "@/components/market/CoinSearch";
import MarketGrid from "@/components/market/MarketGrid";
import AIChatTerminal from "@/components/ai/AIChatTerminal";
import AISignalCard from "@/components/ai/AISignalCard";
import ManifestoScroll from "@/components/manifesto/ManifestoScroll";
import Footer from "@/components/layout/Footer";
import { initScrollAnimations } from "@/lib/gsap/animations";
import "@/styles/globals.css";

const PriceChart = lazy(() => import("@/components/market/PriceChart"));
const AIImageForge = lazy(() => import("@/components/ai/AIImageForge"));
const TVLDashboard = lazy(() => import("@/components/defi/TVLDashboard"));

export default function App() {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />

      <section id="market" className="relative z-10 px-4 sm:px-6 lg:px-12 py-20 max-w-7xl mx-auto">
        <div data-reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Live Market <span className="text-cyan text-glow-cyan">Terminal</span>
          </h2>
          <p className="text-white/40 mb-8 font-mono text-sm">
            Real-time data from CoinGecko • Updated every 60s
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <CoinSearch />
            <Suspense fallback={<div className="h-[300px] bg-white/5 rounded-xl animate-pulse" />}>
              <PriceChart />
            </Suspense>
          </div>
          <div className="lg:col-span-1">
            <AISignalCard />
          </div>
        </div>
        <div className="mt-4" data-reveal>
          <MarketGrid />
        </div>
      </section>

      <section id="ai-lab" className="relative z-10 px-4 sm:px-6 lg:px-12 py-20 max-w-7xl mx-auto">
        <div data-reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            AI <span className="text-violet text-glow-violet">Laboratory</span>
          </h2>
          <p className="text-white/40 mb-8 font-mono text-sm">
            Powered by Google Gemini • Free Tier
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AIChatTerminal />
          <Suspense fallback={<div className="h-96 bg-white/5 rounded-xl animate-pulse" />}>
            <AIImageForge />
          </Suspense>
        </div>
      </section>

      <section id="vault" className="relative z-10 px-4 sm:px-6 lg:px-12 py-20 max-w-7xl mx-auto">
        <div data-reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            DeFi <span className="text-plasma">Vault</span>
          </h2>
          <p className="text-white/40 mb-8 font-mono text-sm">
            Live TVL data from DeFiLlama • No API key required
          </p>
        </div>
        <Suspense fallback={<div className="h-96 bg-white/5 rounded-xl animate-pulse" />}>
          <TVLDashboard />
        </Suspense>
      </section>

      <ManifestoScroll />
      <Footer />
    </div>
  );
}
