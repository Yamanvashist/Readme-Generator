import { GoogleGenAI } from "@google/genai";
import { README_GENERATOR_PROMPT } from "./prompts/readme-generator";

import type { ProjectContext } from "./types/project-context";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function GenerateReadme(content: ProjectContext) {
  const res = await gemini.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
            ${README_GENERATOR_PROMPT},

            Repository Context :
            ${JSON.stringify(content)}
            `,
  });
  return res.text;
}
