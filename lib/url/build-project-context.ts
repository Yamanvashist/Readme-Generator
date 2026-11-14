import type { ProjectContext } from "@/lib/types/project-context";

import type {
  GitHubMetadata,
  GitHubTreeResponse,
  GitHubSourceFile,
} from "./types";

interface BuildProjectContextProps {
  metadata: GitHubMetadata;
  tree: GitHubTreeResponse;
  folderStructure: string;
  sourceFiles: GitHubSourceFile[];
  readmeStyle: ProjectContext["readmeStyle"];
  repoDetails: ProjectContext["repoDetails"];
}

export function buildProjectContext({
  metadata,
  tree,
  folderStructure,
  sourceFiles,
  readmeStyle,
  repoDetails,
}: BuildProjectContextProps): ProjectContext {
  return {
    metadata: {
      name: metadata.name,
      fullName: metadata.full_name,
      url: metadata.html_url,
      description: metadata.description,
      owner: metadata.owner.login,
      defaultBranch: metadata.default_branch,
      language: metadata.language,
      topics: metadata.topics ?? [],
      homepage: metadata.homepage || null,
    },

    structure: folderStructure,
    totalItems: tree.tree.length,
    isTruncated: tree.truncated,
    sourceFiles,
    readmeStyle,
    repoDetails: repoDetails ?? null,
  };
}