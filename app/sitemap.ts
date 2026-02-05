import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Sitemap for Google Search Console.
 * 
 * This file tells Google which pages to index.
 * Only includes public pages - dashboard/login are excluded (behind auth).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
