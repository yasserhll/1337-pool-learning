import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";
import { Analytics } from "@vercel/analytics/next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://piscine1337.vercel.app";

export const viewport: Viewport = {
  themeColor: "#00d4ff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Piscine C 1337 — Cours Complet | 42 Network",
    template: "%s | Piscine 1337",
  },
  description:
    "Cours interactif complet pour réussir la Piscine C de 1337 et le réseau 42. Shell, C, Rush — explications pas à pas, exemples détaillés, 146 exercices interactifs. Pool 1337 · Pool 42.",
  keywords: [
    "piscine 1337",
    "piscine c 1337",
    "pool 1337",
    "piscine 42",
    "pool 42",
    "42 network",
    "1337 school",
    "cours piscine c",
    "piscine c maroc",
    "1337 maroc",
    "apprendre c programmation",
    "exercices c débutant",
    "pointeurs c",
    "malloc c",
    "shell scripting",
    "algorithmie c",
    "piscine 42 réseau",
    "réussir piscine 42",
    "guide piscine c",
    "bootcamp 42",
    "coding school maroc",
  ],
  authors: [{ name: "Piscine 1337" }],
  creator: "Piscine 1337",
  publisher: "Piscine 1337",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US", "ar_MA"],
    url: siteUrl,
    siteName: "Piscine 1337",
    title: "Piscine C 1337 — Cours Complet | 42 Network",
    description:
      "Cours interactif pour réussir la Piscine C de 1337 / 42 Network. Shell, C, Rush — 146 exercices, exemples pas à pas.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Piscine C 1337 — Cours Complet",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Piscine C 1337 — Cours Complet | 42 Network",
    description:
      "Cours interactif pour réussir la Piscine C de 1337 / 42 Network. Shell, C, Rush — 146 exercices.",
    images: ["/api/og"],
  },

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Piscine 1337",
  },

  formatDetection: { telephone: false },

  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/png" },
      { url: "/api/icon?size=192", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon",
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },

  other: {
    "mobile-web-app-capable": "yes",
    "application-name": "Piscine 1337",
    "msapplication-TileColor": "#0a0d12",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Piscine C 1337 — Cours Complet",
  description:
    "Cours interactif complet pour réussir la Piscine C de 1337 et le réseau 42 Network. Shell, C, Rush — explications pas à pas, exercices interactifs.",
  url: siteUrl,
  provider: {
    "@type": "EducationalOrganization",
    name: "Piscine 1337",
    url: siteUrl,
    sameAs: ["https://1337.ma", "https://www.42network.org"],
  },
  educationalLevel: "Beginner",
  inLanguage: ["fr", "en"],
  teaches: [
    "Programmation C",
    "Shell scripting",
    "Algorithmie",
    "Pointeurs",
    "Gestion mémoire",
    "Git",
  ],
  isAccessibleForFree: true,
  hasCourseInstance: [
    { "@type": "CourseInstance", name: "Shell 00", courseMode: "online" },
    { "@type": "CourseInstance", name: "Shell 01", courseMode: "online" },
    { "@type": "CourseInstance", name: "C00 à C08", courseMode: "online" },
    { "@type": "CourseInstance", name: "Rush 01", courseMode: "online" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
        <footer style={{
          textAlign: "center",
          padding: "14px",
          fontSize: 11,
          color: "#3d4f6b",
          fontFamily: "monospace",
          letterSpacing: "0.5px",
          borderTop: "1px solid #1a2030",
          background: "#0a0d12",
        }}>
          Developed by Yassir.H
        </footer>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
