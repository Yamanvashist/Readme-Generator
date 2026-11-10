export interface ProjectMetadata {
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  owner: string;
  defaultBranch: string;
  language: string | null;
  topics: string[];
  homepage: string | null;
}

export interface SourceFile {
  path: string;
  content: string | null;
}

export type ProjectContext = {
  metadata: ProjectMetadata;
  structure: string;
  totalItems: number;
  isTruncated: boolean;
  sourceFiles: SourceFile[];
  readmeStyle: string;
  repoDetails: Record<string, unknown> | null;
}