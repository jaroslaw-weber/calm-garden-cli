export interface Plant {
  /** display name */
  name: string;
  /** internal name */
  type: string;
  /** some plants can grow */
  growth: number;
  x: number;
  y: number;
}
