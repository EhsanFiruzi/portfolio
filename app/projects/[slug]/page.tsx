import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CodeXml, ExternalLink, Globe } from "lucide-react"

import { projects, getProject } from "@/data/projects"
import { site } from "@/data/site"
import { asset } from "@/lib/asset"
import { StoreBadge, STORE_LABEL } from "@/components/store-badge"

// صفحه‌ی /projects/<slug>/ دو سطح پایین‌تر از ریشه‌ست
const DEPTH = 2

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const url = `${site.url}/projects/${project.slug}/`
  const image = `${site.url}/${(project.banner ?? project.icon).replace(/^\.?\/+/, "")}`
  const title = `${project.title} — case study`

  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { title, description: project.summary, url, type: "article", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title, description: project.summary, images: [image] },
  }
}

function LinkButton({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors hover:bg-muted"
    >
      {icon}
      {label}
    </a>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 text-muted-foreground">{children}</div>
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function TechList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((t) => (
          <li key={t} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const cs = project.caseStudy
  const published = project.status === "published" && project.downloads.length > 0
  const storeNames = project.downloads.map((d) => STORE_LABEL[d.store]).join(" and ")

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="wrap">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All projects
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-4">
            <div
              className="flex size-16 shrink-0 items-center justify-center rounded-2xl border"
              style={{ background: `color-mix(in oklab, ${project.accent} 15%, transparent)` }}
            >
              <Image
                src={asset(project.icon, DEPTH)}
                alt=""
                width={44}
                height={44}
                className="rounded-lg object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                <bdi lang={project.titleLang}>{project.title}</bdi>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {[project.type === "app" ? "Mobile app" : "Website", project.platform, project.year]
                  .filter(Boolean)
                  .join(", ")}
                {published && `. Published on ${storeNames}`}
                {project.status === "in-progress" && ". In development"}
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90">{project.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.downloads.map((d) => (
              <StoreBadge key={d.url} download={d} depth={DEPTH} />
            ))}
            {project.websiteUrl && (
              <LinkButton href={project.websiteUrl} label="Website" icon={<Globe className="size-4" aria-hidden />} />
            )}
            {project.liveDemoUrl && (
              <LinkButton href={project.liveDemoUrl} label="Live demo" icon={<ExternalLink className="size-4" aria-hidden />} />
            )}
            {project.githubUrl && (
              <LinkButton href={project.githubUrl} label="Source code" icon={<CodeXml className="size-4" aria-hidden />} />
            )}
          </div>
        </header>

        {project.banner && (
          <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border">
            <Image
              src={asset(project.banner, DEPTH)}
              alt={`${project.title} banner`}
              fill
              priority
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem]">
          <div>
            <Section title="Overview">
              <p className="leading-relaxed">{cs.overview}</p>
              {cs.audience && (
                <p className="mt-3 leading-relaxed">
                  <strong className="font-semibold text-foreground">Who it is for: </strong>
                  {cs.audience}
                </p>
              )}
            </Section>

            {cs.problem && (
              <Section title="The problem">
                <p className="leading-relaxed">{cs.problem}</p>
              </Section>
            )}

            {cs.features && cs.features.length > 0 && (
              <Section title="Key features">
                <BulletList items={cs.features} />
              </Section>
            )}

            {cs.screenshots && cs.screenshots.length > 0 && (
              <Section title="Screenshots">
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {cs.screenshots.map((s) => (
                    <li key={s.src} className="relative aspect-[9/19] overflow-hidden rounded-xl border">
                      <Image
                        src={asset(s.src, DEPTH)}
                        alt={s.alt}
                        fill
                        sizes="(min-width: 640px) 220px, 45vw"
                        className="object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {cs.role && cs.role.length > 0 && (
              <Section title="My role">
                <BulletList items={cs.role} />
              </Section>
            )}

            {cs.architecture && cs.architecture.length > 0 && (
              <Section title="Architecture">
                <BulletList items={cs.architecture} />
              </Section>
            )}

            {cs.decisions && cs.decisions.length > 0 && (
              <Section title="Challenges and decisions">
                <dl className="space-y-6">
                  {cs.decisions.map((d) => (
                    <div key={d.title}>
                      <dt className="font-semibold text-foreground">{d.title}</dt>
                      <dd className="mt-1 leading-relaxed">{d.body}</dd>
                    </div>
                  ))}
                </dl>
              </Section>
            )}

            {cs.outcomes && cs.outcomes.length > 0 && (
              <Section title="Results">
                <BulletList items={cs.outcomes} />
              </Section>
            )}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <TechList title="Technologies" items={project.technologies} />
            {project.webTechnologies && project.webTechnologies.length > 0 && (
              <TechList title="Website technologies" items={project.webTechnologies} />
            )}
          </aside>
        </div>
      </div>
    </article>
  )
}
