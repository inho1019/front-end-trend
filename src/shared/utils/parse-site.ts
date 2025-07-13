import Parser from "rss-parser";
import type { Site } from "../model/site"
import type { ParserData } from "../model/parser";
import { DateTime } from "luxon";

export const parseSite = async (site: Site) => {
    const parser = new Parser();

    try {
        const feed = await parser.parseURL(site.url);
        const items = feed.items || [];

        const parsedData: ParserData[] = items.map(item => {
            return {
                title: item[site.type.title] ?? "",
                content: item[site.type.content] ?? "",
                createdAt: DateTime.fromHTTP(item[site.type.createdAt]) ?? "",
                link: site.type.link && (item[site.type.link] ?? ""),
                owner: site.type.owner && (item[site.type.owner] ?? ""),
                thumbnail: site.type.thumbnail && (item[site.type.thumbnail] ?? ""),
                site: {
                    id: site.id,
                    url: site.url,
                    name: site.name,
                },
            }
        })
            

        return parsedData;
    } catch (error) {
        console.error("error parsing site:", error);
    }
}