import type { GitHubTreeItem } from "./types";

const importantFileNames = new Set([
  "package.json",
  "pyproject.toml",
  "requirements.txt",
  "Pipfile",
  "setup.py",
  "Cargo.toml",
  "go.mod",
  "pom.xml",
  "build.gradle",
  "build.gradle.kts",
  "CMakeLists.txt",
  "Makefile",
  "meson.build",
  "composer.json",
  "Gemfile",
  "Dockerfile",
  "docker-compose.yml",
  "pnpm-workspace.yaml",
  "README.md",
  "LICENSE",
  ".gitignore",
]);

const ignoredFolders = [
  "node_modules",
  "vendor",
  "dist",
  "build",
  ".next",
  "coverage",
  ".git",
];

const entryFilePattern =
  /^(main|app|index|server)\.(py|cpp|cc|c|h|hpp|js|jsx|ts|tsx|java|go|rs|php|rb)$/i;

const secretFilePattern = /\.(pem|key|p12|pfx)$/i;

const sshKeyPattern = /^(id_rsa|id_ed25519)$/i;

export function selectSourceFiles(
  files: GitHubTreeItem[],
  limit = 20,
) {
  return files
    .filter((file) => {
      if (file.type === "tree") return false;

      const pathParts = file.path.split("/");
      const fileName = pathParts[pathParts.length - 1];

      // Exclude generated and dependency directories
      if (
        pathParts.some((part) => ignoredFolders.includes(part))
      ) {
        return false;
      }

      // Exclude secrets
      if (
        fileName === ".env" ||
        fileName.startsWith(".env.") ||
        secretFilePattern.test(fileName) ||
        sshKeyPattern.test(fileName)
      ) {
        return false;
      }

      // Select important configuration and entry-point files
      return (
        importantFileNames.has(fileName) ||
        entryFilePattern.test(fileName)
      );
    })
    .slice(0, limit);
}