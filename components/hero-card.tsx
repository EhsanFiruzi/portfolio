"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { cn } from "@/lib/utils"

type Tone = "k" | "s" | "f" | "p"
type Seg = [text: string, tone?: Tone]
interface CodeFile {
  name: string
  lines: Seg[][]
}

const TONE: Record<Tone, string> = {
  k: "text-signal",
  s: "text-amber-700 dark:text-amber-300",
  f: "text-sky-700 dark:text-sky-300",
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
const lineLength = (line: Seg[]) => line.reduce((n, [t]) => n + t.length, 0) + 1
const charCount = (f: CodeFile) => f.lines.reduce((sum, l) => sum + lineLength(l), 0)

/** حرف‌به‌حرف تایپ میشه؛ با reduced-motion یکجا و بدون انیمیشن نمایش داده میشه. */
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
        let budget = left
        left -= line ? lineLength(line) : 0
        return (
          <div key={i} className="flex h-7 whitespace-pre">
            <span aria-hidden className="w-7 shrink-0 select-none text-muted-foreground/60">
              {line ? i + 1 : ""}
            </span>
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // الگوی استاندارد تب: فلش‌ها، Home و End
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = FILES.length - 1
    let next: number | null = null
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = last
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="rounded-2xl border bg-card/80 shadow-xl shadow-black/10 backdrop-blur-xl">
      <div role="tablist" aria-label="Code samples" className="flex items-center gap-1 border-b px-3 pt-3">
        <span className="mr-2 flex gap-1.5 pb-3" aria-hidden>
          <i className="size-2.5 rounded-full bg-foreground/15" />
          <i className="size-2.5 rounded-full bg-foreground/15" />
          <i className="size-2.5 rounded-full bg-foreground/15" />
        </span>
        {FILES.map((f, i) => (
          <button
            key={f.name}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            id={`hero-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`hero-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
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

      {FILES.map((f, i) => (
        <div
          key={f.name}
          id={`hero-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`hero-tab-${i}`}
          tabIndex={0}
          hidden={active !== i}
          className="overflow-x-auto p-5"
        >
          {active === i && <TypedCode file={f} />}
        </div>
      ))}
    </div>
  )
}
