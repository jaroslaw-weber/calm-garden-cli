"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultData = void 0;
exports.initStorage = initStorage;
exports.loadData = loadData;
exports.saveData = saveData;
exports.resetData = resetData;
const node_persist_1 = __importDefault(require("node-persist"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
function getStoragePath() {
    const home = os_1.default.homedir();
    return path_1.default.join(home, ".breathe-app");
}
async function initStorage() {
    await node_persist_1.default.init({
        dir: getStoragePath(),
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: "utf8",
        logging: false,
    });
}
exports.defaultData = {
    totalSecondsPracticed: 0,
    gardenSize: 3,
    plants: [],
    coins: 0,
};
async function loadData() {
    const storedData = (await node_persist_1.default.getItem("breathingData")) || {};
    return { ...exports.defaultData, ...storedData };
}
async function saveData(data) {
    await node_persist_1.default.setItem("breathingData", data);
}
async function resetData() {
    await node_persist_1.default.clear();
    console.log("Data reset successfully.");
}
