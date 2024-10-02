import { BreathingData } from "./storage";
export declare function boxBreathing(data: BreathingData): Promise<void>;
export declare function physiologicalSigh(data: BreathingData): Promise<void>;
export declare function startBreathing(type: "box" | "sigh"): Promise<void>;
