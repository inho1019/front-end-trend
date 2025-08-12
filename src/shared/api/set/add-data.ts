import { Base64 } from "js-base64";
import { getContent } from "../get/get-content";
import { client } from "../octokit-client";

export const addData = async <T>(path: string, token: string, data: T, message?: string) => {
    try {
        const newData: T[] = []
        const { data: existingData, sha } = await getContent<T[]>(path);
        if (existingData) {
            newData.push(...existingData);
        }
        newData.push(data);

        await client(token).repos.createOrUpdateFileContents({
            owner: import.meta.env.VITE_GITHUB_OWNER,
            repo: import.meta.env.VITE_TARGET_REPO,
            path,
            branch: import.meta.env.VITE_TARGET_BRANCH,
            message: message ?? "Update Data",
            content: Base64.encode(JSON.stringify(newData, null, 2)),
            sha,
        });
    } catch (error) {
        console.error("Error add data:", error);
        throw error;
    }
};