import { writeFileSync, readFileSync } from 'node:fs';
import RSSParser from "rss-parser";
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import type { Site } from "../src/shared/model/site";
import type { ParserData } from "../src/shared/model/parser";
import { DateTime } from 'luxon';

dotenv.config();

const parser = new RSSParser();

async function fetchRssWithPuppeteer(url: string): Promise<string | null> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const rssContent = await page.evaluate(() => {
        const feedElement = document.querySelector('feed');
        if (feedElement) {
            return feedElement.outerHTML;
        }
        const rssElement = document.querySelector('rss');
        if (rssElement) {
            return rssElement.outerHTML;
        }
        const txt = document.createElement('textarea');
        txt.innerHTML = document.documentElement.outerHTML;
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(txt.value, "text/html");
        const feedDecodeElement = doc.querySelector('feed');
        if (feedDecodeElement) {
            return feedDecodeElement.outerHTML;
        }
        const rssDecodeElement = doc.querySelector('rss');
        if (rssDecodeElement) {
            return rssDecodeElement.outerHTML;
        }
        return null;
    });

    console.log(rssContent)

    return rssContent;
  } finally {
    await browser.close();
  }
}

(async () => {
    try {
        const targetSite = process.env.VITE_TARGET_PATH_SITE ?? 'public/site.json';
        const sites = JSON.parse(readFileSync(targetSite, 'utf8')) as Site[];
        const parsing = await Promise.all(sites.map(async (site: Site) => {
            const rssXml = await fetchRssWithPuppeteer(site.url);
            if (!rssXml) {
                console.warn(`Failed to fetch RSS from ${site.url}`);
                return [];
            }
            const feed = await parser.parseString(rssXml);
            const items = feed.items || [];
            const parsedData: ParserData[] = items.map(item => {
                const createdRaw = item[site.type.createdAt];
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
                    content: item[site.type.content] ?? "",
                    createdAt,
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
        }));
        const data: ParserData[] = parsing.flat();
        data.sort((a, b) => {
            return b.createdAt.toMillis() - a.createdAt.toMillis();
        });

        const targetData = process.env.VITE_TARGET_PATH_DATA ?? 'public/data.json';

        writeFileSync(targetData, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error("process error:", error);
    }
})();