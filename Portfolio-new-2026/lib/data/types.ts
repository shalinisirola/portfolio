export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  type: string;
  commitment: "Full-time" | "Part-time";
  points: string[];
}

export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  href: string;
  demoHref?: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
  /** When true, the group spans the full grid width. */
  full?: boolean;
}

export type AchievementIcon = "star" | "trophy" | "graduation";

export interface Achievement {
  icon: AchievementIcon;
  title: string;
  subtitle: string;
  tag: string;
}

export interface EducationItem {
  period: string;
  degree: string;
  field: string;
  institution: string;
  score: string;
}

export interface ContactChannel {
  label: string;
  href: string;
  icon: "email" | "phone" | "github" | "linkedin";
}
