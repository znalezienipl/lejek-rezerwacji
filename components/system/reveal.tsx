"use client"

import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react"
import { useTokens } from "./brand-context"

type Direction = "up" | "down" | "left" | "right" | "none"

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** delay in ms */
  delay?: number
  direction?: Direction
  /** optional duration override in ms */
  duration?: number
  as?: ElementType
  once?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration,
  as,
  once = true,
}: RevealProps) {
  const { motion } = useTokens()
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const Tag = (as ?? "div") as ElementType

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  const d = motion.distance
  const offset: Record<Direction, string> = {
    up: `translate3d(0, ${d}px, 0)`,
    down: `translate3d(0, -${d}px, 0)`,
    left: `translate3d(${d}px, 0, 0)`,
    right: `translate3d(-${d}px, 0, 0)`,
    none: "translate3d(0,0,0)",
  }

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : offset[direction],
    transition: `opacity ${duration ?? parseInt(motion.duration)}ms ${motion.ease} ${delay}ms, transform ${
      duration ?? parseInt(motion.duration)
    }ms ${motion.ease} ${delay}ms`,
    willChange: "opacity, transform",
  }

  return (
    <Tag ref={ref} className={`zb-reveal ${className ?? ""}`} style={style}>
      {children}
    </Tag>
  )
}
