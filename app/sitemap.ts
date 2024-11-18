import type {MetadataRoute} from 'next'
import {generateStaticParams as countyGenerateStaticParams} from "./candidati/[county]/page";
import {generateStaticParams as partiesGenerateStaticParams} from "./candidati/[county]/[party]/page";

export const runtime = 'edge';

const ROOT_DOMAIN = "https://candidati-paralamentare-2024.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
    const urls: any = [
        {
            url: ROOT_DOMAIN,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];
    for(const params of countyGenerateStaticParams()) {
        urls.push({
            url: `${ROOT_DOMAIN}/candidati/${params.county}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        });
    }
    for(const params of partiesGenerateStaticParams()) {
        urls.push({
            url: `${ROOT_DOMAIN}/candidati/${params.county}/${params.party}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        });
    }
    return urls;
}