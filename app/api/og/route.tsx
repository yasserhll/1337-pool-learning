import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0d12",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Cyan glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,212,255,0.1)",
            border: "1px solid rgba(0,212,255,0.3)",
            borderRadius: 6,
            padding: "6px 16px",
            marginBottom: 32,
            fontSize: 14,
            fontFamily: "sans-serif",
            color: "#00d4ff",
            letterSpacing: 2,
            fontWeight: 700,
          }}
        >
          PISCINE C — 1337 / 42 NETWORK
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            fontFamily: "sans-serif",
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Cours Complet
          <br />
          <span style={{ color: "#00d4ff" }}>Piscine C</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            fontFamily: "sans-serif",
            color: "#6c7a96",
            lineHeight: 1.6,
            maxWidth: 700,
          }}
        >
          Shell · C · Rush — Exercices interactifs, exemples détaillés
          pour réussir la piscine 1337 / 42.
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 48,
          }}
        >
          {[
            ["13", "Modules"],
            ["16", "Leçons"],
            ["146", "Exercices"],
            ["28", "Termes"],
          ].map(([val, lbl]) => (
            <div
              key={lbl}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  fontFamily: "sans-serif",
                  color: "#00d4ff",
                }}
              >
                {val}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "sans-serif",
                  color: "#3d4f6b",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {lbl}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
