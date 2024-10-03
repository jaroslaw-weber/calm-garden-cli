"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showProgress = showProgress;
const storage_1 = require("./storage");
const utils_1 = require("./utils");
async function showProgress() {
    (0, utils_1.clearConsole)();
    let data = await (0, storage_1.loadData)();
    console.log("Your Box Breathing Progress:");
    console.log("-----------------------------");
    console.log(`Total time practiced: ${formatTime(data.totalSecondsPracticed)}`);
    console.log(`Coins earned: ${data.coins}`);
    console.log(`Garden size: ${data.gardenSize}x${data.gardenSize}`);
    console.log(`Number of plants: ${data.plants.length}`);
}
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}
