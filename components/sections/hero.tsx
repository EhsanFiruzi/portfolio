import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { site } from "@/data/site"
import { projects } from "@/data/projects"
import { skills } from "@/data/skills"
import { asset } from "@/lib/asset"
import { HeroCard } from "@/components/hero-card"

const pythonYears = skills.find((s) => s.title === "Python")?.yearsOfExperience ?? 0

const stats = [
  { value: projects.length, label: "Apps released" },
  { value: `${pythonYears}+`, label: "Years of Python" },
  { value: skills.length, label: "Technologies" },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      {/* نقطه‌چین با محو شدن به لبه‌ها */}
      <div
        aria-hidden
        className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
      />

      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="rise flex items-center gap-3" style={{ "--i": 0 } as React.CSSProperties}>
            <Image
              src={asset(site.avatar)}
              alt={site.name}
              width={52}
              height={52}
              priority
              className="size-13 rounded-full object-cover ring-2 ring-signal/60 ring-offset-2 ring-offset-background"
            />
            <p className="text-sm font-medium text-muted-foreground">{site.role}</p>
          </div>

          <h1
            className="rise mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {site.name}
          </h1>

          <p
            className="rise mt-5 max-w-xl text-xl leading-snug text-foreground/90 sm:text-2xl"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {site.headline}
          </p>

          <p
            className="rise mt-4 max-w-xl leading-relaxed text-muted-foreground"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {site.intro}
          </p>

          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
            <a
              href="#projects"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-signal px-6 text-sm font-semibold text-signal-foreground transition-transform hover:-translate-y-0.5"
            >
              View projects
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center rounded-full border px-6 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Get in touch
            </a>
          </div>

          <dl className="rise mt-12 flex gap-8 sm:gap-12" style={{ "--i": 5 } as React.CSSProperties}>
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-heading text-3xl font-semibold">{s.value}</dd>
                <p className="mt-1 text-xs text-muted-foreground" aria-hidden>
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise" style={{ "--i": 3 } as React.CSSProperties}>
          <HeroCard />
        </div>
      </div>
    </section>
  )
}
