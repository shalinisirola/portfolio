import { aboutLede, aboutParagraphs, aboutStats } from "@/lib/data/hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CountUp } from "@/components/sections/count-up";

export function About() {
  return (
    <section id="about" className="scroll-mt-[84px]">
      <div className="mx-auto max-w-content px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,128px)]">
        <SectionHeading title="About" />

        <div className="mt-[clamp(48px,7vw,84px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-[clamp(36px,5vw,72px)]">
          <Reveal className="col-span-2 min-w-0">
            <p className="font-serif text-[clamp(24px,2.6vw,34px)] font-medium leading-[1.4] text-text">
              {aboutLede}
            </p>
            {aboutParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`${index === 0 ? "mt-7" : "mt-[18px]"} max-w-[62ch] text-[17px] leading-[1.75] text-muted`}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <RevealGroup className="flex flex-col gap-[38px] border-l border-line pl-[clamp(0px,2vw,28px)]">
            {aboutStats.map((stat, index) => (
              <RevealItem key={stat.label} index={index}>
                <CountUp
                  value={stat.value}
                  className="font-serif text-[54px] font-semibold leading-none text-text"
                />
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {stat.label}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
