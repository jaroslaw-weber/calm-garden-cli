import { BreathingData, loadData, saveData } from "./storage";
import { sleep, clearConsole } from "./utils";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { prompt } from "enquirer";
import chalk from "chalk";
import { breathingPatterns } from "./const/patterns";
import { BreathingPattern, BreathingPhase } from "./types/BreathingPattern";
import path from 'path';

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
    (p) => p.name === type
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
      .map((p) => `"${p.name}"`)
      .join(", ");
    console.log(
      `Invalid breathing type. Please choose from: ${validCommands}.`
    );
  }
}
export async function getCustomBreathingPatterns(): Promise<BreathingPattern[]> {
  const filename = "breathe.json";
  const possiblePaths = [
    path.join(process.cwd(), filename),
    path.join(__dirname, '..', filename)
  ];

  for (const filePath of possiblePaths) {
    if (existsSync(filePath)) {
      console.log(`Custom breathing file found at: ${filePath}`);
      try {
        console.log("Loading custom breathing patterns...");
        const data = await readFile(filePath, "utf8");
        const customPatterns = JSON.parse(data);
        console.log("Custom breathing patterns loaded successfully.");
        return customPatterns as BreathingPattern[];
      } catch (error) {
        console.error(`Error reading ${filePath}: ${(error as Error).message}`);
      }
    }
  }

  console.log(chalk.yellow("No custom breathing file found."));
  return [];
}


export async function getBreathingPatterns(): Promise<BreathingPattern[]>{
  const hardcoded = [...breathingPatterns]
  const custom = await getCustomBreathingPatterns()
  return [...hardcoded,...custom]

}