import { EmojiKey, emojis } from "./const/emoji";
import { loadData } from "./storage";
import { clearConsole } from "./utils";

const emptyPlotEmoji = "🌱"; // Grass emoji for empty plots
export async function showGarden(): Promise<void> {
  clearConsole();
  let data = await loadData();

  console.log("Your Garden:\n");

  for (let y = 0; y < data.gardenSize; y++) {
    let row = "";
    for (let x = 0; x < data.gardenSize; x++) {
      const plant = data.plants.find((p) => p.x === x && p.y === y);
      if (plant) {
        row += emojis[plant.type as EmojiKey] || "🌱"; // Default to seedling if type not found
      } else {
        row += emptyPlotEmoji; // Empty plot
      }
    }
    console.log(row);
  }

}
