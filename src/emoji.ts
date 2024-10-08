export const plantEmojis = {
  arugula: "🥬",
  daisy: "🌼",
  iris: "🪻",
  lotus: "🪷",
  marigold: "🏵️",
  "pink-rose": "🌹",
  poppy: "🥀",
  sunflower: "🌻",
  tomato: "🍅",
  tree: "🌳",
  cactus: "🌵",
  palm: "🌴",
  bonsai: "🎍",
  bamboo: "🎋",
  hibiscus: "🌺",
  orchid: "🌷",
  "cherry-blossom": "🌸",
  mushroom: "🍄",
  herb: "🌿",
  seedling: "🌱",
  leaves: "🍃",
  "four-leaf-clover": "🍀",
  "maple-leaf": "🍁",
  evergreen: "🌲",
  rock: "🪨",
} as const;

export const emojis = {
  // Add more plant types and their corresponding emojis as needed
  expansion: "🔍",
  shuffle: "🔀",
  sell: "💰",
  ...plantEmojis,
} as const;

export type EmojiKey = keyof typeof emojis;
