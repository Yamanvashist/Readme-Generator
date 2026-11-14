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
  ".env.example",
]);

const entryFilePattern =
  /^(main|app|index|server|page)\.(py|cpp|cc|c|h|hpp|js|jsx|ts|tsx|java|go|rs|php|rb)$/i;

export function selectSourceFiles(paths: string[], limit = 5) {
  return paths
    .filter((path) => {
      const fileName = path.split("/").at(-1) ?? "";

      return (
        importantFileNames.has(fileName) || entryFilePattern.test(fileName)
      );
    })
    .slice(0, limit);
}
