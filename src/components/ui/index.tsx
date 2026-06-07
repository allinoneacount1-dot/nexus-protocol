"use client"

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"

// ─── Section Label ───
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="section-label"
    >
      {children}
    </motion.span>
  )
}

// ─── Section Heading ───
export function SectionHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${className}`}
    >
      {children}
    </motion.h2>
  )
}

// ─── Section Description ───
export function SectionDescription({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-text-secondary text-lg md:text-xl max-w-2xl"
    >
      {children}
    </motion.p>
  )
}

// ─── Glass Card ───
export function GlassCard({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`glass rounded-2xl p-6 md:p-8 ${hover ? "card-hover" : ""} ${className}`}
    >
      {children}
    </motion.div>
  )
}

// ─── Feature Card ───
export function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-6 md:p-8 card-hover group"
    >
      <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-4 text-accent-primary group-hover:bg-accent-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

// ─── Stat Card ───
export function StatCard({
  value,
  label,
  delay = 0,
}: {
  value: string
  label: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">{value}</div>
      <div className="text-text-secondary text-sm">{label}</div>
    </motion.div>
  )
}

// ─── Animated Counter ───
export function AnimatedCounter({
  end,
  duration = 2,
  suffix = "",
}: {
  end: number
  duration?: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// ─── Scroll Progress ───
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary z-50 origin-left"
    />
  )
}

// ─── Fade In When Visible ───
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}) {
  const directionMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: -30 },
    right: { y: 0, x: 30 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Stagger Children ───
export function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Glowing Orb ───
export function GlowingOrb({
  color = "primary",
  size = "md",
  className = "",
  style,
}: {
  color?: "primary" | "secondary" | "tertiary"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  style?: CSSProperties
}) {
  const colorMap = {
    primary: "bg-accent-primary/20",
    secondary: "bg-accent-secondary/20",
    tertiary: "bg-accent-tertiary/20",
  }
  const sizeMap = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]",
  }

  return (
    <div
      style={style}
      className={`rounded-full blur-3xl ${colorMap[color]} ${sizeMap[size]} animate-float ${className}`}
    />
  )
}

// ─── Grid Background ───
export function GridBackground() {
  return (
    <div className="fixed inset-0 grid-pattern opacity-50 pointer-events-none z-0" />
  )
}

// ─── Noise Overlay ───
export function NoiseOverlay() {
  return <div className="noise-overlay" />
}

// ─── Button ───
export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  href?: string
}) {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg"
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "bg-white/5 hover:bg-white/10 border border-white/10",
  }
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
