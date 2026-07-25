import Link from "next/link";

import { navLinks, site } from "@/lib/data/site";
import { footerBlurb, footerTagline } from "@/lib/data/contact";
import {
  ArrowUpIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";

const socials = [
  { label: "GitHub", href: site.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinIcon, external: true },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    Icon: MailIcon,
    external: false,
  },
];

const exploreLinks = navLinks.slice(0, 4);
const connectLinks = [
  ...navLinks.slice(4),
  { label: "Email", href: `mailto:${site.email}` },
  { label: "Résumé", href: site.resumePath },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-cream-soft/70">
      <div className="mx-auto flex max-w-shell flex-wrap justify-between gap-[clamp(40px,6vw,80px)] px-[clamp(20px,5vw,48px)] pt-[clamp(56px,7vw,92px)]">
        <div className="min-w-[280px] max-w-[440px] flex-[1_1_340px]">
          <span className="font-serif text-[28px] font-semibold tracking-[0.06em] text-cream">
            {site.name}
          </span>
          <p className="mt-[18px] font-serif text-[clamp(21px,2vw,27px)] font-medium leading-[1.4] text-cream">
            {footerTagline}
          </p>
          <p className="mt-4 max-w-[42ch] text-[14.5px] leading-[1.7] text-cream-soft/[0.58]">
            {footerBlurb}
          </p>
          <div className="mt-7 flex gap-3">
            {socials.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/20 text-cream-soft/80 transition-colors hover:border-accent-strong hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-[clamp(40px,5vw,76px)]">
          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Connect" links={connectLinks} />
        </div>
      </div>

      <div className="mx-auto mt-[clamp(44px,5vw,72px)] flex max-w-shell flex-wrap items-center justify-between gap-3.5 border-t border-white/[0.12] px-[clamp(20px,5vw,48px)] py-[26px]">
        <span className="text-[13px] text-cream-soft/60">
          © {year} {site.name}. All rights reserved.
        </span>
        <Link
          href="#top"
          className="inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-cream-soft/70 transition-colors hover:text-white"
        >
          Back to top
          <ArrowUpIcon size={14} />
        </Link>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col">
      <span className="mb-[18px] text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-soft/50">
        {title}
      </span>
      {links.map((link) => {
        const isResume = link.href === site.resumePath;
        const isHash = link.href.startsWith("#");
        const className =
          "py-[7px] text-[14.5px] text-cream-soft/70 transition-colors hover:text-white hover:underline hover:underline-offset-4";
        if (isHash) {
          return (
            <Link key={link.label} href={link.href} className={className}>
              {link.label}
            </Link>
          );
        }
        return (
          <a
            key={link.label}
            href={link.href}
            {...(isResume ? { download: true } : {})}
            className={className}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
