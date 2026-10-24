import Image from "next/image"
import { Calendar, CodeXml, ExternalLink, Globe, Smartphone } from "lucide-react"

import type { Project, StoreId } from "@/types/project"
import { asset } from "@/lib/asset"

// تصویرهای رسمی فروشگاه‌ها (همونایی که تو public داری)
const STORE_IMAGE: Record<StoreId, { src: string; alt: string }> = {
  myket: { src: "myket-get-en.png", alt: "Get it on Myket" },
  bazaar: { src: "get-cafebazaar-en.png", alt: "Get it on Cafe Bazaar" },
  googlePlay: { src: "google-paly-download.svg", alt: "Get it on Google Play" },
}

function ActionButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
    >
      {children}
    </a>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const { accent, banner } = project

  return (
    <article
      className="group relative isolate min-h-72 overflow-hidden rounded-2xl text-white ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* پس‌زمینه: بنر یا کاورِ ساخته‌شده از رنگ پروژه */}
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
            background: `radial-gradient(110% 120% at 100% 0%, color-mix(in oklab, ${accent} 75%, black), transparent 65%), radial-gradient(90% 100% at 0% 100%, color-mix(in oklab, ${accent} 45%, black), transparent 70%), color-mix(in oklab, ${accent} 25%, #0b0d1a)`,
          }}
        >
          <div className="bg-dots absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <Image
            src={asset(project.icon)}
            alt=""
            width={220}
            height={220}
            className="absolute -right-8 -top-8 size-56 rotate-12 object-contain opacity-15 blur-[1px] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
          />
        </div>
      )}

      {/* گرادیانت خوانایی متن */}
      <div
        aria-hidden
        className={
          banner
            ? "absolute inset-0 -z-10 bg-linear-to-b from-black/50 via-black/70 to-black/90"
            : "absolute inset-0 -z-10 bg-linear-to-b from-black/10 via-black/35 to-black/80"
        }
      />

      <div className="relative flex h-full min-h-72 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Image src={asset(project.icon)} alt="" width={32} height={32} className="rounded-md object-contain" />
          </div>
          <h3 className="truncate text-xl font-bold">
            <bdi>{project.title}</bdi>
          </h3>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-white/90">{project.description}</p>

        <ul className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded-lg bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-3 pt-6 text-sm text-white/70">
          <span className="flex items-center gap-1">
            {project.type === "app" ? <Smartphone size={16} /> : <Globe size={16} />}
            {project.type.toUpperCase()}
          </span>
          {project.year && (
            <span className="flex items-center gap-1">
              <Calendar size={15} />
              {project.year}
            </span>
          )}

          <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
            {project.githubUrl && (
              <ActionButton href={project.githubUrl} label={`${project.title} source code`}>
                <CodeXml size={18} />
              </ActionButton>
            )}
            {project.liveDemoUrl && (
              <ActionButton href={project.liveDemoUrl} label={`${project.title} live demo`}>
                <ExternalLink size={18} />
              </ActionButton>
            )}
            {project.downloads.map((d) => (
              <a
                key={d.url}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:scale-105"
              >
                <Image
                  src={asset(STORE_IMAGE[d.store].src)}
                  alt={STORE_IMAGE[d.store].alt}
                  width={150}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
