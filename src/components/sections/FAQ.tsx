"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { SectionLabel, SectionHeading, SectionDescription, FadeIn } from "@/components/ui"

const faqs = [
  {
    question: "How does NEXUS detect rug pulls?",
    answer:
      "Our AI models analyze over 200 on-chain signals including contract code patterns, liquidity lock status, deployer wallet history, token distribution, and social sentiment. We cross-reference these against our database of 150K+ historical rug pulls to generate a risk score in real-time. When the score exceeds our threshold, you get an instant alert.",
  },
  {
    question: "What blockchains do you support?",
    answer:
      "Currently we support Solana, Ethereum, Base, Arbitrum, Blast, Avalanche, Polygon, BSC, and Sonic. We add new chains based on user demand — our community votes on which chain to integrate next.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes! Our Free tier includes basic rug detection, 5 wallet tracking, daily market scans, and community Discord access. It's perfect for getting started. You can upgrade to Pro anytime for real-time alerts and advanced features.",
  },
  {
    question: "How accurate is the AI detection?",
    answer:
      "Our detection accuracy is 99.7% based on backtesting against historical data. We have a false positive rate of less than 0.3%. The models are continuously retrained on new rug patterns to stay ahead of evolving attack vectors.",
  },
  {
    question: "Can I use NEXUS for a trading team or fund?",
    answer:
      "Absolutely. Our Enterprise plan is designed for teams, funds, and protocols. It includes custom AI model training, white-label dashboards, dedicated account management, SLA guarantees, and on-premise deployment options. Contact our sales team for a custom quote.",
  },
  {
    question: "How fast are the alerts?",
    answer:
      "Alerts are delivered in under 50 milliseconds from the time an on-chain event is detected. For Pro users, alerts are pushed via the web app, Telegram, Discord, and email simultaneously. Enterprise users can also receive alerts via webhook for automated trading integration.",
  },
]

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-semibold text-white pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-accent-primary" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-text-secondary text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading className="mt-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </SectionHeading>
          <div className="mt-6 flex justify-center">
            <SectionDescription>
              Everything you need to know about NEXUS PROTOCOL.
            </SectionDescription>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
