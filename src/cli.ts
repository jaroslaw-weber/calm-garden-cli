// In cli.ts
import { Command } from "commander";

export function setupConfig() {
  const program = new Command();

  program
    .option("-g, --garden", "View your garden")
    .option("-p, --progress", "View your progress")
    .option("-b, --breathe", "Start a breathing exercise (Box Breathing by default)")
    .option("-bb, --box-breathing", "Start a box breathing exercise")
    .option("-ps, --physiological-sigh", "Start a physiological sigh exercise")
    .option("-s, --shop", "Open the garden shop")
    .option("-r, --reset", "Reset the garden to its initial state");

  program.parse(process.argv);

  return program.opts();
}
