import type { ReactElement } from "react";
import { Bold } from "./Bold";
import { Tag, type TagVariant } from "./Tag";

/** A resolved, render-ready card. Sections map content slices into this
 *  (track to variant, localized fields to strings) — ui never reads content. */
export type CardItem = {
  id: string;
  kindLabel: string;
  variant: TagVariant;
  tagLabel: string;
  title: string;
  body: string;
};

export function CardList({ items }: { items: CardItem[] }): ReactElement {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-card border border-copper bg-card p-5 transition-colors hover:border-copper-2"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-medium font-mono text-muted text-tag uppercase tracking-wider">
              {item.kindLabel}
            </span>
            <h3 className="font-bold text-card-title text-ink tracking-tight">
              {item.title}
            </h3>
            <Tag variant={item.variant} className="ml-auto">
              {item.tagLabel}
            </Tag>
          </div>
          <p className="mt-2 text-body text-card-body">
            <Bold text={item.body} />
          </p>
        </article>
      ))}
    </div>
  );
}
