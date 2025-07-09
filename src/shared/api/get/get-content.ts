import { client } from "../octokit-client"

export const getContent = async () =>  {
    try {
        const response = await client().repos.getContent({
            owner: import.meta.env.VITE_GITHUB_OWNER,
            repo: import.meta.env.VITE_GITHUB_TARGET_REPO,
            path: import.meta.env.VITE_TARGET_PATH,
        })
        
        console.log(response.data.toString());

        return response.data.toString();
    } catch (error) {
        console.error("Failed to fetch TODO", error);
        return null;
    }
}