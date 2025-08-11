export const getAiSummary = async (content: string) => {
    const response = await fetch(import.meta.env.VITE_AI_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: content,
    });
    if (!response.ok) {
        throw new Error("Failed to fetch AI summary");
    }
    return response.text();
};
