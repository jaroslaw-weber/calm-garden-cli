import { setupConfig } from "./cli";
import { showGarden } from "./garden";
import { showProgress } from "./progress";
import { startBreathing } from "./breathe";
import { showShop } from "./shop";
import { initStorage, resetData } from "./storage";

async function main() {
  await initStorage();
  
  while (true) {
    const { action } = await setupConfig();

    switch (action) {
      case 'garden':
        await showGarden();
        break;
      case 'progress':
        await showProgress();
        break;
      case 'boxBreathing':
        await startBreathing("box");
        break;
      case 'physiologicalSigh':
        await startBreathing("sigh");
        break;
      case 'shop':
        await showShop();
        break;
      case 'reset':
        await resetData();
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