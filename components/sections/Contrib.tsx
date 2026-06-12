import type { ReactElement } from "react";
import { CardList } from "@/components/ui/CardList";
import { Section } from "@/components/ui/Section";
import type { ContribItem, Lang, Localized, UiStrings } from "@/content/types";
import { tr } from "@/lib/i18n";

export function Contrib({
  items,
  heading,
  tags,
  lang,
}: {
  items: ContribItem[];
  heading: Localized;
  tags: UiStrings["tags"];
  lang: Lang;
}): ReactElement {
  return (
    <Section id="contrib" no="04" title={tr(heading, lang)}>
      <CardList
        items={items.map((item) => ({
          id: item.id,
          kindLabel: tr(item.kind, lang),
          variant: "oss",
          tagLabel: tr(tags.oss, lang),
          title: tr(item.title, lang),
          body: tr(item.body, lang),
        }))}
      />
    </Section>
  );
}
