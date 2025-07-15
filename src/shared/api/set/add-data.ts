import { Base64 } from "js-base64";
import type { Site } from "../../model/site";
import { getData } from "../get/get-data";
import { client } from "../octokit-client";

export const addData = async (token: string, data: Site, message?: string) => {
    try {
        const newData: Site[] = []
        const { data: existingData, sha } = await getData();
        if (existingData) {
            newData.push(...existingData);
        }
        newData.push(data);

        await client(token).repos.createOrUpdateFileContents({
            owner: import.meta.env.VITE_GITHUB_OWNER,
            repo: import.meta.env.VITE_TARGET_REPO,
            path: import.meta.env.VITE_TARGET_PATH_SITE,
            branch: import.meta.env.VITE_TARGET_BRANCH,
            message: message ?? "Update site data",
            content: Base64.encode(JSON.stringify(newData, null, 2)),
            sha,
        });
    } catch (error) {
        console.error("Error add data:", error);
        throw error;
    }
};