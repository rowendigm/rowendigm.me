import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

/** The single green online dot (ADR 0007). Pulse is opt-in. */
export function Led({
  pulse = false,
  className,
}: {
  pulse?: boolean;
  className?: string;
}): ReactElement {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-led rounded-full bg-online shadow-led",
        pulse && "animate-led-pulse",
        className,
      )}
    />
  );
}
