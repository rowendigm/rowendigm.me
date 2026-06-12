import type { ReactElement } from "react";

export default function NotFound(): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3">
      <p className="font-mono text-amber text-section tabular-nums">404</p>
      <a
        href="/"
        className="text-body text-chip underline-offset-4 hover:text-ink hover:underline"
      >
        rowendigm.me
      </a>
    </main>
  );
}
