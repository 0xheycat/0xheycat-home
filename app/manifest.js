export default function manifest() {
  return {
    name: "0xheycat",
    short_name: "0xheycat",
    description:
      "Personal dApp and proof of work for 0xheycat, an independent AI and Web3 builder.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0d",
    theme_color: "#0a0b0d",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
