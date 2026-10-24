import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Calendar, CodeXml, ExternalLink, Globe, Smartphone } from "lucide-react"

import type { Project } from "@/types/project"
import { asset } from "@/lib/asset"
import { StoreBadge } from "@/components/store-badge"

function ActionButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative z-10 flex size-10 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
    >
      {children}
    </a>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const { accent, banner } = project
  const TypeIcon = project.type === "app" ? Smartphone : Globe

  return (
    <article className="group relative isolate min-h-80 overflow-hidden rounded-2xl text-white ring-1 ring-white/10 transition-all duration-300 focus-within:ring-2 focus-within:ring-signal hover:-translate-y-1 hover:shadow-2xl">
      {banner ? (
        <Image
          src={asset(banner)}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 -z-20"
          style={{
            background: `radial-gradient(110% 120% at 100% 0%, color-mix(in oklab, ${accent} 75%, black), transparent 65%), color-mix(in oklab, ${accent} 25%, #0b0d1a)`,
          }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/50 via-black/70 to-black/90"
      />

      {/* عمداً relative نیست: لینک تمام‌کارت (after) باید نسبت به خود article باشه */}
      <div className="flex h-full min-h-80 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Image src={asset(project.icon)} alt="" width={32} height={32} className="rounded-md object-contain" />
          </div>
          <h3 className="min-w-0 flex-1 text-xl font-bold">
            <Link
              href={`/projects/${project.slug}/`}
              className="block truncate rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              <bdi lang={project.titleLang}>{project.title}</bdi>
              <span className="sr-only"> — case study</span>
            </Link>
          </h3>
          <ArrowUpRight
            aria-hidden
            className="size-5 shrink-0 text-white/60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
          />
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/90">{project.summary}</p>

        <ul className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded-lg bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-3 pt-6 text-sm text-white/75">
          <span className="flex items-center gap-1">
            <TypeIcon size={16} aria-hidden />
            {project.type === "app" ? "Mobile app" : "Website"}
          </span>
          {project.year && (
            <span className="flex items-center gap-1">
              <Calendar size={15} aria-hidden />
              {project.year}
            </span>
          )}

          <div className="relative z-10 ml-auto flex flex-wrap items-center justify-end gap-2">
            {project.githubUrl && (
              <ActionButton href={project.githubUrl} label={`${project.title} source code on GitHub`}>
                <CodeXml size={18} aria-hidden />
              </ActionButton>
            )}
            {project.liveDemoUrl && (
              <ActionButton href={project.liveDemoUrl} label={`${project.title} live demo`}>
                <ExternalLink size={18} aria-hidden />
              </ActionButton>
            )}
            {project.downloads.map((d) => (
              <StoreBadge key={d.url} download={d} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
