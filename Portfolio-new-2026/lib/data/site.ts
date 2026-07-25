import type { NavLink, SocialLink } from "./types";

export const site = {
  name: "Shalini Singh Sirola",
  initials: "SS",
  role: "Full-Stack Developer & ML Enthusiast",
  title: "Shalini Singh Sirola — Full-Stack Developer & ML Enthusiast",
  description:
    "Computer Science Engineering student (CGPA: 9.14) with a strong foundation in Data Structures and Algorithms, object-oriented programming, and the MERN stack. Passionate about data-driven solutions, machine learning, and backend development.",
  url: "https://shalinisirola.xyz",
  email: "shalinisirola@gmail.com",
  github: "https://github.com/shalinisirola",
  githubHandle: "github.com/shalinisirola",
  linkedin: "https://linkedin.com/in/shalinisirola",
  resumePath: "/Shalini_Sirola_Resume.pdf",
  accent: "#000000",
} as const;

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: site.github, icon: "github" },
  { label: "LinkedIn", href: site.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${site.email}`, icon: "email" },
];
