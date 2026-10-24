"use client"

import { useEffect, useRef } from "react"

/** یک نور نرم که دنبال ماوس میاد. روی موبایل/تاچ نمایش داده نمیشه. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`)
        el.style.setProperty("--y", `${e.clientY}px`)
        el.style.opacity = "1"
      })
    }
    const onLeave = () => (el.style.opacity = "0")
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden opacity-0 transition-opacity duration-500 [@media(hover:hover)]:block"
      style={{
        background:
          "radial-gradient(520px circle at var(--x,50%) var(--y,30%), color-mix(in oklab, var(--signal) 11%, transparent), transparent 70%)",
      }}
    />
  )
}
