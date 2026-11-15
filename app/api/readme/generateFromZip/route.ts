import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/errors/handle-api-error";

import { validateZipUpload } from "@/lib/zip/validate-zip-upload";
import { extractZip } from "@/lib/zip/extract-zip";
import { filterFolderStructure } from "@/lib/zip/filter-folder-structure";
import { filterFiles } from "@/lib/zip/filter-files";
import { selectSourceFiles } from "@/lib/zip/select-source-files";
import { detectProjectLanguages } from "@/lib/zip/detect-project-languages";

import { convertPathToTree } from "@/lib/utils/convertPathToTree";

import { prisma } from "@/lib/prisma";
import { generateReadme } from "@/lib/providers/generate-readme";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const { readmeStyle, zipFile, repoDetails } = validateZipUpload(formData);

    const entries = await extractZip(zipFile);

    const allPaths = entries
      .filter((entry) => !entry.dir)
      .map((entry) => entry.name.replace(/\\/g, "/"));

    const structurePaths = filterFolderStructure(allPaths);

    const folderStructure = convertPathToTree(structurePaths);

    const filteredFiles = filterFiles(entries);

    const sourceFiles = await selectSourceFiles(filteredFiles);

    const projectLanguages = await detectProjectLanguages(structurePaths);

    const projectContext = {
      metadata: {
        language: projectLanguages,
      },
      structure: folderStructure,
      sourceFiles,
      totalItems: entries.length,
      totalFiles: structurePaths.length,
      analyzedFiles: filteredFiles.length,
      readmeStyle,
      repoDetails: repoDetails ?? null,
    };

    console.log("[ZIP] Repository analysis:", {
      totalItems: entries.length,
      totalFiles: structurePaths.length,
      analyzedFiles: filteredFiles.length,
    });

    const generatedReadme = await generateReadme(projectContext, "ZIP");

    const readme = await prisma.generatedReadme.create({
      data: {
        sourceType: "ZIP",
        fileName: zipFile.name,
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
  } catch (err) {
    console.error(err);
    return handleApiError(err);
  }
}
