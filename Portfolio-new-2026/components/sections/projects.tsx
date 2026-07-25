import { projects } from "@/lib/data/projects";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { EyeIcon, ArrowUpRightIcon } from "@/components/icons";

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-[84px] bg-espresso text-cream-soft"
    >
      <div className="mx-auto max-w-shell px-[clamp(20px,5vw,48px)] py-[clamp(76px,11vw,134px)]">
        <SectionHeading title="Projects" light />

        <RevealGroup className="mt-[clamp(48px,7vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-6">
          {projects.map((project, index) => (
            <RevealItem
              key={project.title}
              index={index}
              as="article"
              className="group flex flex-col rounded border border-white/[0.13] bg-white/[0.02] p-[clamp(26px,2.6vw,38px)] transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:bg-white/[0.045]"
            >
              <h3 className="font-serif text-[29px] font-semibold text-cream">
                {project.title}
              </h3>
              <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.16em] text-cream-soft/55">
                {project.category}
              </span>
              <p className="mt-5 text-[15px] leading-[1.7] text-cream-soft/70">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/[0.18] px-[11px] py-[5px] text-[11.5px] font-medium text-cream-soft/[0.78]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-[26px] flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[7px] text-[13.5px] font-semibold tracking-[0.04em] text-cream-soft transition-colors group-hover:text-accent-strong hover:text-accent-strong"
                >
                  <EyeIcon size={15} />
                  View Code
                </a>
                {project.demoHref && (
                  <a
                    href={project.demoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[7px] text-[13.5px] font-semibold tracking-[0.04em] text-cream-soft transition-colors group-hover:text-accent-strong hover:text-accent-strong"
                  >
                    <ArrowUpRightIcon size={15} />
                    Live Demo
                  </a>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
