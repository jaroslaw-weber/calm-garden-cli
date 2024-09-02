import { BreathingData, loadData, saveData } from "./storage";
import { sleep, clearConsole } from "./utils";

export async function boxBreathing(
  duration: number,
  data: BreathingData
): Promise<void> {
  const phases = ["Inhale", "Hold", "Exhale", "Hold"];
  for (let phase of phases) {
    for (let second = 1; second <= duration; second++) {
      clearConsole();
      console.log(`${phase} ${second}`);
      await sleep(1000);
      data.totalSecondsPracticed++;
      data.coins++;
      //save progress to storage after each breathing cycle
      //this will be useful for tracking progress over time and maybe motivate the user to continue practicing
      await saveData(data);
    }
  }
}

export async function startBoxBreathing(duration: number): Promise<void> {
  clearConsole();
  let data = await loadData();

  while (true) {
    await boxBreathing(duration, data);
  }
}
