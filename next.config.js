/** @type {import('next').NextConfig} */
// next.config.js
// ─────────────────────────────────────────────────────────────
// We use `output: 'export'` so Next.js produces a plain /out
// folder of static HTML/CSS/JS files that GitHub Pages can serve.
// `basePath` must match your GitHub repo name exactly.
// `images: { unoptimized: true }` is required when using static
// export because Next's image optimization needs a server.
// ─────────────────────────────────────────────────────────────
const nextConfig = {
  output: 'export',
  basePath: '/deliberate-bodywork', // ← change to your exact GitHub repo name
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
