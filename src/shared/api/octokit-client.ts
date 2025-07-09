import { Octokit } from "@octokit/rest";

export const client = (token?: string) => {
  return new Octokit(token ? { auth: token } : {});
}