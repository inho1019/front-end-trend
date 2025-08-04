import RSSParser from "rss-parser";
import dotenv from 'dotenv';

dotenv.config();

const parser = new RSSParser();

(async () => {

    // 피드 목록
    const feed = await parser.parseURL(`${process.env.VITE_RSS_PROXY_URL}https://oliveyoung.tech/rss.xml`);

    console.log(feed);
    
})();