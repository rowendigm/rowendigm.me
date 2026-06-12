import type { ReactElement } from "react";
import { Section } from "@/components/ui/Section";
import type { HistoryItem, Lang, Localized } from "@/content/types";
import { tr } from "@/lib/i18n";

export function Career({
  items,
  heading,
  lang,
}: {
  items: HistoryItem[];
  heading: Localized;
  lang: Lang;
}): ReactElement {
  return (
    <Section id="career" no="05" title={tr(heading, lang)}>
      <ol className="flex flex-col gap-7 border-copper border-l-2 pl-6">
        {items.map((item) => (
          <li key={item.id} className="relative">
            <span
              aria-hidden
              className="-left-tl-dot-offset absolute top-1 size-tl-dot rounded-full border-2 border-amber bg-board"
            />
            <span className="font-medium font-mono text-amber text-year tabular-nums tracking-wider">
              {item.year}
            </span>
            <h3 className="mt-0.5 font-bold text-card-title text-ink">
              {tr(item.title, lang)}
            </h3>
            <p className="mt-1.5 max-w-prose text-body text-card-body">
              {tr(item.body, lang)}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
