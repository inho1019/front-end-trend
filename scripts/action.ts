import { writeFileSync, readFileSync } from 'node:fs';
import RSSParser from "rss-parser";
import { decode } from 'entities';
import dotenv from 'dotenv';
import type { Site } from "../src/shared/model/site";
import type { ParserData } from "../src/shared/model/parser";
import { DateTime } from 'luxon';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';
import { gzipSync } from "zlib";

dotenv.config();

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function sanitizeRSSContent(rawHTML: string): string {
    DOMPurify.addHook('afterSanitizeAttributes', function (node) {
        if (node.tagName === 'A') {
            node.setAttribute('target', '_blank');
            node.setAttribute('rel', 'noopener noreferrer');
        }
    });
    return DOMPurify.sanitize(rawHTML, {
        FORBID_TAGS: ['script', 'style', 'link', 'form'],
        FORBID_ATTR: ['style', 'onerror', 'onclick', 'onload'],
        ALLOWED_URI_REGEXP: /^https?:/
    });
}

const parser = new RSSParser();

(async () => {
    try {
        const targetSite = process.env.VITE_TARGET_PATH_SITE ?? 'public/site.json';
        const now = DateTime.now()
        const sites = JSON.parse(readFileSync(targetSite, 'utf8')) as Site[];
        const parsing = await Promise.all(
            sites.map(async (site: Site) => {
                try {
                    const feed = await parser.parseURL(`${process.env.VITE_RSS_PROXY_URL}${site.url}`);
                    const parsedData: ParserData[] = feed.items.map(item => {
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
                            content: content ? sanitizeRSSContent(decode(decode(content))) : "",
                            createdAt: createdAt.toISO() || "",
                            link: site.type.link && (item[site.type.link] ?? ""),
                            author: site.type.author && (item[site.type.author] ?? ""),
                            site: {
                                id: site.id,
                                name: site.name,
                            },
                        }
                    })
                    const filteredData = parsedData.filter(item => {
                        const created = DateTime.fromISO(item.createdAt)
                        return created.isValid && created >= now.minus({ year: 1 }) && created <= now
                    })

                    return filteredData;
                } catch (error) {
                    console.error("Error parsing RSS feed:", error);
                    return [];
                }
            }
        ));
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

        const readData = readFileSync(targetData);
        const compressed = gzipSync(readData);
        writeFileSync(`${targetData}.gz`, compressed);
    } catch (error) {
        console.error("process error:", error);
    }
})();