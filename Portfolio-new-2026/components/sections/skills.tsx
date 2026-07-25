import { skillGroups } from "@/lib/data/skills";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-[84px]">
      <div className="mx-auto max-w-content px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,128px)]">
        <SectionHeading title="Skills" />

        <RevealGroup className="mt-[clamp(48px,7vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[clamp(40px,5vw,72px)]">
          {skillGroups.map((group, index) => (
            <RevealItem
              key={group.title}
              index={index}
              className={group.full ? "col-span-full" : undefined}
            >
              <div className="border-b border-line pb-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-text">
                {group.title}
              </div>
              <div className="mt-[22px] flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded border border-line bg-surface px-4 py-[9px] text-sm text-muted transition-colors duration-200 hover:border-accent hover:bg-espresso hover:text-cream"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
