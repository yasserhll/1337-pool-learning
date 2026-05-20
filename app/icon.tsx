import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d1117",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#00d4ff",
            fontFamily: "sans-serif",
            letterSpacing: "-1px",
          }}
        >
          C
        </div>
      </div>
    ),
    { ...size }
  );
}
