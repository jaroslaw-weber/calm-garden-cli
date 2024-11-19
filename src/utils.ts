import { Plant } from "./types/Plant";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function clearConsole(): void {
  process.stdout.write("\x1Bc");
}
