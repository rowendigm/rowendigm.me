import { z } from "zod";
import type { ProfileData, UiStrings } from "./types";

const localized = z.object({
  ko: z.string().trim().min(1),
  en: z.string().trim().min(1),
});

const id = z.string().trim().min(1);

/** Duplicate ids would collide as React keys later. Fail the build instead. */
function uniqueIds(items: { id: string }[]): boolean {
  return new Set(items.map((i) => i.id)).size === items.length;
}

const unique = { message: "duplicate id" };

export const profileSchema = z.object({
  badge: localized,
  headline: z.object({ lead: localized, accent: localized }),
  bio: localized,
  flow: z
    .array(z.object({ id, label: z.string().trim().min(1) }))
    .min(1)
    .refine(uniqueIds, unique),
  stack: z
    .array(z.object({ id, category: localized, label: localized }))
    .min(1)
    .refine(uniqueIds, unique),
  now: z
    .array(z.object({ id, name: localized, tag: localized, desc: localized }))
    .min(1)
    .refine(uniqueIds, unique),
  planned: z
    .array(
      z.object({
        id,
        kind: localized,
        track: z.enum(["main", "side"]),
        title: localized,
        body: localized,
      }),
    )
    .min(1)
    .refine(uniqueIds, unique),
  contrib: z
    .array(z.object({ id, kind: localized, title: localized, body: localized }))
    .min(1)
    .refine(uniqueIds, unique),
  history: z
    .array(
      z.object({
        id,
        year: z.string().regex(/^\d{4}$/),
        title: localized,
        body: localized,
      }),
    )
    .min(1)
    .refine(uniqueIds, unique),
  contact: z
    .array(
      z.object({
        id,
        key: z.string().trim().min(1),
        value: z.string().trim().min(1),
        href: z.url(),
      }),
    )
    .min(1)
    .refine(uniqueIds, unique),
  personal: localized,
}) satisfies z.ZodType<ProfileData>;

export const uiSchema = z.object({
  nav: z.object({ stack: localized, projects: localized, career: localized }),
  headings: z.object({
    stack: localized,
    now: localized,
    planned: localized,
    contrib: localized,
    career: localized,
  }),
  cta: localized,
}) satisfies z.ZodType<UiStrings>;
