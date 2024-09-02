// In cli.ts
import { Command } from "commander";

export function setupConfig() {
  const program = new Command();

  program
    .option("-d, --duration <number>", "Duration of each phase in seconds", "4")
    .option(
      "-p, --progress",
      "Show progress only without starting the exercise"
    )
    .option("-s, --shop", "Open the garden shop")
    .option("-r, --reset", "Reset the garden to its initial state"); // New option

  program.parse(process.argv);

  return program.opts();
}
