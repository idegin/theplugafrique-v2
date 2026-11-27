import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { asset } from "@/lib/base-path";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: asset("/"),
    display: "browser",
    background_color: "#fdfaf4",
    theme_color: "#001135",
    icons: [
      { src: asset("/brand/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/brand/icon-512.png"), sizes: "512x512", type: "image/png" },
      { src: asset("/brand/icon-512-maskable.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
