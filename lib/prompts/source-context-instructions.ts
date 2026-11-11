
export const SOURCE_CONTEXT_INSTRUCTIONS = {
  GITHUB: `
## Source-specific context: GitHub repository

The supplied context comes from a GitHub repository.

It may contain:
- GitHub repository metadata.
- Repository folder structure.
- Total entries returned by GitHub.
- A flag indicating whether the recursive tree response was truncated.
- Selected source files and their contents.

Use repository metadata as supporting evidence.

If the tree is truncated, recognize that the available structure may be incomplete.

If source file contents are unavailable, do not claim to have inspected them.

Do not assume the selected source files represent every file in the repository.
`,

  ZIP: `
## Source-specific context: ZIP archive

The supplied context comes from a local project extracted from a ZIP archive.

It may contain:
- Folder structure generated from ZIP entries.
- Selected source files and their actual contents.
- Total entries found in the archive.
- Number of files remaining after filtering.

The supplied sourceFiles array contains only files selected for analysis.

Do not assume an unavailable file does not exist in the original project.

Do not assume the supplied folder structure represents every original file if filtering has removed entries.

If a file is listed in the structure but its contents are unavailable, do not claim to have inspected it.
`,
};
