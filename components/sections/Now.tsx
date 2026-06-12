import type { ReactElement } from "react";
import { Bold } from "@/components/ui/Bold";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import type { Lang, Localized, NowItem } from "@/content/types";
import { tr } from "@/lib/i18n";

export function Now({
  items,
  heading,
  lang,
}: {
  items: NowItem[];
  heading: Localized;
  lang: Lang;
}): ReactElement {
  return (
    <Section id="now" no="02" title={tr(heading, lang)}>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-card border border-copper bg-card p-5 transition-colors hover:border-copper-2"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="font-bold text-card-title text-ink tracking-tight">
                {tr(item.name, lang)}
              </h3>
              <Tag variant="now">{tr(item.tag, lang)}</Tag>
            </div>
            <p className="mt-2 text-body text-card-body">
              <Bold text={tr(item.desc, lang)} />
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
