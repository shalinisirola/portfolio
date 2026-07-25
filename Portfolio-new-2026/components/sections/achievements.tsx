import type { AchievementIcon } from "@/lib/data/types";
import { achievements } from "@/lib/data/achievements";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { GraduationIcon, StarIcon, TrophyIcon } from "@/components/icons";

const iconMap: Record<AchievementIcon, typeof StarIcon> = {
  star: StarIcon,
  trophy: TrophyIcon,
  graduation: GraduationIcon,
};

export function Achievements() {
  return (
    <section
      id="achievements"
      className="scroll-mt-[84px] bg-surface-2 transition-colors duration-500"
    >
      <div className="mx-auto max-w-content px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,128px)]">
        <SectionHeading title="Achievements" />

        <RevealGroup className="mt-[clamp(48px,7vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[22px]">
          {achievements.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <RevealItem
                key={item.title}
                index={index}
                className="group rounded border border-line bg-surface px-[30px] py-[34px] text-center text-text transition duration-300 hover:-translate-y-[5px] hover:border-espresso hover:bg-espresso hover:text-cream hover:shadow-card"
              >
                <span className="inline-flex text-accent group-hover:text-accent-strong">
                  <Icon size={30} />
                </span>
                <h3 className="mt-[18px] font-serif text-[23px] font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14.5px] opacity-60">{item.subtitle}</p>
                <span className="mt-4 inline-block rounded bg-accent/[0.13] px-3.5 py-[7px] text-[12.5px]">
                  {item.tag}
                </span>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
