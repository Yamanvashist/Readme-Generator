import { AppError } from "@/lib/errors/app-error";
import { handleApiError } from "@/lib/errors/handle-api-error";
import { parseGitHubRepoUrl } from "@/lib/utils/github";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { repoUrl, readmeStyle, repoDetails } = await req.json();

    if (!repoUrl?.trim()) {
      throw new AppError("Repository URL is required.", 400);
    }

    if (!readmeStyle) {
      throw new AppError("README style is required.", 400);
    }

    const { ownerName, repo } = parseGitHubRepoUrl(repoUrl);

    const { data } = await axios.get(
      `https://api.github.com/repos/${ownerName}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        timeout: 10000,
      },
    );

    const repository = {
      name: data.name,
      fullName: data.full_name,
      url: data.html_url,
      description: data.description,
      owner: data.owner.login,
      language: data.language,
      defaultBranch: data.default_branch,
      topics: data.topics,
      license: data.license?.spdx_id ?? null,
      homepage: data.homepage,
      createdAt: data.created_at,
      isFork: data.fork,
      stars: data.stargazers_count,
      forks: data.forks_count,
    };

    console.log(repository)

    return NextResponse.json({ repository }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
