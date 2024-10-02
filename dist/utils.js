"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = sleep;
exports.clearConsole = clearConsole;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function clearConsole() {
    process.stdout.write("\x1Bc");
}
