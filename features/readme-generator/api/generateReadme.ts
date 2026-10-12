import api from "../../../api/api";
import { ReadmeStyleValue } from "../types/types";

export async function generateReadmeLocal(
  zipFile: File,
  readmeStyle: ReadmeStyleValue,
  repoDetails?: string,
) {
  const formData = new FormData();

  formData.append("zipFile", zipFile);
  formData.append("style", readmeStyle);

  if (repoDetails) {
    formData.append("repoDetail", repoDetails);
  }

  const { data } = await api.post("/local", formData);

  return data;
}

export async function generateReadmeURL(
  repoUrl: string,
  readmeStyle: ReadmeStyleValue,
  repoDetails?: string,
) {
  const { data } = await api.post("/url", {
    repoUrl,
    readmeStyle,
    repoDetails,
  });

  return data;
}
