import { emojis, EmojiKey } from "../emoji";
import { Plant } from "../Plant";

export interface ShopItem {
  name: string;
  type: string;
  cost: number;
  emoji?: string;
}

const price1 = 50;
export const shopItems: ShopItem[] = [
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

export function initializeShopItems(): void {
  for (const item of shopItems) {
    item.emoji = emojis[item.type as any as EmojiKey] || "?";
  }
}

export function calculateExpansionPrice(currentSize: number): number {
  return Math.floor(100 * Math.pow(1.5, currentSize - 3));
}
export function getPlantValue(plant: Plant): number {
  // Base value for the plant type
  const baseValue =
    shopItems.find((item) => item.name === plant.name)?.cost || 10;

  // Increase value based on growth
  const growthMultiplier = 1 + (plant.growth - 1) * 0.1; // 10% increase per growth level

  return Math.round(baseValue * growthMultiplier);
}
