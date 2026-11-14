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
  "tsconfig.json",
  "jsconfig.json",
  "next.config.js",
  "next.config.ts",
  "next.config.mjs",
  "vite.config.ts",
  "vite.config.js",
]);

const ignoredFolders = new Set([
  "node_modules",
  "vendor",
  ".next",
  ".git",
  "dist",
  "build",
  "coverage",
  ".turbo",
  ".vercel",
  "__pycache__",
  ".venv",
  "venv",
  "_lang",
]);

const ignoredExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".svg",
  ".avif",
  ".pdf",
  ".zip",
  ".rar",
  ".7z",
  ".mp4",
  ".mp3",
  ".wav",
  ".mov",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".exe",
  ".dll",
  ".so",
  ".dylib",
  ".class",
  ".jar",
  ".map",
]);

const ignoredFiles = new Set([
  ".DS_Store",
  "Thumbs.db",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lock",
  "bun.lockb",
]);

const entryFilePattern =
  /^(main|app|index|server)\.(py|cpp|cc|c|h|hpp|js|jsx|ts|tsx|java|go|rs|php|rb)$/i;

const secretFilePattern = /\.(pem|key|p12|pfx)$/i;

const sshKeyPattern = /^(id_rsa|id_ed25519)$/i;

function shouldIgnoreFile(path: string): boolean {
  const normalizedPath = path.replace(/\\/g, "/").replace(/^\.?\//, "");

  const pathParts = normalizedPath.split("/");
  const fileName = pathParts.at(-1) ?? "";

  // Ignore unnecessary directories
  if (pathParts.some((part) => ignoredFolders.has(part))) {
    return true;
  }

  // Ignore environment files and secrets
  if (
    fileName === ".env" ||
    fileName.startsWith(".env.") ||
    secretFilePattern.test(fileName) ||
    sshKeyPattern.test(fileName)
  ) {
    return true;
  }

  // Ignore unwanted files
  if (ignoredFiles.has(fileName)) {
    return true;
  }

  // Ignore binary and media files
  const extension = fileName.includes(".")
    ? `.${fileName.split(".").pop()?.toLowerCase()}`
    : "";

  if (ignoredExtensions.has(extension)) {
    return true;
  }

  return false;
}

function isImportantFile(path: string): boolean {
  const fileName = path.split("/").at(-1) ?? "";

  return importantFileNames.has(fileName) || entryFilePattern.test(fileName);
}

export function filterFiles(entries: JSZip.JSZipObject[], limit = 20) {
  // 1. Keep all relevant file paths for folder structure
  const filePaths = entries
    .filter((entry) => {
      if (entry.dir) return false;

      return !shouldIgnoreFile(entry.name);
    })
    .map((entry) => entry.name.replace(/\\/g, "/"))
    .sort();

  // 2. Select only important files for AI analysis
  const filteredFiles = entries
    .filter((entry) => {
      if (entry.dir || shouldIgnoreFile(entry.name)) {
        return false;
      }

      return isImportantFile(entry.name);
    })
    .slice(0, limit);

  return {
    filteredFiles,
    filePaths,
  };
}
