export interface LanguageInfo {
  primaryLanguage: string;
  languages: {
    language: string;
    files: number;
  }[];
}

export interface ProjectMetadata {
  name?: string;
  fullName?: string;
  url?: string;
  description?: string | null;
  owner?: string;
  defaultBranch?: string;
  topics?: string[];
  homepage?: string | null;

  language: LanguageInfo | string | null;
}

export interface SourceFile {
  path: string;
  content: string | null;
  skipped?: boolean;
  reason?: string;
}

export interface ProjectContext {
  metadata: ProjectMetadata;
  structure: string;
  totalItems: number;
  sourceFiles: SourceFile[];
  readmeStyle: string;
  repoDetails: Record<string, unknown> | string | null;

  isTruncated?: boolean;
  totalFiles?: number;
  analyzedFiles?: number;
}
