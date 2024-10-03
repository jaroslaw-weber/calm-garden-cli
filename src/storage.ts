import storage from "node-persist";
import path from "path";
import os from "os";
import { Plant } from "./Plant";

export interface BreathingData {
  totalSecondsPracticed: number; // number representing the total seconds the user has practiced so far
  coins: number; // number representing the user's current coins. can be used to expand garden, plant new plants, etc.
  gardenSize: number; // number representing the user's current garden size
  plants: Plant[]; // 2d grid representing the user's garden. this will be used to visualize the user's progress
}

function getStoragePath() {
  const home = os.homedir();
  return path.join(home, ".breathe-app");
}

export async function initStorage(): Promise<void> {
  await storage.init({
    dir: getStoragePath(),
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: "utf8",
    logging: false,
  });
}
export const defaultData: BreathingData = {
  totalSecondsPracticed: 0,
  gardenSize: 3,
  plants: [],
  coins: 0,
};

export async function loadData(): Promise<BreathingData> {
  const storedData = (await storage.getItem("breathingData")) || {};
  return { ...defaultData, ...storedData };
}

export async function saveData(data: BreathingData): Promise<void> {
  await storage.setItem("breathingData", data);
}

export async function resetData(): Promise<void> {
  await storage.clear();
  console.log("Data reset successfully.");
}
