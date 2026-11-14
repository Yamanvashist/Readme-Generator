import Groq from "groq-sdk";
import { getEncoding } from "js-tiktoken";

import { README_GENERATOR_PROMPT } from "../prompts/readme-generator-prompt";
import { SOURCE_CONTEXT_INSTRUCTIONS } from "../prompts/source-context-instructions";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const encoding = getEncoding("o200k_base");

function countTokens(text: string): number {
  return encoding.encode(text).length;
}

type ProjectSource = "GITHUB" | "ZIP";

export async function GenerateReadmeWithGroq(
  content: string,
  source: ProjectSource,
) {
  const systemPrompt = README_GENERATOR_PROMPT;

  const userPrompt = `
    ${SOURCE_CONTEXT_INSTRUCTIONS[source]}

    Generate a README.md for the following project.

    Project Context:
    ${JSON.stringify(content)}
  `;

  const messages = [
    {
      role: "system" as const,
      content: systemPrompt,
    },
    {
      role: "user" as const,
      content: userPrompt,
    },
  ];

  // Estimate input tokens before API request
  const systemTokens = countTokens(systemPrompt);
  const instructionsTokens = countTokens(SOURCE_CONTEXT_INSTRUCTIONS[source]);
  const projectTokens = countTokens(content);

  const estimatedInputTokens =
    countTokens(systemPrompt) + countTokens(userPrompt);

  console.group("📊 README Token Analysis");

  console.log("Source:", source);
  console.log("System Prompt Tokens:", systemTokens);
  console.log("Source Instructions Tokens:", instructionsTokens);
  console.log("Project Content Tokens:", projectTokens);
  console.log("Estimated Input Tokens:", estimatedInputTokens);

  console.groupEnd();

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages,
    max_completion_tokens: 4000,
    temperature: 0.2,
    include_reasoning: false,
  });

  const output = completion.choices[0]?.message?.content ?? "";

  // Estimate output tokens
  const estimatedOutputTokens = countTokens(output);

  console.group("📊 README Token Output");

  console.log("Generated README Characters:", output.length);
  console.log("Estimated Output Tokens:", estimatedOutputTokens);

  console.log("Finish Reason:", completion.choices[0]?.finish_reason);

  console.log("Message:", completion.choices[0]?.message);

  console.log(
    "Reasoning Tokens:",
    completion.usage?.completion_tokens_details?.reasoning_tokens,
  );

  // Actual token usage reported by Groq
  console.log("Actual API Usage:", {
    inputTokens: completion.usage?.prompt_tokens,
    outputTokens: completion.usage?.completion_tokens,
    totalTokens: completion.usage?.total_tokens,
  });

  console.groupEnd();

  return output;
}
