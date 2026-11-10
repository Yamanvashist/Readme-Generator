import axios from "axios";

import type {
  GitHubMetadata,
  GitHubTreeResponse,
} from "./types";

export async function fetchRepository(
  ownerName: string,
  repo: string,
) {
  const baseUrl = `https://api.github.com/repos/${encodeURIComponent(ownerName)}/${encodeURIComponent(repo)}`;

  // Fetch repository metadata
  const { data: metadata } = await axios.get<GitHubMetadata>(
    baseUrl,
    { timeout: 10000 },
  );

  // Fetch repository tree
  const { data: tree } = await axios.get<GitHubTreeResponse>(
    `${baseUrl}/git/trees/${encodeURIComponent(metadata.default_branch)}?recursive=1`,
    { timeout: 10000 },
  );

  return {
    metadata,
    tree,
  };
}