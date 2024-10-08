import { prompt } from "enquirer";
import { Plant } from "./Plant";
import { BreathingData, saveData, loadData } from "./storage";
import { clearConsole } from "./utils";
import { emojis, plantEmojis, EmojiKey } from "./emoji";
interface ShopItem {
  name: string;
  type: string;
  cost: number;
  emoji?: string;
}

const price1 = 50;
const shopItems: ShopItem[] = [
  {
    name: "Arugula",
    type: "arugula",
    cost: price1,
  },
  { name: "Daisy", type: "daisy", cost: price1 },
  { name: "Iris", type: "iris", cost: price1 },
  { name: "Lotus", type: "lotus", cost: price1 },
  {
    name: "Marigold",
    type: "marigold",
    cost: price1,
  },
  {
    name: "Pink Rose",
    type: "pink-rose",
    cost: price1,
  },
  { name: "Poppy", type: "poppy", cost: price1 },
  {
    name: "Sunflower",
    type: "sunflower",
    cost: price1,
  },
  { name: "Tomato", type: "tomato", cost: price1 },
  { name: "Tree", type: "tree", cost: price1 },
  { name: "Cactus", type: "cactus", cost: price1 },
  { name: "Palm", type: "palm", cost: price1 },
  { name: "Bonsai", type: "bonsai", cost: price1 },
  { name: "Bamboo", type: "bamboo", cost: price1 },
  {
    name: "Hibiscus",
    type: "hibiscus",
    cost: price1,
  },
  { name: "Orchid", type: "orchid", cost: price1 },
  {
    name: "Cherry Blossom",
    type: "cherry-blossom",
    cost: price1,
  },
  {
    name: "Mushroom",
    type: "mushroom",
    cost: price1,
  },
  { name: "Herb", type: "herb", cost: price1 },
  {
    name: "Seedling",
    type: "seedling",
    cost: price1,
  },
  { name: "Leaves", type: "leaves", cost: price1 },
  {
    name: "Four Leaf Clover",
    type: "four-leaf-clover",
    cost: price1,
  },
  {
    name: "Maple Leaf",
    type: "maple-leaf",
    cost: price1,
  },
  {
    name: "Evergreen",
    type: "evergreen",
    cost: price1,
  },
  { name: "Rock", type: "rock", cost: price1 },
  {
    name: "Garden Expansion",
    type: "expansion",
    cost: 0,
  },
  { name: "Shuffle Garden", type: "shuffle", cost: 50 },
  { name: "Sell Plant", type: "sell", cost: -20 },
];

function initializeShopItems(): void {
  for (const item of shopItems) {
    item.emoji = emojis[item.type as any as EmojiKey] || "?";
  }
}

function calculateExpansionPrice(currentSize: number): number {
  return Math.floor(100 * Math.pow(1.5, currentSize - 3));
}

export async function showShop(): Promise<void> {
  let data = await loadData();
  initializeShopItems();

  while (true) {
    clearConsole();
    console.log("🏪 Welcome to the Garden Shop!");
    console.log(`💰 You have ${data.coins} coins.`);
    console.log(`🌳 Your garden size: ${data.gardenSize}x${data.gardenSize}\n`);

    const expansionPrice = calculateExpansionPrice(data.gardenSize);
    const choices = shopItems.map((item, index) => ({
      name:
        item.name === "Garden Expansion"
          ? `${item.emoji} ${item.name} (${data.gardenSize + 1}x${
              data.gardenSize + 1
            })`
          : `${item.emoji} ${item.name}`,
      value: index,
      hint:
        item.name === "Garden Expansion"
          ? ` (Cost: ${expansionPrice} coins)`
          : ` (Cost: ${item.cost} coins)`,
    }));
    choices.push({ name: "🚪 Exit Shop", value: -1, hint: "Leave the shop" });

    const response = await prompt<{ choice: string }>({
      type: "select",
      name: "choice",
      message: "Choose an item to purchase:",
      choices,
    });

    if (response.choice.includes("Exit")) break;

    const item = shopItems.find((x) => response.choice.includes(x.name));

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
  if (item.name === "Sell Plant") {
    if (data.plants && data.plants.length > 0) {
      const plantChoices = data.plants.map((plant, index) => ({
        name: `${plant.name} at (${plant.x}, ${plant.y})`,
        value: index,
      }));

      const response: { plantIndex: number } = await prompt({
        type: "select",
        name: "plantIndex",
        message: "Select a plant to sell:",
        choices: plantChoices,
      });
      const soldPlant = data.plants.splice(response.plantIndex, 1)[0];
      data.coins += Math.abs(item.cost); // Add 20 coins
      console.log(`You've sold a ${soldPlant.name} for 20 coins!`);

      // Save the updated data
      await saveData(data);
    } else {
      console.log("Your garden is empty. There are no plants to sell.");
    }
    await sleep(2000);
    return;
  }
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
    } else if (item.name === "Shuffle Garden") {
      if (data.plants && data.plants.length > 1) {
        shuffleGarden(data);
        console.log("Your garden has been shuffled!");
      } else {
        console.log("You need at least two plants to shuffle the garden.");
        data.coins += item.cost; // Refund the coins
      }
    } else if (item.name === "Delete Random Plant") {
      if (data.plants && data.plants.length > 0) {
        const deletedPlant = deleteRandomPlant(data);
        console.log(`Deleted a ${deletedPlant.name} from your garden!`);
      } else {
        console.log("Your garden is empty. There are no plants to delete.");
        data.coins += item.cost; // Refund the coins
      }
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
function deleteRandomPlant(data: BreathingData): Plant {
  if (!data.plants || data.plants.length === 0) {
    throw new Error("No plants in the garden to delete.");
  }

  const randomIndex = Math.floor(Math.random() * data.plants.length);
  const [deletedPlant] = data.plants.splice(randomIndex, 1);
  return deletedPlant;
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
function shuffleGarden(data: BreathingData): void {
  if (!data.plants || data.plants.length <= 1) return;

  const availablePositions: { x: number; y: number }[] = [];
  for (let x = 0; x < data.gardenSize; x++) {
    for (let y = 0; y < data.gardenSize; y++) {
      availablePositions.push({ x, y });
    }
  }

  // Fisher-Yates shuffle algorithm
  for (let i = availablePositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availablePositions[i], availablePositions[j]] = [
      availablePositions[j],
      availablePositions[i],
    ];
  }

  for (let i = 0; i < data.plants.length; i++) {
    const newPosition = availablePositions[i];
    data.plants[i].x = newPosition.x;
    data.plants[i].y = newPosition.y;
  }
}
