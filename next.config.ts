import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` emits HTML/CSS/JS to `out/`.
  output: "export",
  // Emit `about/index.html` style paths so any static host serves clean URLs.
  trailingSlash: true,
  // No image optimizer server in a static export. Instead the build script
  // (scripts/sync-cms-assets.mjs) pre-renders WebP variants and this loader
  // points each srcset width at one. deviceSizes must match its WIDTHS.
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 1280, 1920],
    imageSizes: [96, 256, 384],
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
