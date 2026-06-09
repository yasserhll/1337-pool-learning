"use client";
import { ExternalLink, Server, Globe } from "lucide-react";

interface AffiliateItem {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  accent: string;
  badge: string;
}

const AFFILIATES: AffiliateItem[] = [
  {
    label: "Hostinger",
    description: "Hébergement web — jusqu'à 80% de réduction",
    href: "https://www.hostinger.fr/",
    icon: <Globe size={16} />,
    accent: "#7c3aed",
    badge: "Partenaire",
  },
  {
    label: "VPS Cloud",
    description: "Serveur VPS — idéal pour tes projets 42",
    href: "https://www.hostinger.fr/vps-hosting",
    icon: <Server size={16} />,
    accent: "#00d4ff",
    badge: "Recommandé",
  },
];

export default function AffiliateBanner() {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      padding: "12px 16px",
      background: "#0d1117",
      borderTop: "1px solid #1a2030",
      justifyContent: "center",
    }}>
      <span style={{ fontSize: 10, color: "#3d4f6b", alignSelf: "center", marginRight: 4, fontFamily: "monospace", letterSpacing: 0.5 }}>
        PARTENAIRES
      </span>
      {AFFILIATES.map((a) => (
        <a
          key={a.label}
          href={a.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 6,
            border: `1px solid ${a.accent}30`,
            background: `${a.accent}08`,
            color: "#a0aec0",
            fontSize: 12,
            fontFamily: "monospace",
            textDecoration: "none",
            transition: "all 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = `${a.accent}80`;
            (e.currentTarget as HTMLAnchorElement).style.color = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = `${a.accent}30`;
            (e.currentTarget as HTMLAnchorElement).style.color = "#a0aec0";
          }}
        >
          <span style={{ color: a.accent }}>{a.icon}</span>
          <span style={{ fontWeight: 700, color: a.accent }}>{a.label}</span>
          <span style={{ color: "#6c7a96", fontSize: 11 }}>{a.description}</span>
          <span style={{
            fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 3,
            background: `${a.accent}20`, color: a.accent, letterSpacing: 0.5,
          }}>{a.badge}</span>
          <ExternalLink size={10} color="#3d4f6b" />
        </a>
      ))}
    </div>
  );
}
