"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./cli");
const garden_1 = require("./garden");
const progress_1 = require("./progress");
const breathe_1 = require("./breathe");
const shop_1 = require("./shop");
const storage_1 = require("./storage");
async function main() {
    await (0, storage_1.initStorage)();
    while (true) {
        const { action } = await (0, cli_1.setupConfig)();
        switch (action) {
            case 'garden':
                await (0, garden_1.showGarden)();
                break;
            case 'progress':
                await (0, progress_1.showProgress)();
                break;
            case 'boxBreathing':
                await (0, breathe_1.startBreathing)("box");
                break;
            case 'physiologicalSigh':
                await (0, breathe_1.startBreathing)("sigh");
                break;
            case 'shop':
                await (0, shop_1.showShop)();
                break;
            case 'reset':
                await (0, storage_1.resetData)();
                break;
            case 'exit':
                console.log("Thank you for using CLI Box Breathing App!");
                return;
            default:
                console.log("Invalid option. Please try again.");
        }
    }
}
main().catch(console.error);
