import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { contacts } from "@/data/site"
import { asset } from "@/lib/asset"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"
import { SpotlightCard } from "@/components/spotlight-card"

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 scroll-mt-24 py-20">
      <div className="wrap">
        <SectionHeading
          title="Have an app or backend in mind?"
          description="Send me a message. Telegram is the fastest way to reach me."
        />

        <ul className="grid gap-4 sm:grid-cols-2">
          {contacts.map((c, i) => (
            <li key={c.title} className={cn(i === 0 && "sm:col-span-2")}>
              <SpotlightCard accent={c.color}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("group flex items-center gap-4 p-5", i === 0 && "sm:p-7")}
                >
                  <span
                    className={cn(
                      "flex shrink-0 items-center justify-center rounded-xl",
                      i === 0 ? "size-14" : "size-11"
                    )}
                    style={{ background: `color-mix(in oklab, ${c.color} 16%, transparent)` }}
                  >
                    <Image
                      src={asset(c.icon)}
                      alt=""
                      width={i === 0 ? 30 : 24}
                      height={i === 0 ? 30 : 24}
                      className={cn("object-contain", c.invertInDark && "dark:invert")}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("block font-semibold", i === 0 && "text-lg")}>{c.title}</span>
                    <span className="block truncate text-sm text-muted-foreground">{c.handle}</span>
                  </span>
                  <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
