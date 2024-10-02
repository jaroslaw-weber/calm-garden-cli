"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showShop = showShop;
const enquirer_1 = require("enquirer");
const storage_1 = require("./storage");
const utils_1 = require("./utils");
const emoji_1 = require("./emoji");
const price1 = 80;
const shopItems = [
    { name: "Anthurium", type: "anthurium", cost: price1 },
    { name: "Arugula", type: "arugula", cost: price1 },
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
    // Add this to the shopItems array, right after the "Garden Expansion" item
    { name: "Shuffle Garden", type: "shuffle", cost: 50 },
];
for (const item of shopItems) {
    item.emoji = emoji_1.plantEmojis[item.type] || "";
}
function calculateExpansionPrice(currentSize) {
    return Math.floor(100 * Math.pow(1.5, currentSize - 3));
}
async function showShop() {
    let data = await (0, storage_1.loadData)();
    while (true) {
        (0, utils_1.clearConsole)();
        console.log("🏪 Welcome to the Garden Shop!");
        console.log(`💰 You have ${data.coins} coins.`);
        console.log(`🌳 Your garden size: ${data.gardenSize}x${data.gardenSize}\n`);
        const expansionPrice = calculateExpansionPrice(data.gardenSize);
        const choices = shopItems.map((item, index) => ({
            name: item.name === "Garden Expansion"
                ? `${item.emoji} ${item.name} (${data.gardenSize + 1}x${data.gardenSize + 1})`
                : `${item.emoji} ${item.name}`,
            value: index,
            hint: item.name === "Garden Expansion"
                ? ` (Cost: ${expansionPrice} coins)`
                : ` (Cost: ${item.cost} coins)`,
        }));
        choices.push({ name: "🚪 Exit Shop", value: -1, hint: "Leave the shop" });
        const response = await (0, enquirer_1.prompt)({
            type: "select",
            name: "choice",
            message: "Choose an item to purchase:",
            choices,
        });
        if (response.choice.includes("Exit"))
            break;
        const item = shopItems.find((x) => response.choice.includes(x.name));
        if (item) {
            await purchaseItem(data, item);
        }
        else {
            console.log("Invalid selection. Please try again.");
            await sleep(2000);
        }
    }
}
async function purchaseItem(data, item) {
    const cost = item.name === "Garden Expansion"
        ? calculateExpansionPrice(data.gardenSize)
        : item.cost;
    if (data.coins >= cost) {
        data.coins -= cost;
        if (item.name === "Garden Expansion") {
            data.gardenSize++;
            console.log(`You've expanded your garden! New size: ${data.gardenSize}x${data.gardenSize}`);
        }
        else if (item.name === "Shuffle Garden") {
            if (data.plants && data.plants.length > 1) {
                shuffleGarden(data);
                console.log("Your garden has been shuffled!");
            }
            else {
                console.log("You need at least two plants to shuffle the garden.");
                data.coins += item.cost; // Refund the coins
            }
        }
        else {
            if (!data.plants)
                data.plants = [];
            if (data.plants.length < data.gardenSize * data.gardenSize) {
                const newPlant = placePlantRandomly(data, item);
                data.plants.push(newPlant);
                console.log(`You've purchased a ${item.name} for your garden!`);
                console.log(`Placed at position (${newPlant.x}, ${newPlant.y})`);
            }
            else {
                console.log("Your garden is full! Consider expanding your garden.");
                data.coins += item.cost; // Refund the coins
                await sleep(2000);
                return;
            }
        }
        await (0, storage_1.saveData)(data);
    }
    else {
        console.log("Not enough coins. Keep practicing to earn more!");
    }
    await sleep(2000);
}
function placePlantRandomly(data, item) {
    let x, y;
    do {
        x = Math.floor(Math.random() * data.gardenSize);
        y = Math.floor(Math.random() * data.gardenSize);
    } while (data.plants.some((p) => p.x === x && p.y === y));
    return { name: item.name, type: item.type, x, y, growth: 1 };
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function shuffleGarden(data) {
    if (!data.plants || data.plants.length <= 1)
        return;
    const availablePositions = [];
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
