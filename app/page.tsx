"use client";

import { type ReactElement, useEffect, useState } from "react";
import { BackgroundTraces } from "@/components/BackgroundTraces";
import { Career } from "@/components/sections/Career";
import { Contrib } from "@/components/sections/Contrib";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Now } from "@/components/sections/Now";
import { Planned } from "@/components/sections/Planned";
import { Stack } from "@/components/sections/Stack";
import { TopNav } from "@/components/TopNav";
import { profile } from "@/content/data";
import type { Lang } from "@/content/types";
import { ui } from "@/content/ui";
import { DEFAULT_LANG, readStoredLang, writeStoredLang } from "@/lib/i18n";

export default function Home(): ReactElement {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);

  // Stored preference applies after mount (rule S2): prerender is ko,
  // returning EN visitors see one default-language frame.
  useEffect(() => {
    const stored = readStoredLang();
    if (stored && stored !== DEFAULT_LANG) {
      setLang(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const changeLang = (next: Lang): void => {
    setLang(next);
    writeStoredLang(next);
    document.documentElement.lang = next;
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundTraces />
      <TopNav nav={ui.nav} cta={ui.cta} lang={lang} onLangChange={changeLang} />
      <div className="relative z-10 mx-auto max-w-page px-5 pt-18 pb-20">
        <main>
          <Hero
            badge={profile.badge}
            headline={profile.headline}
            bio={profile.bio}
            flow={profile.flow}
            lang={lang}
          />
          <Stack
            items={profile.stack}
            heading={ui.headings.stack}
            lang={lang}
          />
          <Now items={profile.now} heading={ui.headings.now} lang={lang} />
          <Planned
            items={profile.planned}
            heading={ui.headings.planned}
            tags={ui.tags}
            lang={lang}
          />
          <Contrib
            items={profile.contrib}
            heading={ui.headings.contrib}
            tags={ui.tags}
            lang={lang}
          />
          <Career
            items={profile.history}
            heading={ui.headings.career}
            lang={lang}
          />
        </main>
        <Footer
          contact={profile.contact}
          personal={profile.personal}
          lang={lang}
        />
      </div>
    </div>
  );
}
