import { prompt } from "enquirer";
import chalk from "chalk";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { getBreathingPatterns, getCustomBreathingPatterns } from "./breathe";
import { BreathingPattern } from "./types/BreathingPattern";
import { breathingPatterns } from "./const/patterns";

export async function setupConfig() {
  console.log(chalk.green("\n🌿 Welcome to CLI Calm Garden 🌿\n"));

  const mainResponse = await prompt<{ action: string }>({
    type: "select",
    name: "action",
    message: "What would you like to do?",
    choices: [
      { name: "garden", message: "🏡 Show Garden" },
      { name: "progress", message: "📊 Show Progress" },
      { name: "breathing", message: "🧘 Breathing Exercise" },
      { name: "shop", message: "🛒 Open Shop" },
      { name: "reset", message: "🔄 Reset Data" },
      { name: "exit", message: "👋 Exit" },
    ],
  });

  if (mainResponse.action === "breathing") {
    const patterns = await getBreathingPatterns();
    const breathingChoices = [
      ...patterns.map((p) => ({
        name: p.name,
        message: `${p.emoji} ${p.display}`,
        hint: p.description!,
      })),
    ];


    const breathingResponse = await prompt<{ breathingType: string }>({
      type: "select",
      name: "breathingType",
      message: "Choose a breathing exercise:",
      choices: breathingChoices,
    });

    return { action: breathingResponse.breathingType };
  }

  return mainResponse;
}
