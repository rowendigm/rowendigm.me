import type { Lang, Localized } from "@/content/types";

/** Default language. Also what prerender emits (rules/client-storage S2). */
export const DEFAULT_LANG: Lang = "ko";

/** Resolve a bilingual field for the active language. */
export function tr(value: Localized, lang: Lang): string {
  return value[lang];
}

/** The storage key for the visitor's language choice. */
export const LANG_KEY = "rd-lang";

/** Validate a raw stored value as a Lang (rules/client-storage S3). */
export function isLang(value: string): value is Lang {
  return value === "ko" || value === "en";
}
