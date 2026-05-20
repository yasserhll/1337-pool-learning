import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d1117",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#00d4ff",
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          C
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#3d4f6b",
            fontFamily: "sans-serif",
            letterSpacing: "4px",
          }}
        >
          1337
        </div>
      </div>
    ),
    { ...size }
  );
}
