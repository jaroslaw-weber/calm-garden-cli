import { prompt } from "enquirer";
import { Plant } from "./Plant";
import { BreathingData, saveData, loadData } from "./storage";
import { clearConsole } from "./utils";
interface ShopItem {
  name: string;
  type: string;
  cost: number;
}

const shopItems: ShopItem[] = [
  { name: "Sunflower", type: "sunflower", cost: 50 },
  { name: "Peace Lily", type: "peace-lily", cost: 80 },
  { name: "Rose", type: "rose", cost: 60 },
  { name: "Chrysanthemum", type: "chrysanthemum", cost: 70 },
  { name: "Lavender", type: "lavender", cost: 90 },
  { name: "Bell Pepper", type: "bell-pepper", cost: 100 },
  { name: "Violet", type: "violet", cost: 110 },
  { name: "Tulip", type: "tulip", cost: 120 },
  { name: "Bamboo", type: "bamboo", cost: 140 },
  { name: "Fern", type: "fern", cost: 160 },
  { name: "Lily of the Valley", type: "lily-of-the-valley", cost: 180 },
  { name: "Dandelion", type: "dandelion", cost: 200 },
  { name: "Bougainvillea", type: "bougainvillea", cost: 220 },
];

export async function showShop(): Promise<void> {
  let data = await loadData();

  while (true) {
    clearConsole();
    console.log("Welcome to the Garden Shop!");
    console.log(`You have ${data.coins} coins.`);
    console.log(`Your garden size: ${data.gardenSize}x${data.gardenSize}\n`);

    const choices = shopItems.map((item, index) => ({
      name: `${item.name}`,
      value: index,
      hint: ` (Cost: ${item.cost} coins)`,
    }));
    choices.push({ name: "Exit Shop", value: -1, hint: "Leave the shop" });

    const response = await prompt<{ choice: string }>({
      type: "select",
      name: "choice",
      message: "Choose an item to purchase:",
      choices,
    });

    if (response.choice.includes("Exit")) break;

    console.log("choice", response.choice);
    const item = shopItems.find((x) => response.choice.startsWith(x.name));
    console.log("Purchased:", item);

    // Add this check
    if (item) {
      await purchaseItem(data, item);
    } else {
      console.log("Invalid selection. Please try again.");
      await sleep(2000);
    }
  }
}
async function purchaseItem(
  data: BreathingData,
  item: ShopItem
): Promise<void> {
  if (data.coins >= item.cost) {
    data.coins -= item.cost;
    if (item.name === "Garden Expansion") {
      data.gardenSize++;
      console.log(
        `You've expanded your garden! New size: ${data.gardenSize}x${data.gardenSize}`
      );
    } else {
      if (!data.plants) data.plants = [];
      if (data.plants.length < data.gardenSize * data.gardenSize) {
        const newPlant = placePlantRandomly(data, item);
        data.plants.push(newPlant);
        console.log(`You've purchased a ${item.name} for your garden!`);
        console.log(`Placed at position (${newPlant.x}, ${newPlant.y})`);
      } else {
        console.log("Your garden is full! Consider expanding your garden.");
        data.coins += item.cost; // Refund the coins
        await sleep(2000);
        return;
      }
    }
    await saveData(data);
  } else {
    console.log("Not enough coins. Keep practicing to earn more!");
  }
  await sleep(2000);
}

function placePlantRandomly(data: BreathingData, item: ShopItem): Plant {
  let x: number, y: number;
  do {
    x = Math.floor(Math.random() * data.gardenSize);
    y = Math.floor(Math.random() * data.gardenSize);
  } while (data.plants.some((p) => p.x === x && p.y === y));

  return { name: item.name, type: item.type, x, y, growth: 1 };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
