import { prompt } from "enquirer";
import { Plant } from "./Plant";
import { BreathingData, saveData, loadData } from "./storage";
import { clearConsole } from "./utils";
interface ShopItem {
  name: string;
  type: string;
  cost: number;
}
const price1 = 80;
const shopItems: ShopItem[] = [
  { name: "Anthurium", type: "anthurium", cost: price1 },
  { name: "Arugula", type: "arugula", cost: price1 },
  { name: "Chive Blossoms", type: "chive-blossoms", cost: price1 },
  { name: "Daisy", type: "daisy", cost: price1 },
  { name: "Iris", type: "iris", cost: price1 },
  { name: "Lavender", type: "lavender", cost: price1 },
  { name: "Lotus", type: "lotus", cost: price1 },
  { name: "Marigold", type: "marigold", cost: price1 },
  { name: "Morning Glory", type: "morning-glory", cost: price1 },
  { name: "Pansy", type: "pansy", cost: price1 },
  { name: "Pink Rose", type: "pink-rose", cost: price1 },
  { name: "Poppy", type: "poppy", cost: price1 },
  { name: "Sunflower", type: "sunflower", cost: price1 },
  { name: "Tomato", type: "tomato", cost: price1 },
  { name: "Tree", type: "tree", cost: price1 },
  { name: "Tulips", type: "tulips", cost: price1 },
  { name: "Garden Expansion", type: "expansion", cost: 0 }, // Cost will be calculated dynamically
];

function calculateExpansionPrice(currentSize: number): number {
  return Math.floor(100 * Math.pow(1.5, currentSize - 3));
}
export async function showShop(): Promise<void> {
  let data = await loadData();

  while (true) {
    clearConsole();
    console.log("Welcome to the Garden Shop!");
    console.log(`You have ${data.coins} coins.`);
    console.log(`Your garden size: ${data.gardenSize}x${data.gardenSize}\n`);

    const expansionPrice = calculateExpansionPrice(data.gardenSize);
    const choices = shopItems.map((item, index) => ({
      name:
        item.name === "Garden Expansion"
          ? `${item.name} (${data.gardenSize + 1}x${data.gardenSize + 1})`
          : item.name,
      value: index,
      hint:
        item.name === "Garden Expansion"
          ? ` (Cost: ${expansionPrice} coins)`
          : ` (Cost: ${item.cost} coins)`,
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
  const cost =
    item.name === "Garden Expansion"
      ? calculateExpansionPrice(data.gardenSize)
      : item.cost;
  if (data.coins >= cost) {
    data.coins -= cost;
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
