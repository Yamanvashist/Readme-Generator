import JSZip from "jszip";

const MAX_FILE_SIZE = 500 * 1024; // 500 KB per file

export async function selectSourceFiles(
  entries: JSZip.JSZipObject[],
  limit = 10,
) {
  const sourceFiles = await Promise.all(
    entries.map(async (file) => {
      
      const size = (
        file as JSZip.JSZipObject & {
          _data: { uncompressedSize: number };
        }
      )._data.uncompressedSize;

      if (size > MAX_FILE_SIZE) {
        return {
          path: file.name,
          content: "",
          skipped: true,
          reason: "File exceeds 100 KB limit",
        };
      }

      return {
        path: file.name,
        content: await file.async("string"),
        skipped: false,
      };
    }),
  );

  return sourceFiles.slice(0, limit);
}
