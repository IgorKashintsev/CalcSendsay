import { StoreState } from "..";

export const selectOperators = (state: StoreState) => state.buttons.operators;
export const selectNumbers = (state: StoreState) => state.buttons.numbers;
export const selectOperand1 = (state: StoreState) => state.buttons.operand1;
export const selectOperand2 = (state: StoreState) => state.buttons.operand2;
export const selectOperator = (state: StoreState) => state.buttons.operator;
export const selectResult = (state: StoreState) => state.buttons.result;