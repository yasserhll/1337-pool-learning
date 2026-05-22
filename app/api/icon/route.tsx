import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const raw  = req.nextUrl.searchParams.get("size");
  const size = raw === "192" ? 192 : 512;

  const textSize   = Math.round(size * 0.38);
  const subSize    = Math.round(size * 0.07);
  const gap        = Math.round(size * 0.04);

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
          gap,
        }}
      >
        <div
          style={{
            fontSize: textSize,
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
            fontSize: subSize,
            fontWeight: 700,
            color: "#555555",
            fontFamily: "monospace",
            letterSpacing: Math.round(size * 0.015),
          }}
        >
          CODING SCHOOL
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
