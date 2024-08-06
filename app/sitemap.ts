import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "/",
      priority: 1,
      lastModified: new Date(),
      changeFrequency: "daily",
    },
    {
      url: "/terms-of-service",
      priority: 0.5,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: "/privacy-policy",
      priority: 0.5,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
  ];
}
