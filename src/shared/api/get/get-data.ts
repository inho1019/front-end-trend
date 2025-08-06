import { Base64 } from "js-base64";
import { client } from "../octokit-client"

export const getData = async <T>(path: string) =>  {
    const params = new URLSearchParams(window.location.search);
    const cache = params.get("cache");

    try {
        const response = await client().repos.getContent({
            owner: import.meta.env.VITE_GITHUB_OWNER,
            repo: import.meta.env.VITE_TARGET_REPO,
            path,
            ref: import.meta.env.VITE_TARGET_BRANCH,
            headers: cache === "no" ? 
                {
                    'If-None-Match': ''
                } : {},
        })
        
        let contentBase64: string | undefined;
        if ('content' in response.data && typeof response.data.content === 'string') {
            contentBase64 = response.data.content;
        } else {
            throw new Error("Content is not available or not in the expected format.");
        }
        const decodedContent = Base64.decode(contentBase64);
        const data = JSON.parse(decodedContent) as T[];

        return { data, sha: response.data.sha };
    } catch (error) {
        console.error("Error get data:", error);
        return { data: undefined, sha: undefined };
    }
}