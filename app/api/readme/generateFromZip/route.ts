import { AppError } from "@/lib/errors/app-error";
import { handleApiError } from "@/lib/errors/handle-api-error";
import { validateZipUpload } from "@/lib/zip/validate-zip-upload";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const { readmeStyle, zipFile, repoDetails } = validateZipUpload(formData);
    

  } catch (err) {
    return handleApiError(err);
  }
}
