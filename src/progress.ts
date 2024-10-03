import { exit } from "process";
import { loadData } from "./storage";
import { clearConsole } from "./utils";

export async function showProgress(): Promise<void> {
  clearConsole();
  let data = await loadData();

  console.log("Your Box Breathing Progress:");
  console.log("-----------------------------");
  console.log(
    `Total time practiced: ${formatTime(data.totalSecondsPracticed)}`
  );
  console.log(`Coins earned: ${data.coins}`);
  console.log(`Garden size: ${data.gardenSize}x${data.gardenSize}`);
  console.log(`Number of plants: ${data.plants.length}`);

}
function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}
