import Image from "next/image"
import { ArrowUpRight, Download, Mail } from "lucide-react"

import { contacts, site } from "@/data/site"
import { asset } from "@/lib/asset"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

export function ContactSection() {
  const hasPrimary = Boolean(site.email || site.resume)

  return (
    <section id="contact" className="relative z-10 scroll-mt-24 py-20">
      <div className="wrap">
        <SectionHeading
          title="Contact"
          description="Questions, project ideas or opportunities: pick whichever channel suits you."
        />

        {hasPrimary && (
          <div className="mb-6 flex flex-wrap gap-3">
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-signal px-6 text-sm font-semibold text-signal-foreground transition-transform hover:-translate-y-0.5"
              >
                <Mail className="size-4" aria-hidden />
                {site.email}
              </a>
            )}
            {site.resume && (
              <a
                href={asset(site.resume)}
                download
                className="inline-flex h-11 items-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors hover:bg-muted"
              >
                <Download className="size-4" aria-hidden />
                Download CV
              </a>
            )}
          </div>
        )}

        <ul className="grid gap-4 sm:grid-cols-2">
          {contacts.map((c) => (
            <li key={c.title}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-signal/60"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Image
                    src={asset(c.icon)}
                    alt=""
                    width={24}
                    height={24}
                    className={cn("object-contain", c.invertInDark && "dark:invert")}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{c.label}</span>
                  <span className="block truncate text-sm text-muted-foreground">{c.handle}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
