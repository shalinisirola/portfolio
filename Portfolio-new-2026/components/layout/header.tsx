"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { navLinks } from "@/lib/data/site";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "@/components/icons";

function ThemeToggle({ size = 42 }: { size?: number }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      type="button"
      variant="icon"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      style={size !== 42 ? { width: size, height: size } : undefined}
    >
      {theme === "dark" ? <SunIcon size={17} /> : <MoonIcon size={17} />}
    </Button>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu if the viewport grows to desktop width.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-line bg-header backdrop-blur-[14px] transition-colors duration-500">
      <nav className="mx-auto flex h-[74px] max-w-shell items-center justify-between gap-5 px-[clamp(20px,5vw,48px)]">
        <Link
          href="#top"
          className="font-serif text-[25px] font-semibold tracking-[0.12em] text-text"
        >
          SS
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-0.5 min-[900px]:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-[13px] py-[9px] text-[12.5px] font-medium uppercase tracking-[0.14em] text-muted transition-colors hover:text-text hover:underline hover:decoration-accent hover:decoration-[1.5px] hover:underline-offset-[6px]"
            >
              {link.label}
            </Link>
          ))}
          <span className="ml-2.5">
            <ThemeToggle />
          </span>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 min-[900px]:hidden">
          <ThemeToggle size={44} />
          <Button
            type="button"
            variant="icon"
            size="icon"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ width: 44, height: 44 }}
          >
            {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </Button>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div className="flex flex-col border-t border-line bg-bg px-[clamp(20px,5vw,44px)] pb-[22px] pt-3 min-[900px]:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="border-b border-line px-1 py-[14px] text-[13px] font-medium uppercase tracking-[0.14em] text-text"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
