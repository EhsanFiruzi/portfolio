"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type PointerEvent } from "react"
import { cn } from "@/lib/utils"
import { asset } from "@/lib/asset"

type Tone = "k" | "s" | "f" | "p"
type Seg = [text: string, tone?: Tone]
interface CodeFile {
  name: string
  lines: Seg[][]
}

const TONE: Record<Tone, string> = {
  k: "text-signal",
  s: "text-amber-600 dark:text-amber-300",
  f: "text-sky-600 dark:text-sky-300",
  p: "text-foreground",
}

const FILES: CodeFile[] = [
  {
    name: "app.dart",
    lines: [
      [["final ", "k"], ["ehsan = "], ["Developer", "f"], ["("]],
      [["  stack: "], ["['Flutter', 'FastAPI']", "s"], [","]],
      [["  ships: "], ["'apps people install'", "s"], [","]],
      [["  rtl: "], ["true", "k"], [","]],
      [[");"]],
    ],
  },
  {
    name: "main.py",
    lines: [
      [["@app", "f"], [".get("], ["\"/ehsan\"", "s"], [")"]],
      [["async def ", "k"], ["about", "f"], ["():"]],
      [["    return ", "k"], ["{"]],
      [["        "], ["\"stack\"", "s"], [": ["], ["\"Flutter\"", "s"], [", "], ["\"FastAPI\"", "s"], ["],"]],
      [["        "], ["\"ships\"", "s"], [": "], ["\"apps people install\"", "s"], [","]],
      [["    }"]],
    ],
  },
]

const LINE_COUNT = Math.max(...FILES.map((f) => f.lines.length))
const charCount = (f: CodeFile) =>
  f.lines.reduce((sum, l) => sum + l.reduce((s, [t]) => s + t.length, 0) + 1, 0)

/** کد رو حرف‌به‌حرف تایپ می‌کنه. با key عوض میشه، پس هر تب از اول شروع می‌کنه. */
function TypedCode({ file }: { file: CodeFile }) {
  const total = charCount(file)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let n = 0
    const id = setInterval(() => {
      n += reduce ? total : 2
      setShown(n)
      if (n >= total) clearInterval(id)
    }, 18)
    return () => clearInterval(id)
  }, [total])

  let left = shown
  return (
    <pre className="font-mono text-[13px] leading-7" dir="ltr">
      {Array.from({ length: LINE_COUNT }).map((_, i) => {
        const line = file.lines[i]
        const lineLeft = left
        left -= line ? line.reduce((n, [t]) => n + t.length, 0) + 1 : 0
        let budget = lineLeft
        return (
          <div key={i} className="flex h-7 whitespace-pre">
            <span className="w-7 shrink-0 select-none text-muted-foreground/40">{line ? i + 1 : ""}</span>
            <code>
              {line?.map(([text, tone = "p"], j) => {
                const part = text.slice(0, Math.max(0, budget))
                budget -= text.length
                return (
                  <span key={j} className={TONE[tone]}>
                    {part}
                  </span>
                )
              })}
            </code>
          </div>
        )
      })}
    </pre>
  )
}

export function HeroCard() {
  const [active, setActive] = useState(0)
  const tiltRef = useRef<HTMLDivElement>(null)

  // تیلت سه‌بعدی فقط با ماوس
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return
    const el = tiltRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`
  }
  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)"
  }

  return (
    <div className="relative" onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* چیپ‌های شناور */}
      <div className="absolute -left-3 bottom-10 z-10 hidden animate-float items-center gap-2 rounded-full border bg-card/90 py-1.5 pl-2 pr-4 text-xs font-medium shadow-lg backdrop-blur sm:flex">
        <Image src={asset("flutter.svg")} alt="" width={20} height={20} />
        Flutter
      </div>
      <div
        className="absolute -right-2 -top-4 z-10 hidden animate-float items-center gap-2 rounded-full border bg-card/90 py-1.5 pl-2 pr-4 text-xs font-medium shadow-lg backdrop-blur sm:flex"
        style={{ animationDelay: "-3s" }}
      >
        <Image src={asset("fastapi.svg")} alt="" width={20} height={20} />
        FastAPI
      </div>

      <div
        ref={tiltRef}
        className="rounded-2xl border bg-card/80 shadow-2xl shadow-black/20 backdrop-blur-xl transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: "perspective(900px)" }}
      >
        <div role="tablist" aria-label="Code samples" className="flex items-center gap-1 border-b px-3 pt-3">
          <span className="mr-2 flex gap-1.5 pb-3" aria-hidden>
            <i className="size-2.5 rounded-full bg-foreground/15" />
            <i className="size-2.5 rounded-full bg-foreground/15" />
            <i className="size-2.5 rounded-full bg-foreground/15" />
          </span>
          {FILES.map((f, i) => (
            <button
              key={f.name}
              role="tab"
              type="button"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "-mb-px rounded-t-lg border border-b-0 px-3 py-2 font-mono text-xs transition-colors",
                active === i
                  ? "border-border bg-card text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto p-5" role="tabpanel">
          <TypedCode key={active} file={FILES[active]} />
        </div>
      </div>
    </div>
  )
}
