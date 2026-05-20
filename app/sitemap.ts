import type { MetadataRoute } from "next";
import { modules } from "@/lib/courseData";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://piscine1337.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const moduleUrls = modules.map((m) => ({
    url: `${siteUrl}/module/${m.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/glossaire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...moduleUrls,
  ];
}
