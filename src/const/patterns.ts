import { BreathingPattern } from "../types/BreathingPattern";

export const breathingPatterns: BreathingPattern[] = [
  {
    emoji: "🟦",
    display: "Box Breathing",
    name: "box",
    pattern: [
      { name: "Inhale", duration: 4 },
      { name: "Hold", duration: 4 },
      { name: "Exhale", duration: 4 },
      { name: "Hold", duration: 4 },
    ],
    description: "Inhale, hold, exhale, hold - each for equal counts. Reduces stress and improves focus.",
  },
  {
    emoji: "😮‍💨",
    display: "Physiological Sigh",
    name: "sigh",
    pattern: [
      { name: "Inhale", duration: 2 },
      { name: "Hold", duration: 1 },
      { name: "Inhale", duration: 1 },
      { name: "Hold", duration: 1 },
      { name: "Exhale", duration: 5 },
    ],
    description: "Double inhale through the nose, followed by a long exhale. Quickly resets the nervous system.",
  },
  {
    emoji: "🌬️",
    display: "Pranayama (4-7-8)",
    name: "pranayama",
    pattern: [
      { name: "Inhale", duration: 4 },
      { name: "Hold", duration: 7 },
      { name: "Exhale", duration: 8 },
    ],
    description: "Ancient yogic breathing technique. Various patterns to balance body and mind.",
  },
  {
    emoji: "🌊",
    display: "Coherent Breathing",
    name: "coherent",
    pattern: [
      { name: "Inhale", duration: 5 },
      { name: "Exhale", duration: 5 },
    ],
    description: "Breathe at a rate of 5-7 breaths per minute. Promotes heart-brain coherence and calmness.",
  },
];
