export function PendingFallback() {
  return (
    <section aria-label="Loading" className="flex h-full flex-col items-center justify-center pt-16">
      <div className="inline-block animate-spin p-2 text-2xl opacity-1 transition delay-300 duration-500">⍥</div>
    </section>
  );
}
