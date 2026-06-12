import type { ReactElement } from "react";
import type { ContactLink, Lang, Localized } from "@/content/types";
import { tr } from "@/lib/i18n";

export function Footer({
  contact,
  personal,
  lang,
}: {
  contact: ContactLink[];
  personal: Localized;
  lang: Lang;
}): ReactElement {
  return (
    <footer
      id="contact"
      className="mt-16 flex scroll-mt-nav-offset flex-wrap items-center justify-between gap-4 border-copper border-t pt-7"
    >
      <div className="flex flex-wrap items-center gap-2.5">
        {contact.map((link) => {
          const external = /^https?:\/\//.test(link.href);
          return (
            <a
              key={link.id}
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-lg border border-copper-2 bg-card px-3.5 py-2 font-semibold text-chip text-ink-2 transition-colors hover:border-amber-line hover:text-amber-2"
            >
              <span className="font-mono text-faint text-tag uppercase tracking-wider">
                {link.key}
              </span>
              {link.value}
            </a>
          );
        })}
      </div>
      <p className="text-chip text-muted">{tr(personal, lang)}</p>
    </footer>
  );
}
