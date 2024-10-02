"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showProgress = showProgress;
const process_1 = require("process");
const storage_1 = require("./storage");
const utils_1 = require("./utils");
async function showProgress() {
    (0, utils_1.clearConsole)();
    let data = await (0, storage_1.loadData)();
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
    // Exit the process after attempting to open the URL
    (0, process_1.exit)(0);
}
