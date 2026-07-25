import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  title: string;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("text-center", className)}>
      <h2
        className={cn(
          "font-serif text-[clamp(40px,6.5vw,76px)] font-semibold tracking-[-0.01em]",
          light ? "text-cream" : "text-text",
        )}
      >
        {title}
      </h2>
      <span className="mx-auto mt-5 block h-0.5 w-16 bg-accent" />
    </Reveal>
  );
}
