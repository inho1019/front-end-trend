import { writeFileSync, readFileSync } from 'node:fs';
import RSSParser from "rss-parser";
import { decode } from 'entities';
import dotenv from 'dotenv';
import type { Site } from "../src/shared/model/site";
import type { ParserData } from "../src/shared/model/parser";
import { DateTime } from 'luxon';

dotenv.config();

const parser = new RSSParser();

(async () => {
    try {
        const targetSite = process.env.VITE_TARGET_PATH_SITE ?? 'public/site.json';
        const sites = JSON.parse(readFileSync(targetSite, 'utf8')) as Site[];
        const parsing = await Promise.all(sites.map(async (site: Site) => {
            const feed = await parser.parseURL(`${process.env.VITE_RSS_PROXY_URL}${site.url}`);
            const items = feed.items.filter(item =>
                (item[site.type.title] || item.title) !== "SERVICE ANNOUNCEMENT: About this feed" &&
                (item[site.type.title] || item.title) !== "ALERT: Potential Issue with Feed"
            ) || [];
            const parsedData: ParserData[] = items.map(item => {
                const createdRaw = item[site.type.createdAt];
                const content = item[site.type.content];
                let createdAt: DateTime = DateTime.invalid("Invalid date");
                if (createdRaw) {
                    createdAt = DateTime.fromISO(createdRaw);
                    if (!createdAt.isValid) {
                        createdAt = DateTime.fromHTTP(createdRaw);
                    }
                    if (!createdAt.isValid) {
                        createdAt = DateTime.fromRFC2822(createdRaw);
                    }
                }
                return {
                    title: item[site.type.title] ?? "",
                    content: content ? decode(decode(content)) : "",
                    createdAt: createdAt.toISO() || "",
                    link: site.type.link && (item[site.type.link] ?? ""),
                    author: site.type.author && (item[site.type.author] ?? ""),
                    thumbnail: site.type.thumbnail && (item[site.type.thumbnail] ?? ""),
                    site: {
                        id: site.id,
                        url: site.url,
                        name: site.name,
                    },
                }
            })
            return parsedData;
        }));
        const data: ParserData[] = parsing.flat();

        // 빈 데이터일 경우 보호용
        if (data.length <= 0) {
            console.error("No data found in the RSS feeds.");
            return;
        }

        data.sort((a, b) => {
            return DateTime.fromISO(b.createdAt).toMillis() - DateTime.fromISO(a.createdAt).toMillis();
        });

        const targetData = process.env.VITE_TARGET_PATH_DATA ?? 'public/data.json';

        writeFileSync(targetData, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error("process error:", error);
    }
})();