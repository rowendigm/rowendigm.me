import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

/** Silkscreen section header: title, mono amber number, optional count. */
export function SectionLabel({
  title,
  no,
  count,
  className,
}: {
  title: string;
  no: string;
  count?: string;
  className?: string;
}): ReactElement {
  return (
    <div className={cn("mb-4 flex items-baseline gap-3", className)}>
      <h2 className="font-bold text-ink text-section tracking-tight">
        {title}
      </h2>
      <span
        aria-hidden
        className="font-medium font-mono text-amber text-silk-lg tabular-nums tracking-widest"
      >
        {no}
      </span>
      {count && (
        <span className="ml-auto whitespace-nowrap font-mono text-faint text-silk tracking-wider">
          {count}
        </span>
      )}
    </div>
  );
}
