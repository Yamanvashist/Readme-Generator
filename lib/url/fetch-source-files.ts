import axios from "axios";

import type { GitHubFileResponse, GitHubSourceFile } from "./types";

export async function fetchSourceFiles(
  ownerName: string,
  repo: string,
  files: string[],
): Promise<GitHubSourceFile[]> {
  const baseUrl = `https://api.github.com/repos/${encodeURIComponent(ownerName)}/${encodeURIComponent(repo)}/contents`;

  const results = await Promise.allSettled(
    files.map(async (path): Promise<GitHubSourceFile> => {
      const encodedPath = path.split("/").map(encodeURIComponent).join("/");

      const { data } = await axios.get<GitHubFileResponse>(
        `${baseUrl}/${encodedPath}`,
        { timeout: 10000 },
      );

      if (data.encoding !== "base64" || !data.content) {
        return {
          path,
          content: null,
        };
      }

      return {
        path,
        content: Buffer.from(data.content, "base64").toString("utf-8"),
      };
    }),
  );

  return results
    .filter(
      (result): result is PromiseFulfilledResult<GitHubSourceFile> =>
        result.status === "fulfilled",
    )
    .map((result) => result.value);
}
