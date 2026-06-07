"use client"

import { Zap, X, GitFork, MessageCircle, Globe } from "lucide-react"

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "API Docs", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "FAQ", href: "#faq" },
    { label: "Community", href: "#" },
    { label: "Status", href: "#" },
    { label: "Security", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
}

const socialLinks = [
  { icon: <X className="w-5 h-5" />, label: "Twitter", href: "#" },
  { icon: <MessageCircle className="w-5 h-5" />, label: "Discord", href: "#" },
  { icon: <GitFork className="w-5 h-5" />, label: "GitHub", href: "#" },
  { icon: <Globe className="w-5 h-5" />, label: "Website", href: "#" },
]

export function Footer() {
  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
        return
      }
    }
    console.log(`Navigating to ${href}`)
  }

  return (
    <footer className="relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                NEXUS<span className="text-accent-primary">.</span>
              </span>
            </a>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mb-6">
              AI-powered crypto intelligence for the modern trader. Detect rugs, track whales, and find alpha.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  onClick={() => handleLinkClick(social.href)}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/30 transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-text-secondary text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} NEXUS PROTOCOL. All rights reserved.
          </p>
          <p className="text-text-muted text-xs font-mono">
            Built on Solana • Powered by AI
          </p>
        </div>
      </div>
    </footer>
  )
}
