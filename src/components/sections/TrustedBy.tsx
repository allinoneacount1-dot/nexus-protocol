"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui"

const partners = [
  "Solana",
  "Jupiter",
  "Raydium",
  "Phantom",
  "Orca",
  "Meteora",
  "Jito",
  "Helium",
]

export function TrustedBy() {
  return (
    <section id="trusted-by" className="relative py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-center text-text-muted text-sm font-mono tracking-widest uppercase mb-10">
            Trusted by the best in crypto
          </p>
        </FadeIn>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-12 overflow-hidden"
          >
            {/* Double the list for seamless scroll */}
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner}-${i}`}
                className="flex-shrink-0 glass rounded-xl px-8 py-4 flex items-center justify-center min-w-[160px] hover:border-accent-primary/30 transition-colors duration-300"
              >
                <span className="text-text-secondary font-display font-semibold text-lg whitespace-nowrap">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
