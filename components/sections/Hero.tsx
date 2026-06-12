import type { ReactElement } from "react";
import { Bold } from "@/components/ui/Bold";
import { Chip } from "@/components/ui/Chip";
import { Led } from "@/components/ui/Led";
import type { FlowChip, Headline, Lang, Localized } from "@/content/types";
import { tr } from "@/lib/i18n";

export function Hero({
  badge,
  headline,
  bio,
  flow,
  lang,
}: {
  badge: Localized;
  headline: Headline;
  bio: Localized;
  flow: FlowChip[];
  lang: Lang;
}): ReactElement {
  return (
    <header className="mb-16">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-copper bg-card px-3 py-1.5 font-medium font-mono text-muted text-silk uppercase tracking-widest">
        <Led pulse />
        {tr(badge, lang)}
      </div>
      <h1 className="font-extrabold text-hero text-ink tracking-tight">
        {tr(headline.lead, lang)}{" "}
        <span className="text-amber">{tr(headline.accent, lang)}</span>
      </h1>
      <p className="mt-4 max-w-prose text-bio text-body">
        <Bold text={tr(bio, lang)} />
      </p>
      <div className="mt-7 flex flex-wrap gap-2">
        {flow.map((chip) => (
          <Chip key={chip.id} variant="mono">
            {chip.label}
          </Chip>
        ))}
      </div>
    </header>
  );
}
