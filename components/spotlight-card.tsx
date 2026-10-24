"use client"

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  /** رنگ نور و بردر هاور؛ هر رنگ CSS */
  accent?: string
}

/** کارت پایه‌ی تعاملی؛ هم برای پروژه‌ها، هم اسکیل‌ها و هم کانتکت. */
export function SpotlightCard({ children, className, accent }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn("spotlight-card", className)}
      style={accent ? ({ "--card-accent": accent } as CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
