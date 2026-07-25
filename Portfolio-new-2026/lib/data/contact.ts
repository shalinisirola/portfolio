import type { ContactChannel } from "./types";
import { site } from "./site";

export const contactIntro =
  "I'm always open to discussing new projects, internships, or opportunities to build something meaningful. Let's connect.";

export const contactChannels: ContactChannel[] = [
  { label: site.email, href: `mailto:${site.email}`, icon: "email" },
  { label: site.githubHandle, href: site.github, icon: "github" },
  { label: "LinkedIn", href: site.linkedin, icon: "linkedin" },
];

export const footerTagline = "Let's build something meaningful together.";

export const footerBlurb =
  "Open to internship and new-grad opportunities across backend, data, and full-stack engineering.";
