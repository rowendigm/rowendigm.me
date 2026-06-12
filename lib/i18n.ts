import type { Lang, Localized } from "@/content/types";

/** Default language. Also what prerender emits (rules/client-storage S2). */
export const DEFAULT_LANG: Lang = "ko";

/** Resolve a bilingual field for the active language. */
export function tr(value: Localized, lang: Lang): string {
  return value[lang];
}
