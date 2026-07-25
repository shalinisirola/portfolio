import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="font-serif text-[clamp(72px,16vw,160px)] font-semibold leading-none text-text">
        404
      </span>
      <span className="mt-4 h-0.5 w-16 bg-accent" />
      <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-muted">
        This page wandered off the map. Let&apos;s get you back to the work.
      </p>
      <Button asChild variant="solid" className="mt-10">
        <Link href="/">Back home</Link>
      </Button>
    </main>
  );
}
