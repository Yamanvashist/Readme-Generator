import Groq from "groq-sdk";
import { encodingForModel } from "js-tiktoken";

import { ZIP_README_GENERATOR_PROMPT } from "../prompts/zip-readme-generator-prompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const encoding = encodingForModel("gpt-4o");

export async function GenerateReadmeWithGroq(content: string) {
  const messages = [
    {
      role: "system" as const,
      content: ZIP_README_GENERATOR_PROMPT,
    },
    {
      role: "user" as const,
      content: `
        Generate a README.md for the following repository.

        Repository Context:
        ${content}
      `,
    },
  ];

  const inputTokens = messages.reduce(
    (total, message) => total + encoding.encode(message.content).length,
    0,
  );

  console.log("Estimated input tokens:", inputTokens);

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages,
    max_completion_tokens: 1800,
    temperature: 0.2,
  });

  return completion.choices[0]?.message?.content ?? "";
}