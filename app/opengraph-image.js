import { ImageResponse } from "next/og";

export const alt = "0xheycat — AI, Web3, games, and developer tooling";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#0a0b0d",
          color: "#f7f3ea",
          fontFamily: "Arial, sans-serif",
          padding: "72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 620,
            right: -110,
            top: -190,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,180,90,.34) 0%, rgba(245,180,90,.08) 42%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.2,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 99,
                background: "#f5b45a",
                boxShadow: "0 0 30px rgba(245,180,90,.75)",
              }}
            />
            <span style={{ fontSize: 28, letterSpacing: 2 }}>0xheycat</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                fontSize: 74,
                lineHeight: 1.02,
                maxWidth: 930,
                fontWeight: 700,
                letterSpacing: -3,
              }}
            >
              Building useful systems for AI, Web3, and games.
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#b7b6b1",
                maxWidth: 820,
                lineHeight: 1.35,
              }}
            >
              Wallet-aware products, agent workflows, game infrastructure, and developer tooling.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 30,
              fontSize: 22,
              color: "#f5b45a",
            }}
          >
            <span>github.com/0xheycat</span>
            <span>•</span>
            <span>@0xheycat</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
