#!/usr/bin/env node
import { setupConfig } from "./cli";
import { showGarden } from "./garden";
import { showProgress } from "./progress";
import { getBreathingPatterns, startBreathing } from "./breathe";
import { showShop } from "./shop/service";
import { initStorage, resetData } from "./storage";

async function main() {
  await initStorage();

  const patterns = await getBreathingPatterns();
  const patternSet = new Set(patterns.map((p) => p.name));
  while (true) {
    const { action } = await setupConfig();

    if (patternSet.has(action)) {
      await startBreathing(action);
      continue;
    }

    switch (action) {
      case "garden":
        await showGarden();
        break;
      case "progress":
        await showProgress();
        break;
      case "shop":
        await showShop();
        break;
      case "reset":
        await resetData();
        break;
      case "exit":
        console.log("Thank you for using CLI Box Breathing App!");
        return;
      default:
        console.log("Invalid option. Please try again.");
    }
  }
}

main().catch(console.error);
