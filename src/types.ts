export interface SidebarState {
  dropEl: HTMLDivElement | null;
}
export interface ButtonsState {
  operators: string[];
  numbers: number[];
  operand1: string;
  operand2: string;
  operator: string;
  result: string;
}
export interface CanvasState {
  htmlEl: HTMLDivElement[];
}
export interface Idx {
  idx1: number;
  idx2: number;
}