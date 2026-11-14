import { GoogleGenAI } from "@google/genai";

import { README_GENERATOR_PROMPT } from "../prompts/readme-generator-prompt";
import { SOURCE_CONTEXT_INSTRUCTIONS } from "../prompts/source-context-instructions";

import type { ProjectContext } from "../types/project-context";

type ProjectSource = "GITHUB" | "ZIP";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function GenerateReadme(
  content: ProjectContext,
  source: ProjectSource,
): Promise<string> {
  const userPrompt = `
    ${SOURCE_CONTEXT_INSTRUCTIONS[source]}

    Generate a README.md for the following project.

    Project Context:
    ${JSON.stringify(content)}
  `;

  const res = await gemini.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: userPrompt,
    config: {
      systemInstruction: README_GENERATOR_PROMPT,
      temperature: 0.2,
      maxOutputTokens: 4000,
    },
  });

  return res.text?.trim() ?? "";
}
