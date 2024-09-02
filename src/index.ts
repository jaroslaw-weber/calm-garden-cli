// In index.ts
import { initStorage, resetData } from "./storage";
import { startBoxBreathing } from "./breathe";
import { showProgress } from "./visualize";
import { setupConfig } from "./cli";
import { showShop } from "./shop";

async function main() {
  await initStorage();
  const options = setupConfig();
  console.log("options", options);

  if (options.reset) {
    await resetData();
    console.log("Garden has been reset to its initial state.");
    process.exit(0);
  }
  if (options.progress) {
    await showProgress();
  }
  if (options.shop) {
    await showShop();
  } else {
    startBoxBreathing(parseInt(options.duration));
  }
}

main().catch(console.error);
