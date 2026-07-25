import { education } from "@/lib/data/education";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function Education() {
  return (
    <section
      id="education"
      className="relative scroll-mt-[84px] overflow-hidden"
    >
      {/* Decorative node network */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          className="block"
          viewBox="0 0 1200 600"
          fill="none"
        >
          <g stroke="var(--border)" strokeWidth="1">
            <path d="M80 120L300 220L520 90M300 220L420 400M520 90L760 180L980 120M760 180L880 380M980 120L1120 300M420 400L660 480L880 380M660 480L760 180" />
          </g>
          <g fill="var(--accent)" opacity="0.5">
            <circle cx="80" cy="120" r="3" />
            <circle cx="300" cy="220" r="3" />
            <circle cx="520" cy="90" r="3" />
            <circle cx="760" cy="180" r="3" />
            <circle cx="980" cy="120" r="3" />
            <circle cx="420" cy="400" r="3" />
            <circle cx="660" cy="480" r="3" />
            <circle cx="880" cy="380" r="3" />
            <circle cx="1120" cy="300" r="3" />
          </g>
        </svg>
      </div>

      <div className="relative mx-auto max-w-content px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,128px)]">
        <SectionHeading title="Education" />

        <RevealGroup className="mt-[clamp(48px,7vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[22px]">
          {education.map((item, index) => (
            <RevealItem
              key={item.degree}
              index={index}
              as="article"
              className="rounded border border-line bg-surface px-[30px] py-[34px] transition-colors duration-500"
            >
              <span className="text-[12.5px] font-semibold tracking-[0.14em] text-muted">
                {item.period}
              </span>
              <h3 className="mt-3.5 font-serif text-[25px] font-semibold text-text">
                {item.degree}
              </h3>
              <p className="mt-1.5 text-[15.5px] font-medium text-text">
                {item.field}
              </p>
              <p className="mt-2.5 text-[14.5px] leading-[1.5] text-muted">
                {item.institution}
              </p>
              <span className="mt-5 inline-block rounded bg-espresso px-3.5 py-2 text-[13px] font-semibold text-cream">
                {item.score}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
