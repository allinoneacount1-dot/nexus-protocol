import { CodeXml, AtSign, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const FOOTER_LINKS = [
  { label: "GitHub", href: "#", icon: CodeXml, aria: "Visit GitHub repository" },
  { label: "Twitter", href: "#", icon: AtSign, aria: "Follow on Twitter" },
  { label: "Docs", href: "#", icon: BookOpen, aria: "Read documentation" },
] as const;

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="glass-strong">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Left — brand */}
            <div className="flex flex-col gap-3">
              <span className="font-display text-lg font-bold tracking-wider text-white">
                NEXUS Protocol
              </span>
              <p className="text-sm text-white/40 leading-relaxed">
                Built with 100% free APIs
              </p>
            </div>

            {/* Center — links */}
            <nav aria-label="Footer navigation" className="flex flex-col md:items-center gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-white/30">
                Links
              </span>
              <div className="flex items-center gap-6">
                {FOOTER_LINKS.map(({ label, href, icon: Icon, aria }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={aria}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    <Icon size={14} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </nav>

            {/* Right — badge */}
            <div className="flex md:justify-end items-start">
              <div
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                  "glass border-glow-cyan text-xs font-mono text-cyan"
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-glow" />
                0$ spent on APIs
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <p className="text-center text-xs text-white/25">
              © 2026 NEXUS Protocol. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
