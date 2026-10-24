import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Download, Mail } from "lucide-react"

import { site } from "@/data/site"
import { projects } from "@/data/projects"
import { asset } from "@/lib/asset"
import { STORE_LABEL } from "@/components/store-badge"
import { HeroCard } from "@/components/hero-card"

// فقط چیزی که از دیتای پروژه‌ها قابل اثباته
const publishedStores = Array.from(
  new Set(projects.filter((p) => p.status === "published").flatMap((p) => p.downloads.map((d) => STORE_LABEL[d.store])))
)
const evidence =
  publishedStores.length > 0
    ? `${projects.filter((p) => p.status === "published").length} apps published on ${publishedStores.join(" and ")}`
    : null

const primary =
  "inline-flex h-11 items-center gap-2 rounded-full bg-signal px-6 text-sm font-semibold text-signal-foreground transition-transform hover:-translate-y-0.5"
const secondary =
  "inline-flex h-11 items-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors hover:bg-muted"

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div
        aria-hidden
        className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
      />

      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="rise flex items-center gap-3" style={{ "--i": 0 } as React.CSSProperties}>
            <Image
              src={asset(site.avatar)}
              alt={`Portrait of ${site.name}`}
              width={52}
              height={52}
              priority
              className="size-13 rounded-full object-cover ring-2 ring-signal/60 ring-offset-2 ring-offset-background"
            />
            <p className="text-base font-semibold">{site.name}</p>
          </div>

          <h1
            className="rise mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {site.role}
          </h1>

          <p
            className="rise mt-5 max-w-xl text-xl leading-snug text-foreground/90"
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

          <ul
            aria-label="Core technologies"
            className="rise mt-5 flex flex-wrap gap-2"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            {site.coreStack.map((t) => (
              <li key={t} className="rounded-md border bg-muted/60 px-3 py-1 text-sm font-medium">
                {t}
              </li>
            ))}
          </ul>

          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 5 } as React.CSSProperties}>
            <Link href="/#projects" className={primary}>
              View Projects
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            {site.resume && (
              <a href={asset(site.resume)} download className={secondary}>
                <Download className="size-4" aria-hidden />
                Download CV
              </a>
            )}
            <Link href="/#contact" className={secondary}>
              <Mail className="size-4" aria-hidden />
              Contact Me
            </Link>
          </div>

          {evidence && (
            <p className="rise mt-8 text-sm text-muted-foreground" style={{ "--i": 6 } as React.CSSProperties}>
              {evidence}
            </p>
          )}
        </div>

        <div className="rise" style={{ "--i": 3 } as React.CSSProperties}>
          <HeroCard />
        </div>
      </div>
    </section>
  )
}
