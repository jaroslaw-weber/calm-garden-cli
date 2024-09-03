// In cli.ts
import { Command } from "commander";

export function setupConfig() {
  const program = new Command();

  program
    .option("-d, --duration <number>", "Duration of each phase in seconds", "4")
    .option("-g, --garden", "View your garden")
    .option("-p, --progress", "View your progress")
    .option("-b, --breathe", "Start a breathing exercise")
    .option("-s, --shop", "Open the garden shop")
    .option("-r, --reset", "Reset the garden to its initial state");

  program.parse(process.argv);

  return program.opts();
}
