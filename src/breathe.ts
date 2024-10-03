import { BreathingData, loadData, saveData } from "./storage";
import { sleep, clearConsole } from "./utils";
import * as readline from 'readline';
interface BreathingPhase {
  name: string;
  duration: number;
}

const boxBreathingPattern: BreathingPhase[] = [
  { name: "Inhale", duration: 4 },
  { name: "Hold", duration: 4 },
  { name: "Exhale", duration: 4 },
  { name: "Hold", duration: 4 },
];

const physiologicalSighPattern: BreathingPhase[] = [
  { name: "Inhale", duration: 2 },
  { name: "Hold", duration: 1 },
  { name: "Inhale", duration: 1 },
  { name: "Hold", duration: 1 },
  { name: "Exhale", duration: 5 },
];

async function performBreathing(data: BreathingData, pattern: BreathingPhase[]): Promise<void> {
  for (const phase of pattern) {
    for (let second = 1; second <= phase.duration; second++) {
      clearConsole();
      console.log(`${phase.name} ${second}/${phase.duration}`);
      console.log("Press Ctrl+C to stop the breathing exercise");

      await sleep(1000);  // Wait for 1 second

      data.totalSecondsPracticed++;
      data.coins++;
      await saveData(data);
    }
  }
}

export async function boxBreathing(data: BreathingData): Promise<void> {
  await performBreathing(data, boxBreathingPattern);
}

export async function physiologicalSigh(data: BreathingData): Promise<void> {
  await performBreathing(data, physiologicalSighPattern);
}

export async function startBreathing(
  type: "box" | "sigh"
): Promise<void> {
  clearConsole();
  let data = await loadData();

  console.log("Press Ctrl+C at any time to stop the breathing exercise.");

  try {
    if (type === "box") {
      await boxBreathing(data);
    } else if (type === "sigh") {
      await physiologicalSigh(data);
    } else {
      console.log(
        'Invalid breathing type. Please choose either "box" or "sigh".'
      );
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'SIGINT') {
      console.log("\nBreathing exercise stopped.");
    } else {
      throw error;
    }
  }
}