import { BreathingData, loadData, saveData } from "./storage";
import { sleep, clearConsole } from "./utils";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { prompt } from "enquirer";
import chalk from "chalk";
interface BreathingPhase {
  name: string;
  duration: number;
}

export interface BreathingPattern {
  name: string;
  command: string;
  pattern: BreathingPhase[];
  hint?: string;
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
  pattern: BreathingPhase[],
  session: {
    time: number;
  }
): Promise<void> {
  for (const phase of pattern) {
    for (let second = 1; second <= phase.duration; second++) {
      clearConsole();
      console.log(`${phase.name} ${second}/${phase.duration}`);
      console.log(`Coins: ${data.coins}`);
      console.log(`Elapsed time: ${session.time} seconds`);
      console.log("Press Ctrl+C to stop the breathing exercise");

      await sleep(1000); // Wait for 1 second

      session.time++;
      data.totalSecondsPracticed++;
      data.coins++;
      await saveData(data);
    }
  }
}

export async function startBreathing(type: string): Promise<void> {
  clearConsole();
  const custom = await getCustomBreathingPatterns();

  let data = await loadData();

  console.log("Press Ctrl+C at any time to stop the breathing exercise.");

  const selectedPattern = [...custom, ...breathingPatterns].find(
    (p) => p.command === type
  );

  let session = { time: 0 };
  if (selectedPattern) {
    try {
      while (true) {
        await performBreathing(data, selectedPattern.pattern, session);
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

export async function getCustomBreathingPatterns(): Promise<
  BreathingPattern[]
> {
  const filename = "breath.json";
  if (existsSync(filename)) {
    try {
      const data = await readFile(filename, "utf8");
      const customPatterns = JSON.parse(data);
      return customPatterns as BreathingPattern[];
    } catch (error) {
      console.error(`Error reading ${filename}: ${(error as Error).message}`);
    }
  }
  return [];
}
