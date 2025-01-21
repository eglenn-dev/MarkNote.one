import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://marknote.com",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://marknote.one/login",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://marknote.one/signup",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
    ];
}
