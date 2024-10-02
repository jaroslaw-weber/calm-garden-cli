"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// In index.ts
const cli_1 = require("./cli");
const garden_1 = require("./garden");
const progress_1 = require("./progress");
const breathe_1 = require("./breathe");
const shop_1 = require("./shop");
const storage_1 = require("./storage");
async function main() {
    await (0, storage_1.initStorage)();
    const options = (0, cli_1.setupConfig)();
    if (options.garden) {
        await (0, garden_1.showGarden)();
    }
    else if (options.progress) {
        await (0, progress_1.showProgress)();
    }
    else if (options.boxBreathing) {
        await (0, breathe_1.startBreathing)("box");
    }
    else if (options.physiologicalSigh) {
        await (0, breathe_1.startBreathing)("sigh");
    }
    else if (options.shop) {
        await (0, shop_1.showShop)();
    }
    else if (options.reset) {
        await (0, storage_1.resetData)();
    }
    else {
        console.log("Welcome to CLI Box Breathing App!");
        console.log("Use --help to see available commands.");
    }
}
main().catch(console.error);
