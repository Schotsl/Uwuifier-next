import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://uwuifier.com/",
      priority: 1,
      lastModified: new Date(),
      changeFrequency: "daily",
    },
    {
      url: "https://uwuifier.com/terms-of-service",
      priority: 0.5,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: "https://uwuifier.com/privacy-policy",
      priority: 0.5,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
  ];
}
