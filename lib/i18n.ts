import type { Lang, Localized } from "@/content/types";
import { readStored, writeStored } from "@/lib/storage";

/** Default language. Also what prerender emits (rules/client-storage S2). */
export const DEFAULT_LANG: Lang = "ko";

/** Resolve a bilingual field for the active language. */
export function tr(value: Localized, lang: Lang): string {
  return value[lang];
}

/** The storage key for the visitor's language choice. */
export const LANG_KEY = "rd-lang";

/** Adding a language to Localized makes this a compile error here,
 *  instead of a guard that silently rejects the new value. */
const LANGS: Record<Lang, true> = { ko: true, en: true };

/** Validate a raw stored value as a Lang (rules/client-storage S3). */
export function isLang(value: string): value is Lang {
  return Object.hasOwn(LANGS, value);
}

/** Read the visitor's stored language. Call from an effect (S2). */
export function readStoredLang(): Lang | null {
  return readStored(LANG_KEY, isLang);
}

/** Persist the visitor's language choice (best-effort, S4). */
export function writeStoredLang(lang: Lang): void {
  writeStored(LANG_KEY, lang);
}
