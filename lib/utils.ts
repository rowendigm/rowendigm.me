import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Register custom tokens, otherwise twMerge classifies text-section/silk/...
// as text colors (and shadow-led as a shadow color) and drops one side of
// pairs like "text-ink text-section" at runtime. Keep in sync with the
// registered token blocks in app/globals.css.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "section",
            "card-title",
            "chip",
            "silk-lg",
            "silk",
            "tag",
            "hero",
            "bio",
            "card-body",
            "year",
          ],
        },
      ],
      shadow: [{ shadow: ["led"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
