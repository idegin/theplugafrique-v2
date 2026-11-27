import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` emits HTML/CSS/JS to `out/`.
  output: "export",
  // Emit `about/index.html` style paths so any static host serves clean URLs.
  trailingSlash: true,
  // The image optimizer needs a server; static export serves images as-is.
  images: {
    unoptimized: true,
  },
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
