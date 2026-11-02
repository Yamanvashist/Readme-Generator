import { AppError } from "../errors/app-error";

export function validateZipUpload(formData: FormData) {
  const readmeStyle = formData.get("readmeStyle");
  const zipFile = formData.get("zipFile");
  const repoDetails = formData.get("repoDetails");

  if (!readmeStyle) {
    throw new AppError("README style is required.", 400);
  }
  if (!(zipFile instanceof File)) {
    throw new AppError("No file uploaded", 400);
  }

  const MAX_UPLOAD_SIZE = 20 * 1024 * 1024;

  if (zipFile.size === 0) {
    throw new AppError("The uploaded ZIP file is empty.", 400);
  }

  if (zipFile.size > MAX_UPLOAD_SIZE) {
    throw new AppError("ZIP file must be smaller than 10 MB.", 400);
  }

  if (
    typeof readmeStyle !== "string" ||
    !["professional", "developer", "minimal", "open-source"].includes(
      readmeStyle,
    )
  ) {
    throw new AppError("Invalid README style.", 400);
  }

  if (repoDetails !== null && typeof repoDetails !== "string") {
    throw new AppError("Invalid repository details.", 400);
  }

  return {
    readmeStyle,
    zipFile,
    repoDetails,
  };
  
}
