"use client";

import { useEffect, useRef } from "react";

import { heroIntro, heroTypingPhrase } from "@/lib/data/hero";
import { site } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { DownloadIcon, EyeIcon } from "@/components/icons";
import { Typewriter } from "@/components/sections/typewriter";
import { HeroParticles } from "@/components/sections/hero-particles";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const play = video.play();
    if (play) play.catch(() => undefined);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-74px)] flex-col overflow-hidden scroll-mt-[84px]"
    >
      {/* Animated constellation background */}
      <HeroParticles />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-wrap items-center gap-[clamp(28px,4vw,64px)] px-[clamp(20px,5vw,48px)] py-[clamp(24px,4vw,48px)]">
        {/* Left column */}
        <div className="min-w-[280px] flex-[1_1_360px] text-left">
          <Reveal
            as="span"
            className="block text-[13px] font-semibold uppercase tracking-[0.34em] text-muted"
          >
            {site.role}
          </Reveal>
          <Reveal
            as="h1"
            delay={0.05}
            className="mt-4 font-serif text-[clamp(40px,7vw,80px)] font-medium leading-[1.0] tracking-[-0.02em] text-text"
          >
            {site.name}
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-5 max-w-[540px] text-[clamp(16px,1.5vw,20px)] leading-[1.6] text-muted"
          >
            {heroIntro}
          </Reveal>
          <Reveal delay={0.2} className="mt-7 flex flex-wrap gap-[14px]">
            <Button asChild variant="solid">
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#projects">View Work</a>
            </Button>
          </Reveal>
          <Reveal delay={0.28} className="mt-6 flex flex-wrap gap-7">
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent hover:underline hover:decoration-[1.5px] hover:underline-offset-[5px]"
            >
              <EyeIcon size={15} />
              View Résumé
            </a>
            <a
              href={site.resumePath}
              download
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent hover:underline hover:decoration-[1.5px] hover:underline-offset-[5px]"
            >
              <DownloadIcon size={15} />
              Download Résumé
            </a>
          </Reveal>
        </div>

        {/* Right column — terminal + video */}
        <Reveal
          direction="left"
          delay={0.15}
          className="flex min-w-[300px] flex-[1_1_400px] flex-col items-center gap-[18px]"
        >
          <Typewriter phrase={heroTypingPhrase} />
          <div className="relative w-[min(480px,100%)]">
            <span
              aria-hidden
              className="absolute -bottom-[18px] -right-[18px] left-[18px] top-[18px] rounded-xl border-[1.5px] border-accent"
            />
            <span
              aria-hidden
              className="absolute -left-2.5 -top-2.5 h-[54px] w-[54px] rounded-full border-[1.5px] border-line bg-bg"
            />
            <div className="relative overflow-hidden rounded-xl border border-line shadow-hero">
              <video
                ref={videoRef}
                src="/media/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Looping animation of code being written"
                className="block w-full"
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll hint */}
      <div className="flex flex-col items-center gap-3 pb-[clamp(20px,3vw,40px)]">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <span className="relative h-[46px] w-px overflow-hidden bg-line">
          <span className="absolute -left-[1.5px] top-0 h-[10px] w-1 animate-scrolldot rounded-sm bg-accent" />
        </span>
      </div>
    </section>
  );
}
