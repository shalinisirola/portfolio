"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="font-serif text-[clamp(40px,8vw,72px)] font-semibold leading-none text-text">
        Something broke
      </span>
      <span className="mt-5 h-0.5 w-16 bg-accent" />
      <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-muted">
        An unexpected error occurred while rendering this page. You can try
        again.
      </p>
      <Button onClick={reset} variant="solid" className="mt-10">
        Try again
      </Button>
    </main>
  );
}
