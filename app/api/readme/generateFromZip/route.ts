import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/errors/handle-api-error";

import { validateZipUpload } from "@/lib/zip/validate-zip-upload";
import { extractZip } from "@/lib/zip/extract-zip";
import { filterFiles } from "@/lib/zip/filter-files";
import { readSourceFiles } from "@/lib/zip/source-files";
import { detectProjectLanguages } from "@/lib/zip/detect-project-languages";

import { convertPathToTree } from "@/lib/utils/convertPathToTree";

import { prisma } from "@/lib/prisma";
import { generateReadme } from "@/lib/providers/generate-readme";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const { readmeStyle, zipFile, repoDetails } = validateZipUpload(formData);

    const { entries } = await extractZip(zipFile);

    const { filteredFiles, filePaths } = filterFiles(entries);

    const folderStructure = convertPathToTree(filePaths);

    const sourceFiles = await readSourceFiles(filteredFiles);

    const projectLanguages = await detectProjectLanguages(filePaths);

    const projectContext = {
      metadata: {
        language: projectLanguages,
      },
      structure: folderStructure,
      sourceFiles,
      totalItems: entries.length,
      totalFiles: filePaths.length,
      analyzedFiles: filteredFiles.length,
      readmeStyle,
      repoDetails: repoDetails ?? null,
    };

    console.log("[ZIP] Repository analysis:", {
      totalItems: entries.length,
      relevantFiles: filePaths.length,
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
