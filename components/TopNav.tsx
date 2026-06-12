"use client";

import { type ReactElement, useEffect, useState } from "react";
import { Led } from "@/components/ui/Led";
import type { Lang, Localized, UiStrings } from "@/content/types";
import { tr } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const kstFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Seoul",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function formatKst(): string {
  return kstFormat.format(new Date());
}

/** Live KST clock. Prerender shows the placeholder; the real time only
 *  appears after mount, so hydration never mismatches (rule S2 analog). */
function Clock(): ReactElement {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    setTime(formatKst());
    const id = setInterval(() => setTime(formatKst()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="hidden font-mono text-faint text-silk tabular-nums tracking-wider md:inline">
      {time ?? "--:--:--"} KST
    </span>
  );
}

export function TopNav({
  nav,
  cta,
  lang,
  onLangChange,
}: {
  nav: UiStrings["nav"];
  cta: Localized;
  lang: Lang;
  onLangChange: (next: Lang) => void;
}): ReactElement {
  const links: { href: string; label: Localized }[] = [
    { href: "#stack", label: nav.stack },
    { href: "#now", label: nav.projects },
    { href: "#career", label: nav.career },
  ];
  return (
    <nav className="sticky top-0 z-50 flex items-center gap-5 border-copper border-b bg-board/90 px-5 py-3.5 backdrop-blur sm:px-8">
      <span className="inline-flex items-center gap-2 whitespace-nowrap font-medium font-mono text-ink text-silk-lg tracking-wider">
        <Led />
        rowen<span className="font-normal text-faint">digm.me</span>
      </span>
      <Clock />
      <div className="ml-auto hidden gap-1 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-lg px-2.5 py-1.5 font-medium text-chip text-muted transition-colors hover:bg-chip-bg hover:text-ink"
          >
            {tr(link.label, lang)}
          </a>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2 md:ml-0">
        <fieldset className="inline-flex gap-0.5 rounded-lg border border-copper-2 bg-card p-0.5">
          <legend className="sr-only">{tr(nav.langLabel, lang)}</legend>
          {(["ko", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              aria-pressed={lang === code}
              onClick={() => onLangChange(code)}
              className={cn(
                "cursor-pointer rounded-md px-2.5 py-1 font-semibold text-tag uppercase transition-colors",
                lang === code
                  ? "bg-amber text-on-amber"
                  : "text-muted hover:text-ink",
              )}
            >
              {code === "ko" ? <span lang="ko">한국어</span> : "EN"}
            </button>
          ))}
        </fieldset>
        <a
          href="#contact"
          className="whitespace-nowrap rounded-lg bg-amber px-3.5 py-2 font-bold text-chip text-on-amber transition-colors hover:bg-amber-2"
        >
          {tr(cta, lang)}
        </a>
      </div>
    </nav>
  );
}
