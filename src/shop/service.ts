import { prompt } from "enquirer";
import { BreathingData, saveData, loadData } from "../storage";
import { clearConsole } from "../utils";
import {
  ShopItem,
  initializeShopItems,
  shopItems,
  calculateExpansionPrice,
} from "./items";
import {
  handleSellPlant,
  handleGardenExpansion,
  handleShuffleGarden,
  handleRegularPurchase,
} from "./actions";
import { sleep } from "../utils";

export async function showShop(): Promise<void> {
  let data = await loadData();
  initializeShopItems();

  while (true) {
    clearConsole();
    console.log("🏪 Welcome to the Garden Shop!");
    console.log(`💰 You have ${data.coins} coins.`);
    console.log(`🌳 Your garden size: ${data.gardenSize}x${data.gardenSize}\n`);

    const choices = createShopMenu(data);

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
  const handlers: Record<string, () => Promise<void>> = {
    "Sell Plant": async () => await handleSellPlant(data, item),
    "Garden Expansion": async () => await handleGardenExpansion(data),
    "Shuffle Garden": async () => await handleShuffleGarden(data, item),
  };

  const handler =
    handlers[item.name] || (() => handleRegularPurchase(data, item));

  await handler();
  await saveData(data);
  await sleep(2000);
}

function createShopMenu(
  data: BreathingData
): Array<{ name: string; value: number; hint: string }> {
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
  return choices;
}
