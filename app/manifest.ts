import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "rowendigm",
    short_name: "rowendigm",
    description: "Personal site of rowendigm",
    start_url: "/",
    display: "browser",
    // = --color-board (globals.css) — manifests cannot read css tokens
    background_color: "#0a0907",
    theme_color: "#0a0907",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
