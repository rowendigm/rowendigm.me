import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Presentation variants live here; mapping content state to a variant is
 *  the sections' job (dependency direction: ui never reads content). */
export type TagVariant = "now" | "plan" | "side" | "oss";

const styles: Record<TagVariant, string> = {
  now: "border-amber-line bg-amber-dim text-amber-2",
  plan: "border-copper-2 bg-transparent text-muted",
  side: "border-amber-line border-dashed bg-transparent text-amber-2",
  oss: "border-amber-line bg-transparent text-amber-2",
};

export function Tag({
  variant,
  children,
  className,
}: {
  variant: TagVariant;
  children: ReactNode;
  className?: string;
}): ReactElement {
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full border px-2 py-0.5 font-medium font-mono text-tag uppercase tracking-widest",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
