import { prompt } from "enquirer";
import chalk from "chalk";

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
    const breathingResponse = await prompt<{ breathingType: string }>({
      type: "select",
      name: "breathingType",
      message: "Choose a breathing exercise:",
      choices: [
        {
          name: "box",
          message: "🟦 Box Breathing",
          hint: "Inhale, hold, exhale, hold - each for equal counts. Reduces stress and improves focus.",
        },
        {
          name: "sigh",
          message: "😮‍💨 Physiological Sigh",
          hint: "Double inhale through the nose, followed by a long exhale. Quickly resets the nervous system.",
        },
        {
          name: "pranayama",
          message: "🌬️ Pranayama Breathing",
          hint: "Ancient yogic breathing technique. Various patterns to balance body and mind.",
        },
        {
          name: "coherent",
          message: "🌊 Coherent Breathing",
          hint: "Breathe at a rate of 5-7 breaths per minute. Promotes heart-brain coherence and calmness.",
        },
      ],
    });

    return { action: breathingResponse.breathingType };
  }

  return mainResponse;
}
