import JSZip from "jszip";

export async function readSourceFiles(entries: JSZip.JSZipObject[]) {
  const sourceFiles = await Promise.all(
    entries.map(async (file) => ({
      path: file.name,
      content: await file.async("string"),
    })),
  );

  return sourceFiles;
}
