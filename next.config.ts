import type { NextConfig } from "next";

/** Project site URL: https://<user>.github.io/finkuby/ */
const repoName = "finkuby";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGithubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
  experimental: {
    agentFeedback: true,
    agentUpgrade: "security",
  },
  // Cache Components / PPR are incompatible with `output: "export"`.
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
