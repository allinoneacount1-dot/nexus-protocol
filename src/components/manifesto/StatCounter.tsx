import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface StatCounterProps {
  target: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function StatCounter({
  target,
  prefix = "",
  suffix = "",
  className = "",
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const obj = { val: 0 }

    gsap.to(obj, {
      val: target,
      duration: 2.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
      onUpdate() {
        if (ref.current) {
          const formatted =
            target >= 1000
              ? Math.round(obj.val).toLocaleString("en-US")
              : obj.val.toFixed(target % 1 !== 0 ? 1 : 0)
          ref.current.textContent = `${prefix}${formatted}${suffix}`
        }
      },
    })
  }, [target, prefix, suffix])

  return (
    <span
      ref={ref}
      className={`font-mono text-[#00F5FF] tabular-nums ${className}`}
    >
      {prefix}0{suffix}
    </span>
  )
}
