import type { DateTime } from "luxon";

export type ParserData = {
    title: string;
    content: string;
    createdAt: DateTime;
    link?: string;
    author?: string;
    thumbnail?: string;
    site: {
        id: string;
        url: string;
        name: string;
    }
}