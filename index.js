import RSSParser from "rss-parser";

const parser = new RSSParser();

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://rssproxy.migor.org/api/tf?url=https://fenews.substack.com/feed');

    console.log(feed);
    
})();