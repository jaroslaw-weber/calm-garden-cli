import { Plant } from "./Plant";
export interface BreathingData {
    totalSecondsPracticed: number;
    coins: number;
    gardenSize: number;
    plants: Plant[];
}
export declare function initStorage(): Promise<void>;
export declare const defaultData: BreathingData;
export declare function loadData(): Promise<BreathingData>;
export declare function saveData(data: BreathingData): Promise<void>;
export declare function resetData(): Promise<void>;
