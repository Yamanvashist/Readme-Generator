import { AppError } from "@/lib/errors/app-error";
import { handleApiError } from "@/lib/errors/handle-api-error";

import { parseGitHubRepoUrl } from "@/lib/utils/github";
import { convertPathToTree } from "@/lib/utils/convertPathToTree";

import axios from "axios";
import { NextResponse } from "next/server";

import { GenerateReadme } from "@/lib/gemini";

import type { ProjectContext } from "@/lib/types/project-context";

import { prisma } from "@/lib/prisma";

const importantFileNames = new Set([
  "package.json",
  "pyproject.toml",
  "requirements.txt",
  "Pipfile",
  "setup.py",
  "Cargo.toml",
  "go.mod",
  "pom.xml",
  "build.gradle",
  "build.gradle.kts",
  "CMakeLists.txt",
  "Makefile",
  "meson.build",
  "composer.json",
  "Gemfile",
  "Dockerfile",
  "docker-compose.yml",
  "pnpm-workspace.yaml",
  "README.md",
  "LICENSE",
  ".gitignore",
]);

type GitHubTreeResponse = {
  tree: Array<{
    path: string;
    type?: string;
    size?: number;
  }>;
  truncated: boolean;
};

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

    // 1. Fetch repository metadata
    const { data: metadata } = await axios.get(
      `https://api.github.com/repos/${ownerName}/${repo}`,
      { timeout: 10000 },
    );

    // 2. Fetch repository tree
    const { data: tree } = await axios.get<GitHubTreeResponse>(
      `https://api.github.com/repos/${ownerName}/${repo}/git/trees/${metadata.default_branch}?recursive=1`,
      { timeout: 10000 },
    );

    const paths = tree.tree.map((item) => item.path);

    // 3. Convert paths into a readable folder tree
    const folderStructure = convertPathToTree(paths);

    // 4. Select important files dynamically
    const filesToFetch = tree.tree
      .filter((item) => {
        if (item.type === "tree") return false;

        const path = item.path;
        const name = path.split("/").pop()!;

        // Never fetch files likely to contain secrets
        if (
          name === ".env" ||
          name.startsWith(".env.") ||
          /\.(pem|key|p12|pfx)$/i.test(name) ||
          /(^|\/)(id_rsa|id_ed25519)$/i.test(path)
        ) {
          return false;
        }

        // Avoid common generated/dependency directories
        if (
          /(^|\/)(node_modules|vendor|dist|build|\.next|coverage|\.git)\//i.test(
            path,
          )
        ) {
          return false;
        }

        return (
          importantFileNames.has(name) ||
          /(^|\/)(main|app|index|server)\.(py|cpp|cc|c|h|hpp|js|jsx|ts|tsx|java|go|rs|php|rb)$/i.test(
            path,
          )
        );
      })
      .slice(0, 20);

    // 5. Fetch selected file contents
    const repositoryFiles = await Promise.allSettled(
      filesToFetch.map(async (file) => {
        const encodedPath = file.path
          .split("/")
          .map(encodeURIComponent)
          .join("/");

        const { data } = await axios.get(
          `https://api.github.com/repos/${ownerName}/${repo}/contents/${encodedPath}`,
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

    // Keep successfully fetched files and their paths
    const sourceFiles = repositoryFiles
      .filter(
        (
          result,
        ): result is PromiseFulfilledResult<{
          path: string;
          content: string | null;
        }> => result.status === "fulfilled",
      )
      .map((result) => result.value);

    // 6. Collect everything into ONE variable for Gemini
    const projectContext: ProjectContext = {
      metadata: {
        name: metadata.name,
        fullName: metadata.full_name,
        url: metadata.html_url,
        description: metadata.description,
        owner: metadata.owner.login,
        defaultBranch: metadata.default_branch,
        language: metadata.language,
        topics: metadata.topics ?? [],
        homepage: metadata.homepage || null,
      },
      structure: folderStructure,
      totalItems: tree.tree.length,
      isTruncated: tree.truncated,
      sourceFiles,
      readmeStyle,
      repoDetails: repoDetails ?? null,
    };

    const generatedReadme = await GenerateReadme(projectContext);

    if (!generatedReadme) {
      throw new AppError("Failed to generate Readme", 500);
    }

    const readme = await prisma.generatedReadme.create({
      data: {
        repoUrl,
        content: generatedReadme,
        readmeStyle,
      },
    });

    return NextResponse.json(
      {
        id: readme.id,
        url: `/readme/${readme.id}`,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return handleApiError(error);
  }
}
