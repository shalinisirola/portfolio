"use client";

import { useState, type FormEvent } from "react";

import type { ContactChannel } from "@/lib/data/types";
import { contactChannels, contactIntro } from "@/lib/data/contact";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/icons";
import { useToast } from "@/components/ui/toast";

const channelIcon: Record<ContactChannel["icon"], typeof MailIcon> = {
  email: MailIcon,
  phone: PhoneIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

const fieldClass =
  "w-full rounded border border-line bg-surface px-[15px] py-3.5 text-[15px] text-text transition-colors focus:border-accent focus:outline-none";

const labelClass = "mb-2 block text-[13px] text-muted";

type Status = "idle" | "sending";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const { toast } = useToast();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error || "Something went wrong.");
      }
      form.reset();
      toast(
        "Thanks — your message is on its way. I'll get back to you soon.",
        "success",
      );
    } catch (err) {
      toast(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email me directly.",
        "error",
      );
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-[84px] bg-surface-2 transition-colors duration-500"
    >
      <div className="mx-auto max-w-content px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,128px)]">
        <SectionHeading title="Get in Touch" />
        <Reveal
          as="p"
          delay={0.1}
          className="mx-auto mt-7 max-w-[560px] text-center text-[17px] leading-[1.7] text-muted"
        >
          {contactIntro}
        </Reveal>

        <div className="mt-[clamp(48px,7vw,76px)] grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(36px,5vw,64px)]">
          {/* Form */}
          <Reveal direction="right">
            <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-text">
              Send a Message
            </div>
            <form
              onSubmit={onSubmit}
              className="relative mt-[22px] flex flex-col gap-[18px]"
            >
              {/* Honeypot — hidden from people, catches bots */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[18px]">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    autoComplete="name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    autoComplete="email"
                    className={fieldClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Your message..."
                  className={`${fieldClass} resize-y`}
                />
              </div>
              <Button
                type="submit"
                variant="submit"
                size="block"
                className="mt-1"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </Reveal>

          {/* Channels */}
          <Reveal direction="left" delay={0.1}>
            <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-text">
              Contact Info
            </div>
            <div className="mt-[22px] flex flex-col gap-3.5">
              {contactChannels.map((channel) => {
                const Icon = channelIcon[channel.icon];
                const external =
                  channel.icon === "github" || channel.icon === "linkedin";
                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-4 rounded border border-line bg-surface px-5 py-[18px] text-text transition hover:translate-x-[3px] hover:border-accent"
                  >
                    <span className="flex-shrink-0 text-accent">
                      <Icon size={20} />
                    </span>
                    <span className="text-[15px]">{channel.label}</span>
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
