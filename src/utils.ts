import { Plant } from "./Plant";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function clearConsole(): void {
  process.stdout.write("\x1Bc");
}
function encodeGarden(garden: (Plant | null)[][]): string {
  return garden
    .map((row) =>
      row.map((cell) => (cell ? `${cell.type},${cell.growth}` : "_")).join(".")
    )
    .join(";");
}

export function generateGardenUrl(garden: (Plant | null)[][]): string {
  const encodedGarden = encodeGarden(garden);
  return `https://jaroslaw-weber.github.io/calm-garden/garden?data=${encodedGarden}`;
}
