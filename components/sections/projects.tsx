import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"

export function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 scroll-mt-24 py-20">
      <div className="wrap">
        <SectionHeading
          title="Projects"
          description="Apps I designed, built and published myself."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
