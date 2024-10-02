import { BreathingData, loadData, saveData } from "./storage";
import { sleep, clearConsole } from "./utils";

export async function boxBreathing(data: BreathingData): Promise<void> {
  const duration = 4;
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

//A physiological sigh is a type of deep breath characterized by a double inhalation, followed by a single, longer exhalation.
export async function physiologicalSigh(data: BreathingData): Promise<void> {
  const sighs = ["Inhale", "Hold", "Inhale", "Hold", "Exhale"];
  const times = [2, 1, 1, 1, 5];
  for (let i = 0; i < sighs.length; i++) {
    const phase = sighs[i];
    const duration = times[i];
    for (let second = 1; second <= duration; second++) {
      clearConsole();
      console.log(`${phase} ${second}/${duration}`);
      await sleep(1000);
      data.totalSecondsPracticed++;
      data.coins++;
      await saveData(data);
    }
  }
}

export async function startBreathing(
  type: "box" | "sigh"
): Promise<void> {
  clearConsole();
  let data = await loadData();

  while (true) {
    if (type === "box") {
      await boxBreathing(data);
    } else if (type === "sigh") {
      await physiologicalSigh(data);
    } else {
      console.log(
        'Invalid breathing type. Please choose either "box" or "sigh".'
      );
      return;
    }
  }
}
