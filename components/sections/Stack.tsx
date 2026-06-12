import type { ReactElement } from "react";
import { Chip } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";
import type { Lang, Localized, StackItem } from "@/content/types";
import { tr } from "@/lib/i18n";

type CategoryGroup = { key: string; category: Localized; items: StackItem[] };

/** Groups the flat stack list by category, preserving data order.
 *  Identity is the (ko, en) pair. A category id on StackItem would be
 *  the upstream fix if categories ever need independent renaming. */
function groupByCategory(items: StackItem[]): CategoryGroup[] {
  const groups: CategoryGroup[] = [];
  for (const item of items) {
    const key = item.category.ko + "|" + item.category.en;
    const existing = groups.find((g) => g.key === key);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.push({ key, category: item.category, items: [item] });
    }
  }
  return groups;
}

export function Stack({
  items,
  heading,
  lang,
}: {
  items: StackItem[];
  heading: Localized;
  lang: Lang;
}): ReactElement {
  return (
    <Section id="stack" no="01" title={tr(heading, lang)}>
      <div className="grid gap-3 sm:grid-cols-2">
        {groupByCategory(items).map((group, i) => (
          <div
            key={group.key}
            className="rounded-card border border-copper bg-card p-4 transition-colors hover:border-copper-2"
          >
            <h3 className="mb-2.5 flex items-center gap-2 font-medium font-mono text-muted text-silk uppercase tracking-widest">
              <span className="rounded border border-amber-line px-1 text-amber text-tag">
                U{i + 1}
              </span>
              {tr(group.category, lang)}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Chip key={item.id}>{tr(item.label, lang)}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
