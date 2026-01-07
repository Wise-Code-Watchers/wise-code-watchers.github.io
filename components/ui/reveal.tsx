"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useEffect, useRef, useState } from "react"

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Delay in ms */
  delayMs?: number
  /** Trigger only once (default: true) */
  once?: boolean
}

/**
 * Simple in-view reveal animation (fade + slide up).
 * No extra deps; powered by IntersectionObserver.
 */
export function Reveal({ children, className, delayMs = 0, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setShown(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setShown(false)
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(el)

    // 立即检查元素是否已经在视口内（修复初始加载时的显示问题）
    const rect = el.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight * 0.82 && rect.bottom > 0
    if (isVisible) {
      setShown(true)
      if (once) observer.disconnect()
    }

    return () => observer.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}
