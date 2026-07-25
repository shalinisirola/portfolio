# Decisions & Judgment Calls

This document records the non-obvious choices made while translating the
provided design (`Portfolio.dc.html`) into the Next.js 15 build, plus the few
content gaps worth your attention.

## Faithfulness to the design

The source `Portfolio.dc.html` was treated as the spec. Layout, spacing,
typography, colors, animations, and section order were reproduced as closely
as the stack allows. The inline `style`/`style-hover` attributes and the
`renderVals()` theme logic were converted to Tailwind tokens + CSS variables
rather than copied verbatim, but the resulting visuals match.

## Stack & tooling

1. **npm instead of pnpm.** pnpm was not installed on the machine; the prompt
   explicitly allows the npm fallback. All scripts work identically under pnpm.
2. **Tailwind v3 (not v4).** The prompt asked to "extend `tailwind.config.ts`"
   with exact colors/fonts/spacing, which is the v3 workflow. Theme tokens are
   driven by CSS variables so light/dark switch cleanly.
3. **shadcn/ui footprint.** Only the **Button** primitive was added — it's the
   only shadcn component actually used (CTAs, résumé button, icon buttons, form
   submit). Its variants (`solid`, `outline`, `submit`, `icon`) are mapped to
   the design's button styles. `components.json` is included so you can
   `npx shadcn@latest add <component>` later.
4. **Fonts.** Geist Sans/Geist Mono come from the `geist` package (ships the
   font files locally — no build-time network dependency). Playfair Display
   comes through `next/font/google`. All three are exposed as CSS variables.
5. **Icons.** The design uses specific inline SVG paths (Lucide-style but
   hand-tuned). To match pixel-for-pixel, these were reproduced exactly in
   `components/icons.tsx` rather than swapped for the `lucide-react` set.

## Behavior decisions

6. **Mobile menu = dropdown panel, not a side sheet.** The requirements
   mention "hamburger → sheet/drawer," but the actual design renders an
   inline dropdown panel beneath the header (full-width links + résumé
   button). Faithfulness to the design won: the dropdown is implemented as
   designed. Swapping to a shadcn `Sheet` is a small change if you prefer it.
7. **Theme boot script.** A tiny blocking script in `<head>` sets the theme
   class before paint (reads `localStorage` → falls back to system preference),
   matching the original's `kr-portfolio-theme` key and preventing a flash of
   the wrong theme. `ThemeProvider` then owns runtime toggling.
8. **Dark-mode accent.** The original computed lighter accent shades in JS for
   dark mode (`_lighten`). Those values were pre-computed and baked into the
   `.dark` CSS variables (`--accent: #AC865F`, `--accent-strong: #BC9D7E`).
9. **Contact form.** Mirrors the design: client-side only, shows the "message
   has been noted" confirmation on submit (no backend was specified). To make
   it live, wire `onSubmit` in `components/sections/contact.tsx` to an email
   service or route handler.
10. **Typewriter isolated into its own component.** The hero's typing effect
    updates state several times per second. It lives in `Typewriter` so those
    re-renders don't reset the surrounding Framer Motion reveal animations.
11. **Résumé links → real PDF.** The design's résumé links were `href="#"`.
    They now point at the actual résumé bundled in the assets
    (`/Shalini_Sirola_Resume.pdf`).

## Content gaps to fill (your input would help)

- **Production domain.** `site.url` is set to a placeholder
  (`https://shalinisirola.xyz`). Update it to your deployed domain so the
  canonical tag, sitemap, OG, and Twitter metadata are correct.

## Verification

- `npm run typecheck` — passes (TypeScript strict, no `any`).
- `npm run lint` — passes (no warnings or errors).
- `npm run build` — passes; every route is statically prerendered.
- Verified in-browser: hero (light/dark), desktop nav, mobile nav + dropdown,
  theme toggle + persistence, reveal/typewriter animations, all sections.
  No console errors.
