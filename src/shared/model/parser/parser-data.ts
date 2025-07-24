export type ParserData = {
    title: string;
    content: string;
    createdAt: string; //ISO date string
    link?: string;
    author?: string;
    thumbnail?: string;
    site: {
        id: string;
        name: string;
        link?: string;
    }
}