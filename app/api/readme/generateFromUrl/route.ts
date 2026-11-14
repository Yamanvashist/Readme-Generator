import { NextResponse } from "next/server";

import { AppError } from "@/lib/errors/app-error";
import { handleApiError } from "@/lib/errors/handle-api-error";

import { parseGitHubRepoUrl } from "@/lib/utils/github";
import { convertPathToTree } from "@/lib/utils/convertPathToTree";

import { fetchRepository } from "@/lib/url/fetch-repository";
import { filterFolderStructure } from "@/lib/url/filter-folder-structure";
import { selectSourceFiles } from "@/lib/url/select-source-files";
import { fetchSourceFiles } from "@/lib/url/fetch-source-files";
import { buildProjectContext } from "@/lib/url/build-project-context";

import { GenerateReadmeWithGroq } from "@/lib/providers/groq";
import { prisma } from "@/lib/prisma";

import type { ProjectContext } from "@/lib/types/project-context";
import { generateReadme } from "@/lib/providers/generate-readme";

export async function POST(req: Request) {
  try {
    const { repoUrl, readmeStyle, repoDetails } = (await req.json()) as {
      repoUrl: string;
      readmeStyle: string;
      repoDetails?: string;
    };

    if (typeof repoUrl !== "string" || !repoUrl.trim()) {
      throw new AppError("Repository URL is required.", 400);
    }

    if (!readmeStyle) {
      throw new AppError("README style is required.", 400);
    }

    const { ownerName, repo } = parseGitHubRepoUrl(repoUrl);

    // Fetch repository metadata and tree
    const { metadata, tree } = await fetchRepository(ownerName, repo);

    const paths = tree.tree
      .filter((item) => item.type === "blob")
      .map((item) => item.path);

    // removes unnecessary folder files before converting into tree structure
    const filteredPaths = filterFolderStructure(paths);

    // converts path into tree Structure
    const folderStructure = convertPathToTree(filteredPaths);

    // remove unnecessary files before fetching text from each files
    const filesToFetch = selectSourceFiles(filteredPaths);

    const sourceFiles = await fetchSourceFiles(ownerName, repo, filesToFetch);

    const projectContext: ProjectContext = buildProjectContext({
      metadata,
      tree,
      folderStructure,
      sourceFiles,
      readmeStyle,
      repoDetails: repoDetails ? { details: repoDetails } : null,
    });

    const generatedReadme = await generateReadme(projectContext, "GITHUB");

    if (!generatedReadme) {
      throw new AppError("Failed to generate README.", 500);
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
        tree,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}
