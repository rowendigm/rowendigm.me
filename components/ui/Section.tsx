import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";

/** Section shell: spacing, sticky-nav anchor offset, silkscreen header. */
export function Section({
  id,
  title,
  no,
  count,
  children,
  className,
}: {
  id: string;
  title: string;
  no: string;
  count?: string;
  children: ReactNode;
  className?: string;
}): ReactElement {
  return (
    <section id={id} className={cn("mt-14 scroll-mt-nav-offset", className)}>
      <SectionLabel title={title} no={no} count={count} />
      {children}
    </section>
  );
}
