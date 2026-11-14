import JSZip from "jszip";

const MAX_FILE_SIZE = 100 * 1024; // 100 KB per file

export async function readSourceFiles(entries: JSZip.JSZipObject[]) {
  const sourceFiles = await Promise.all(
    entries.map(async (file) => {
      // Check uncompressed file size before reading
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

  return sourceFiles;
}
