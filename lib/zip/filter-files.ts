
import JSZip from "jszip";

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
  ".next",
  ".git",
  "dist",
  "build",
  "coverage",
  ".turbo",
  ".vercel",
];

const ignoredExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".pdf",
  ".zip",
  ".mp4",
  ".mp3",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".exe",
  ".dll",
  ".so",
]);

const ignoredFiles = new Set([
  ".DS_Store",
  "Thumbs.db",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
]);

const entryFilePattern =
  /^(main|app|index|server)\.(py|cpp|cc|c|h|hpp|js|jsx|ts|tsx|java|go|rs|php|rb)$/i;

const secretFilePattern = /\.(pem|key|p12|pfx)$/i;

const sshKeyPattern = /^(id_rsa|id_ed25519)$/i;

export function filterFiles(
  entries: JSZip.JSZipObject[],
  limit = 20,
) {
  const filteredFiles = entries
    .filter((entry) => {
      if (entry.dir) return false;

      const pathParts = entry.name.split("/");
      const fileName = pathParts[pathParts.length - 1];

      // Ignore dependency and generated folders
      if (
        pathParts.some((part) => ignoredFolders.includes(part))
      ) {
        return false;
      }

      // Ignore secrets
      if (
        fileName === ".env" ||
        fileName.startsWith(".env.") ||
        secretFilePattern.test(fileName) ||
        sshKeyPattern.test(fileName)
      ) {
        return false;
      }

      // Ignore unwanted files
      if (ignoredFiles.has(fileName)) return false;

      // Ignore binary and media files
      const extension = fileName.includes(".")
        ? `.${fileName.split(".").pop()?.toLowerCase()}`
        : "";

      if (ignoredExtensions.has(extension)) return false;

      // Select important configuration and entry-point files
      return (
        importantFileNames.has(fileName) ||
        entryFilePattern.test(fileName)
      );
    })
    .slice(0, limit);

  const filePaths = filteredFiles.map((entry) => entry.name);

  return {
    filteredFiles,
    filePaths,
  };
}
