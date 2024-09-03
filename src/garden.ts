import { exit } from "process";
import { loadData } from "./storage";
import { clearConsole, generateGardenUrl } from "./utils";
import open from "opener";

export async function showGarden(): Promise<void> {
  clearConsole();
  let data = await loadData();

  // Convert the plants data to the format expected by generateGardenUrl
  const garden = new Array(data.gardenSize)
    .fill(null)
    .map(() => new Array(data.gardenSize).fill(null));

  data.plants.forEach((plant) => {
    garden[plant.y][plant.x] = {
      type: plant.type,
      growth: 1, // Assuming full growth, adjust if you have a growth property
    };
  });

  const gardenUrl = generateGardenUrl(garden);

  try {
    await open(gardenUrl);
    console.log("Opening your garden in the default browser...");
  } catch (error) {
    console.error(
      "Failed to open the browser. Please visit this URL manually:"
    );
    console.log(gardenUrl);
  }

  // Exit the process after attempting to open the URL
  exit(0);
}
