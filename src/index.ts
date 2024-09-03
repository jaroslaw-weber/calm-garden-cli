// In index.ts
import { setupConfig } from "./cli";
import { showGarden } from "./garden";
import { showProgress } from "./progress";
import { startBoxBreathing } from "./breathe";
import { showShop } from "./shop";
import { initStorage, resetData } from "./storage";

async function main() {
  await initStorage();
  const options = setupConfig();

  if (options.garden) {
    await showGarden();
  } else if (options.progress) {
    await showProgress();
  } else if (options.breathe) {
    await startBoxBreathing(Number(options.duration));
  } else if (options.shop) {
    await showShop();
  } else if (options.reset) {
    await resetData();
  } else {
    console.log("Welcome to CLI Box Breathing App!");
    console.log("Use --help to see available commands.");
  }
}

main().catch(console.error);
