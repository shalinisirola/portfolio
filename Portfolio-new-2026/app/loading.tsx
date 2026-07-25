export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-5">
        <span className="font-serif text-[64px] font-semibold tracking-[0.12em] text-text">
          KR
        </span>
        <span className="h-0.5 w-12 animate-pulse bg-accent" />
      </div>
    </div>
  );
}
