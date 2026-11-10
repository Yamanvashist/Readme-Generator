const extensionMap: Record<string, string> = {
  js: "JavaScript",
  jsx: "JavaScript",
  mjs: "JavaScript",
  cjs: "JavaScript",
  ts: "TypeScript",
  tsx: "TypeScript",
  py: "Python",
  java: "Java",
  cpp: "C++",
  c: "C",
  go: "Go",
  rs: "Rust",
  php: "PHP",
  rb: "Ruby",
  swift: "Swift",
  kt: "Kotlin",
  cs: "C#",
  dart: "Dart",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  sql: "SQL",
  sh: "Shell",
};

export async function detectProjectLanguages(paths: string[]) {
  const languageCounts = paths
    .map((path) => {
      const extension = path.split(".").pop()?.toLowerCase();
      return extensionMap[extension ?? ""] ?? null;
    })
    .filter((language: string) => language !== null)
    .reduce<Record<string, number>>((counts, language) => {
      counts[language] = (counts[language] ?? 0) + 1;
      return counts;
    }, {});

  const languages = Object.entries(languageCounts)
    .map(([language, files]) => ({ language, files }))
    .sort((a, b) => b.files - a.files);

  return {
    primaryLanguage: languages[0]?.language ?? null,
    languages,
  };
}
