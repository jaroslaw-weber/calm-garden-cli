import { BreathingData, loadData, saveData } from "./storage";
import { sleep, clearConsole } from "./utils";

interface BreathingPhase {
  name: string;
  duration: number;
}

interface BreathingPattern {
  name: string;
  command: string;
  pattern: BreathingPhase[];
}

const breathingPatterns: BreathingPattern[] = [
  {
    name: "Box Breathing",
    command: "box",
    pattern: [
      { name: "Inhale", duration: 4 },
      { name: "Hold", duration: 4 },
      { name: "Exhale", duration: 4 },
      { name: "Hold", duration: 4 },
    ],
  },
  {
    name: "Physiological Sigh",
    command: "sigh",
    pattern: [
      { name: "Inhale", duration: 2 },
      { name: "Hold", duration: 1 },
      { name: "Inhale", duration: 1 },
      { name: "Hold", duration: 1 },
      { name: "Exhale", duration: 5 },
    ],
  },
  {
    name: "Pranayama (4-7-8)",
    command: "pranayama",
    pattern: [
      { name: "Inhale", duration: 4 },
      { name: "Hold", duration: 7 },
      { name: "Exhale", duration: 8 },
    ],
  },
  {
    name: "Coherent Breathing",
    command: "coherent",
    pattern: [
      { name: "Inhale", duration: 5 },
      { name: "Exhale", duration: 5 },
    ],
  },
];
async function performBreathing(
  data: BreathingData,
  pattern: BreathingPhase[]
): Promise<void> {
  for (const phase of pattern) {
    for (let second = 1; second <= phase.duration; second++) {
      clearConsole();
      console.log(`${phase.name} ${second}/${phase.duration}`);
      console.log(`Coins: ${data.coins}`);
      console.log("Press Ctrl+C to stop the breathing exercise");

      await sleep(1000); // Wait for 1 second

      data.totalSecondsPracticed++;
      data.coins++;
      await saveData(data);
    }
  }
}

export async function startBreathing(type: string): Promise<void> {
  clearConsole();
  let data = await loadData();

  console.log("Press Ctrl+C at any time to stop the breathing exercise.");

  const selectedPattern = breathingPatterns.find((p) => p.command === type);

  if (selectedPattern) {
    try {
      while (true) {
        await performBreathing(data, selectedPattern.pattern);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "SIGINT") {
        console.log("\nBreathing exercise stopped.");
      } else {
        throw error;
      }
    }
  } else {
    const validCommands = breathingPatterns
      .map((p) => `"${p.command}"`)
      .join(", ");
    console.log(
      `Invalid breathing type. Please choose from: ${validCommands}.`
    );
  }
}
