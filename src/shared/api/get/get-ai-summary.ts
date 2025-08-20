import i18next from "i18next";
import { getContent } from "./get-content";
import { Base64 } from "js-base64";

type ArchiveData = {
    content: string;
    createdAt: string;
    link: string;
    language: string;
}

export const getAiSummary = async (title: string, createdAt: string, link: string, content: string) => {
    const path = `${import.meta.env.VITE_ARCHIVE_PATH}${Base64.encode(title)}-${i18next.language.substring(0, 2)}.json`;
    let octokitResponse;
    try {
        octokitResponse = await getContent<ArchiveData>(path, { ref: import.meta.env.VITE_ARCHIVE_REPO });
    } catch {
        octokitResponse = null;
    }

    if (octokitResponse?.data) {
        return octokitResponse.data.content
    }
    const response = await fetch(import.meta.env.VITE_AI_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, language: i18next.language.substring(0, 2), createdAt, link }),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch AI summary");
    }
    return response.text();
};
