# 0xheycat home

Personal dApp and public home for [0xheycat](https://github.com/0xheycat).

This is a focused product surface, not a blog or a link directory. It presents selected public work across AI systems, Web3 products, game infrastructure, and developer tooling.

## Included

- Responsive, mobile-first landing experience
- Typewriter-style live build status
- Live GitHub profile, star, and fork counters
- Injected EVM wallet connection with no external wallet provider key
- System, light, and dark theme modes
- Scroll progress, copy feedback, and accessible motion fallbacks
- Generated Open Graph image, sitemap, robots, and web app manifest

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

All variables are optional.

```bash
# Raises GitHub API rate limits for the live metrics route.
GITHUB_TOKEN=

# Used for canonical metadata, sitemap, and social previews.
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Deploy

The project is ready for Vercel or any Node.js host that supports Next.js 16.

```bash
npm run build
npm run start
```

## Public profiles

- [GitHub](https://github.com/0xheycat)
- [X](https://x.com/0xheycat)
- [Farcaster](https://warpcast.com/heycat)
- [LinkedIn](https://www.linkedin.com/in/0x-heycat-2054a6255)
