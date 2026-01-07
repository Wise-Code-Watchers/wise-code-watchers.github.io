"use client"

import { useEffect, useRef, useState } from "react"
import clsx from "clsx"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delayMs?: number
  durationMs?: number
  y?: number
  once?: boolean // ✅ 新增：是否只播一次（默认 false = 每次进入都播）
  threshold?: number
  rootMargin?: string
}

export function Reveal({
  children,
  className,
  delayMs = 0,
  durationMs = 600,
  y = 12,
  once = false,
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
        } else {
          // ✅ 关键：离开视口就复位，回滚时可重播
          if (!once) setShown(false)
        }
      },
      { threshold, rootMargin }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [once, threshold, rootMargin])

  return (
    <div
      ref={ref}
      className={clsx(
        "will-change-transform will-change-opacity",
        className
      )}
      style={{
        transitionProperty: "transform, opacity",
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        transitionDelay: `${delayMs}ms`,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0px)" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  )
}
