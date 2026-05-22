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
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#000000",
            fontFamily: "monospace",
            lineHeight: 1,
            letterSpacing: "-4px",
          }}
        >
          1337
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#555555",
            fontFamily: "monospace",
            letterSpacing: "3px",
          }}
        >
          CODING SCHOOL
        </div>
      </div>
    ),
    { ...size }
  );
}
