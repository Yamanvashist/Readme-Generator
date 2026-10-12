import { useMutation } from "@tanstack/react-query";
import { generateReadmeLocal, generateReadmeURL } from "../api/generateReadme";

import { ReadmeStyleValue } from "../types/types";

type GenerateReadmeProps = {
  readmeStyle: ReadmeStyleValue;
  repoDetails?: string;
};

type LocalProps = GenerateReadmeProps & {
  zipFile: File;
};

type URLProps = GenerateReadmeProps & {
  repoUrl: string;
};

export function useGenerateReadmeLocal() {
  return useMutation({
    mutationFn: ({ zipFile, readmeStyle, repoDetails }: LocalProps) =>
      generateReadmeLocal(zipFile, readmeStyle, repoDetails),
  });
}

export function useGenerateReadmeURL() {
  return useMutation({
    mutationFn: ({ repoUrl, readmeStyle, repoDetails }: URLProps) =>
      generateReadmeURL(repoUrl, readmeStyle, repoDetails),
  });
}
