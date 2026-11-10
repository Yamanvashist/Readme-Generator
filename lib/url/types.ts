export interface GitHubMetadata {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  owner: {
    login: string;
  };
  default_branch: string;
  language: string | null;
  topics?: string[];
  homepage: string | null;
}

export interface GitHubTreeItem {
  path: string;
  type?: string;
  size?: number;
}

export interface GitHubTreeResponse {
  tree: GitHubTreeItem[];
  truncated: boolean;
}

export interface GitHubFileResponse {
  encoding?: string;
  content?: string;
}

export interface GitHubSourceFile {
  path: string;
  content: string | null;
}