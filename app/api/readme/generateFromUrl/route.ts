import { NextResponse } from "next/server";

import { AppError } from "@/lib/errors/app-error";
import { handleApiError } from "@/lib/errors/handle-api-error";

import { parseGitHubRepoUrl } from "@/lib/utils/github";
import { convertPathToTree } from "@/lib/utils/convertPathToTree";

import { fetchRepository } from "@/lib/url/fetch-repository";
import { selectSourceFiles } from "@/lib/url/select-source-files";
import { fetchSourceFiles } from "@/lib/url/fetch-source-files";
import { buildProjectContext } from "@/lib/types/build-project-context";

import { GenerateReadmeWithGroq } from "@/lib/providers/groq";
import { prisma } from "@/lib/prisma";

import type { ProjectContext } from "@/lib/url/project-context";

export async function POST(req: Request) {
  try {
    const { repoUrl, readmeStyle, repoDetails } = await req.json();

    if (typeof repoUrl !== "string" || !repoUrl.trim()) {
      throw new AppError("Repository URL is required.", 400);
    }

    if (!readmeStyle) {
      throw new AppError("README style is required.", 400);
    }

    // Parse GitHub URL
    const { ownerName, repo } = parseGitHubRepoUrl(repoUrl);

    // Fetch repository metadata and tree
    const { metadata, tree } = await fetchRepository(ownerName, repo);

    // Build folder structure
    const paths = tree.tree.map((item) => item.path);

    const folderStructure = convertPathToTree(paths);

    // Select important files
    const filesToFetch = selectSourceFiles(tree.tree);

    // Fetch source file contents
    const sourceFiles = await fetchSourceFiles(ownerName, repo, filesToFetch);

    // Build project context
    const projectContext: ProjectContext = buildProjectContext({
      metadata,
      tree,
      folderStructure,
      sourceFiles,
      readmeStyle,
      repoDetails: repoDetails ?? null,
    });

    const generatedReadme = await GenerateReadmeWithGroq(
      JSON.stringify(projectContext),
    );

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
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}
