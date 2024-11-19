import { prompt } from "enquirer";
import { BreathingData, saveData } from "../storage";
import { ShopItem, calculateExpansionPrice, getPlantValue } from "./shopItems";
import { Plant } from "../Plant";
import { emojis } from "../emoji";

export async function handleSellPlant(
  data: BreathingData,
  item: ShopItem
): Promise<void> {
  if (!data.plants || data.plants.length === 0) {
    console.log("Your garden is empty. There are no plants to sell.");
    return;
  }

  const plantChoices = data.plants.map((plant, index) => {
    //@ts-expect-error

    const emoji = emojis[plant.type]!;
    return {
      name: `${emoji} ${plant.name} at (${plant.x}, ${
        plant.y
      }) - Value: ${getPlantValue(plant)} coins`,
      value: index,
    };
  });

  const response: { plant: string } = await prompt({
    type: "select",
    name: "plant",
    message: "Select a plant to sell:",
    choices: plantChoices,
  });

  const index = plantChoices.find((x) => x.name == response.plant)?.value!;
  //console.log("plant index", index);
  const plant = data.plants[index];
  data.plants = data.plants.filter((p) => !(p.x == plant.x && p.y == plant.y));
  //console.log("plant", plant);
  const sellValue = getPlantValue(plant);
  data.coins += sellValue;
  console.log(`You've sold a ${plant.name} for ${sellValue} coins!`);

  saveData(data);
}

export async function handleGardenExpansion(
  data: BreathingData
): Promise<void> {
  const cost = calculateExpansionPrice(data.gardenSize);
  if (data.coins >= cost) {
    data.coins -= cost;
    data.gardenSize++;
    console.log(
      `You've expanded your garden! New size: ${data.gardenSize}x${data.gardenSize}`
    );
  } else {
    console.log(
      "Not enough coins for expansion. Keep practicing to earn more!"
    );
  }
}

export async function handleShuffleGarden(
  data: BreathingData,
  item: ShopItem
): Promise<void> {
  if (data.plants && data.plants.length > 1) {
    shuffleGarden(data);
    data.coins -= item.cost;
    console.log("Your garden has been shuffled!");
  } else {
    console.log("You need at least two plants to shuffle the garden.");
  }
}

export async function handleRegularPurchase(
  data: BreathingData,
  item: ShopItem
): Promise<void> {
  const response: { quantity: number } = await prompt({
    type: "numeral",
    name: "quantity",
    message: `How many ${item.name}s do you want to buy?`,
    initial: 1,
    min: 1,
    max: Math.floor(data.coins / item.cost),
  });

  const quantity = response.quantity;
  const totalCost = item.cost * quantity;

  if (data.coins >= totalCost) {
    if (!data.plants) data.plants = [];
    const availableSpaces =
      data.gardenSize * data.gardenSize - data.plants.length;

    if (availableSpaces >= quantity) {
      for (let i = 0; i < quantity; i++) {
        const newPlant = placePlantRandomly(data, item);
        data.plants.push(newPlant);
        console.log(
          `Placed ${item.name} at position (${newPlant.x}, ${newPlant.y})`
        );
      }
      data.coins -= totalCost;
      console.log(
        `You've purchased ${quantity} ${item.name}(s) for your garden for a total of ${totalCost} coins!`
      );
    } else {
      console.log(
        `Your garden only has space for ${availableSpaces} more plants. Consider expanding your garden.`
      );
    }
  } else {
    console.log("Not enough coins. Keep practicing to earn more!");
  }

  saveData(data);
}
function placePlantRandomly(data: BreathingData, item: ShopItem): Plant {
  let x: number, y: number;
  do {
    x = Math.floor(Math.random() * data.gardenSize);
    y = Math.floor(Math.random() * data.gardenSize);
  } while (data.plants.some((p) => p.x === x && p.y === y));

  return { name: item.name, type: item.type, x, y, growth: 1 };
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
