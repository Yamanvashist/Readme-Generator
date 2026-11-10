import axios from "axios";

import type {
  GitHubFileResponse,
  GitHubSourceFile,
  GitHubTreeItem,
} from "./types";

export async function fetchSourceFiles(
  ownerName: string,
  repo: string,
  files: GitHubTreeItem[],
): Promise<GitHubSourceFile[]> {
  const baseUrl = `https://api.github.com/repos/${encodeURIComponent(ownerName)}/${encodeURIComponent(repo)}/contents`;

  const results = await Promise.allSettled(
    files.map(async (file): Promise<GitHubSourceFile> => {
      const encodedPath = file.path
        .split("/")
        .map(encodeURIComponent)
        .join("/");

      const { data } = await axios.get<GitHubFileResponse>(
        `${baseUrl}/${encodedPath}`,
        { timeout: 10000 },
      );

      if (data.encoding !== "base64" || !data.content) {
        return {
          path: file.path,
          content: null,
        };
      }

      return {
        path: file.path,
        content: Buffer.from(data.content, "base64").toString("utf-8"),
      };
    }),
  );

  return results
    .filter(
      (
        result,
      ): result is PromiseFulfilledResult<GitHubSourceFile> =>
        result.status === "fulfilled",
    )
    .map((result) => result.value);
}