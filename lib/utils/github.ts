import { AppError } from "@/lib/errors/app-error";

export function parseGitHubRepoUrl(repoUrl: string) {
  let url: URL;

  try {
    url = new URL(repoUrl);
  } catch {
    throw new AppError("Invalid repository URL.", 400);
  }

  if (url.hostname !== "github.com" || url.protocol !== "https:") {
    throw new AppError("A valid HTTPS GitHub URL is required.", 400);
  }

  const [ownerName, rawRepo, ...extra] = url.pathname.split("/").filter(Boolean);

  if (!ownerName || !rawRepo || extra.length > 0) {
    throw new AppError("Invalid GitHub repository URL.", 400);
  }

  const repo = rawRepo.replace(/\.git$/, "");

  return { ownerName, repo };
}
