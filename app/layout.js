import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://0xheycat-home.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "0xheycat — AI, Web3, games, and developer tooling",
    template: "%s · 0xheycat",
  },
  description:
    "Personal dApp and proof of work for 0xheycat, an independent builder shipping AI systems, Web3 products, games, and developer tooling.",
  keywords: [
    "0xheycat",
    "Web3 developer",
    "AI builder",
    "MCP",
    "Farcaster",
    "Base",
    "onchain games",
    "developer tooling",
  ],
  authors: [{ name: "0xheycat", url: "https://github.com/0xheycat" }],
  creator: "0xheycat",
  openGraph: {
    title: "0xheycat — building useful systems",
    description:
      "AI systems, wallet-aware products, game infrastructure, and developer tooling built in public.",
    url: siteUrl,
    siteName: "0xheycat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "0xheycat — building useful systems",
    description:
      "AI systems, wallet-aware products, game infrastructure, and developer tooling built in public.",
    creator: "@0xheycat",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const themeScript = `
(() => {
  try {
    const mode = localStorage.getItem('0xheycat-theme') || 'system';
    const resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themeMode = mode;
  } catch (_) {
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.dataset.themeMode = 'system';
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
