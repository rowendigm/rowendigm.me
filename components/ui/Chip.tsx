import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small board chip. The mono variant is the amber hero-meta style. */
export function Chip({
  variant = "default",
  children,
  className,
}: {
  variant?: "default" | "mono";
  children: ReactNode;
  className?: string;
}): ReactElement {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1",
        variant === "mono"
          ? "border-amber-line bg-amber-dim font-mono text-amber-2 text-silk-lg tracking-wider"
          : "border-copper bg-chip-bg font-medium text-body text-chip",
        className,
      )}
    >
      {children}
    </span>
  );
}
