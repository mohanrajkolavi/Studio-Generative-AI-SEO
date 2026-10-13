import path from "path";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = {
  trailingSlash: false,
  // Inlined at build time so sitemap <lastmod> reflects the deploy, not each regeneration.
  env: {
    BUILD_TIMESTAMP: process.env.BUILD_TIMESTAMP || new Date().toISOString(),
  },
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
    ],
    // Keep false: inlineCss: true broke production (unstyled layout, broken mobile). Do not re-enable.
    inlineCss: false,
  },
  async redirects() {
    return [
      { source: "/medical-spas", destination: "/", permanent: true },
      // Consolidate www onto the canonical apex host (GSC shows www URLs being indexed).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kolavistudio.com" }],
        destination: "https://kolavistudio.com/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/blog/rss.xml", destination: "/blog/rss" },
      { source: "/sitemap.xml", destination: "/sitemap" },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "kolavistudio.com" },
      { protocol: "https", hostname: "www.kolavistudio.com" },
      { protocol: "https", hostname: "cms.kolavistudio.com" },
      { protocol: "http", hostname: "localhost" },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 90],
    minimumCacheTTL: 86400, // 24h for external images (PageSpeed / LCP)
  },
};

export default withBundleAnalyzer(nextConfig);
