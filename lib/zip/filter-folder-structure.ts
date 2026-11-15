const ignoredDirectories = new Set([
  "node_modules",
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
  "_data",
  "vendor",
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
  ".mp3",
  ".mp4",
  ".wav",
  ".mov",
  ".pdf",
  ".zip",
  ".rar",
  ".7z",
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
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lock",
  "bun.lockb",
  ".DS_Store",
  "Thumbs.db",
]);

export function filterFolderStructure(paths: string[]) {
  return paths.filter((path) => {
    const normalizedPath = path.replace(/\\/g, "/");
    const segments = normalizedPath.split("/");
    const fileName = segments.at(-1) ?? "";

    if (segments.some((segment) => ignoredDirectories.has(segment))) {
      return false;
    }

    if (ignoredFiles.has(fileName)) {
      return false;
    }

    const extension = fileName.includes(".")
      ? `.${fileName.split(".").pop()?.toLowerCase()}`
      : "";

    if (ignoredExtensions.has(extension)) {
      return false;
    }

    return true;
  });
}
