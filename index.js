import RSSParser from "rss-parser";

const parser = new RSSParser();

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://css-tricks.com/category/articles/feed');

    console.log(feed);
    
})();