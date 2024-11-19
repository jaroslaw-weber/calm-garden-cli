


export interface BreathingPattern {
  /** emoji */
  emoji:string;
  /** display name */
  display: string;
  /** internal name */
  name: string;
  /** logic */
  pattern: BreathingPhase[];
  /** description */
  description: string;
}
export interface BreathingPhase {
  name: string;
  duration: number;
}
