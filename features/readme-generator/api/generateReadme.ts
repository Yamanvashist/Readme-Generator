import api from "../../../api/api";
import { ReadmeStyleValue } from "../types/types";

import { README_GENERATOR_PROMPT } from "@/lib/prompts/readme-generator";

export async function generateReadmeLocal(
  zipFile: File,
  readmeStyle: ReadmeStyleValue,
  repoDetails?: string,
) {
  const formData = new FormData();

  formData.append("zipFile", zipFile);
  formData.append("readmeStyle", readmeStyle);

  if (repoDetails) {
    formData.append("repoDetails", repoDetails);
  }

  const { data } = await api.post("/generateFromZip", formData);

  return data;
}

export async function generateReadmeURL(
  repoUrl: string,
  readmeStyle: ReadmeStyleValue,
  repoDetails?: string,
) {
  const { data } = await api.post("/generateFromUrl", {
    repoUrl,
    readmeStyle,
    repoDetails,
  });

  return data;
}
