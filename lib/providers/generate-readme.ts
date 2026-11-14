
import { GenerateReadmeWithGroq } from "./groq";
import { GenerateReadme } from "./gemini";

import type { ProjectContext } from "../types/project-context";

type ProjectSource = "GITHUB" | "ZIP";

export async function generateReadme(
  content: ProjectContext,
  source: ProjectSource,
): Promise<string> {
  // Primary provider: Groq
  try {
    console.log("[README] Trying Groq...");

    const result = await GenerateReadmeWithGroq(
      JSON.stringify(content),
      source,
    );

    if (!result?.trim()) {
      throw new Error("Groq returned an empty response.");
    }

    console.log("[README] Successfully generated using Groq.");

    return result;
  } catch (error) {
    console.error("[README] Groq failed:", error);
  }

  // Backup : Gemini
  try {
    console.log("[README] Switching to Gemini...");

    const result = await GenerateReadme(content, source);

    if (!result?.trim()) {
      throw new Error("Gemini returned an empty response.");
    }

    console.log("[README] Successfully generated using Gemini.");

    return result;
  } catch (error) {
    console.error("[README] Gemini failed:", error);

    throw new Error(
      "README generation failed. Both Groq and Gemini failed.",
    );
  }
}
