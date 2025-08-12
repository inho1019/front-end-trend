import i18next from "i18next";

export const getAiSummary = async (title: string, content: string) => {
    const response = await fetch(import.meta.env.VITE_AI_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, language: i18next.language }),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch AI summary");
    }
    return response.text();
};
