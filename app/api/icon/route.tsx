import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const raw  = req.nextUrl.searchParams.get("size");
  const size = raw === "192" ? 192 : 512;
  const font = Math.round(size * 0.52);

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
          gap: Math.round(size * 0.04),
        }}
      >
        <div
          style={{
            fontSize: font,
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
            fontSize: Math.round(size * 0.075),
            fontWeight: 700,
            color: "#3d4f6b",
            fontFamily: "sans-serif",
            letterSpacing: Math.round(size * 0.02),
          }}
        >
          1337
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
