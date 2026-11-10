import JSZip from "jszip";
import { AppError } from "@/lib/errors/app-error";

export async function extractZip(file: File) {
  try {
    const buffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(buffer);
    const entries = Object.values(zip.files);

    if (entries.length === 0) {
      throw new AppError("The ZIP archive is empty.", 400);
    }

    return { entries, buffer, zip };
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError("Invalid or corrupted ZIP archive.", 400);
  }
}
