"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupConfig = setupConfig;
const enquirer_1 = require("enquirer");
const chalk_1 = __importDefault(require("chalk"));
async function setupConfig() {
    console.log(chalk_1.default.green('\n🌿 Welcome to CLI Calm Garden 🌿\n'));
    const response = await (0, enquirer_1.prompt)({
        type: 'select',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            { name: 'garden', message: '🏡 Show Garden' },
            { name: 'progress', message: '📊 Show Progress' },
            { name: 'boxBreathing', message: '🧘 Start Box Breathing' },
            { name: 'physiologicalSigh', message: '😮‍💨 Start Physiological Sigh' },
            { name: 'shop', message: '🛒 Open Shop' },
            { name: 'reset', message: '🔄 Reset Data' },
            { name: 'exit', message: '👋 Exit' }
        ]
    });
    return response;
}
