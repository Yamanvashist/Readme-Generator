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
  /^(main|app|index|server|page)\.(py|cpp|cc|c|h|hpp|js|jsx|ts|tsx|java|go|rs|php|rb|tsx)$/i;

const secretFilePattern = /\.(pem|key|p12|pfx|jks|keystore|ppk)$/i;

const sshKeyPattern = /^(id_rsa|id_ed25519|id_ecdsa|id_dsa)$/i;

export function selectSourceFiles(files: GitHubTreeItem[], limit = 10) {
  return files
    .filter((file) => {
      if (file.type === "tree") return false;

      // take actually file name from path exm - src/main.ts -> ["src","main.ts"]

      const pathParts = file.path.split("/");

      // pick file name with last array index exm - ["src","main.ts"] , filename = main.ts
      const fileName = pathParts[pathParts.length - 1];

      // Exclude generated and dependency directories
      if (pathParts.some((part) => ignoredFolders.includes(part))) {
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

      console.log(
        importantFileNames.has(fileName) || entryFilePattern.test(fileName),
      );
      // Select important configuration and entry-point files
      return (
        importantFileNames.has(fileName) || entryFilePattern.test(fileName)
      );
    })
    .slice(0, limit);
}
