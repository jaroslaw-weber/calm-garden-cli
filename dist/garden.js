"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showGarden = showGarden;
const emoji_1 = require("./emoji");
const storage_1 = require("./storage");
const utils_1 = require("./utils");
const emptyPlotEmoji = "🌱"; // Grass emoji for empty plots
async function showGarden() {
    (0, utils_1.clearConsole)();
    let data = await (0, storage_1.loadData)();
    console.log("Your Garden:\n");
    for (let y = 0; y < data.gardenSize; y++) {
        let row = "";
        for (let x = 0; x < data.gardenSize; x++) {
            const plant = data.plants.find((p) => p.x === x && p.y === y);
            if (plant) {
                row += emoji_1.plantEmojis[plant.type] || "🌱"; // Default to seedling if type not found
            }
            else {
                row += emptyPlotEmoji; // Empty plot
            }
        }
        console.log(row);
    }
    /*
    console.log("\nLegend:");
    console.log(emptyPlotEmoji + " - Empty plot");
    Object.entries(plantEmojis).forEach(([type, emoji]) => {
      console.log(`${emoji} - ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    });
    */
}
