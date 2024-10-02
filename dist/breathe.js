"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boxBreathing = boxBreathing;
exports.physiologicalSigh = physiologicalSigh;
exports.startBreathing = startBreathing;
const storage_1 = require("./storage");
const utils_1 = require("./utils");
async function boxBreathing(data) {
    const duration = 4;
    const phases = ["Inhale", "Hold", "Exhale", "Hold"];
    for (let phase of phases) {
        for (let second = 1; second <= duration; second++) {
            (0, utils_1.clearConsole)();
            console.log(`${phase} ${second}`);
            await (0, utils_1.sleep)(1000);
            data.totalSecondsPracticed++;
            data.coins++;
            //save progress to storage after each breathing cycle
            //this will be useful for tracking progress over time and maybe motivate the user to continue practicing
            await (0, storage_1.saveData)(data);
        }
    }
}
//A physiological sigh is a type of deep breath characterized by a double inhalation, followed by a single, longer exhalation.
async function physiologicalSigh(data) {
    const sighs = ["Inhale", "Hold", "Inhale", "Hold", "Exhale"];
    const times = [2, 1, 1, 1, 5];
    for (let i = 0; i < sighs.length; i++) {
        const phase = sighs[i];
        const duration = times[i];
        for (let second = 1; second <= duration; second++) {
            (0, utils_1.clearConsole)();
            console.log(`${phase} ${second}/${duration}`);
            await (0, utils_1.sleep)(1000);
            data.totalSecondsPracticed++;
            data.coins++;
            await (0, storage_1.saveData)(data);
        }
    }
}
async function startBreathing(type) {
    (0, utils_1.clearConsole)();
    let data = await (0, storage_1.loadData)();
    while (true) {
        if (type === "box") {
            await boxBreathing(data);
        }
        else if (type === "sigh") {
            await physiologicalSigh(data);
        }
        else {
            console.log('Invalid breathing type. Please choose either "box" or "sigh".');
            return;
        }
    }
}
