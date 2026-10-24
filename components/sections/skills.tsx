import Image from "next/image"
import Link from "next/link"

import { skillGroups } from "@/data/skills"
import { getProject } from "@/data/projects"
import { asset } from "@/lib/asset"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"
import type { SkillItem } from "@/types/skill"

function meta(item: SkillItem) {
  return [item.years ? `${item.years} ${item.years === 1 ? "yr" : "yrs"}` : null, item.note].filter(Boolean).join(", ")
}

function Skill({ item }: { item: SkillItem }) {
  const used = (item.projects ?? []).map(getProject).filter((p) => p !== undefined)
  const details = meta(item)

  return (
    <li className="flex items-start gap-3 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        {item.icon ? (
          <Image
            src={asset(item.icon)}
            alt=""
            width={22}
            height={22}
            className={cn("object-contain", item.invertInDark && "dark:invert")}
          />
        ) : (
          <span aria-hidden className="text-xs font-semibold text-muted-foreground">
            {item.name.slice(0, 2)}
          </span>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium leading-tight">
          {item.name}
          {details && <span className="ml-2 text-xs font-normal text-muted-foreground">{details}</span>}
        </p>
        {used.length > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            Used in{" "}
            {used.map((p, i) => (
              <span key={p.slug}>
                {i > 0 && ", "}
                <Link
                  href={`/projects/${p.slug}/`}
                  className="font-medium text-foreground underline decoration-signal/50 underline-offset-2 hover:decoration-signal"
                >
                  <bdi lang={p.titleLang}>{p.title}</bdi>
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </li>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 scroll-mt-24 py-20">
      <div className="wrap">
        <SectionHeading title="Skills" description="What I work with, and where you can see it in use." />

        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.id} className="rounded-2xl border bg-card p-5 sm:p-6">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
              <ul className="mt-3 divide-y">
                {group.items.map((item) => (
                  <Skill key={item.name} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
