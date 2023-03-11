import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ButtonsState } from "src/types";

const initialState: ButtonsState = {
  operators: ['/', 'x', '-', '+'],
  numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3],
  operand1: '',
  operand2: '',
  operator: '',
  result: '10',
};

const buttonsSlice = createSlice({
  name: 'buttons',
  initialState,
  reducers: {
    changeOperand1: (state, action: PayloadAction<string>) => {
      state.operand1 += action.payload;
      state.result += action.payload;
    },
    changeOperand2: (state, action: PayloadAction<string>) => {
      state.operand2 = action.payload;
      state.result = action.payload;
    },
    changeOperator: (state, action: PayloadAction<string>) => {
      state.operator = action.payload;
    },
    onResult: (state) => {
      const roundResult = Number(state.operand1 + state.operator + state.operand2);
      if(roundResult < 1) {
        state.result = roundResult.toFixed(10);
      } else {
        state.result = roundResult.toFixed(1);
      }
    },
  },
});

export const { 
  changeOperand1, 
  changeOperand2, 
  changeOperator, 
  onResult 
} = buttonsSlice.actions;
export const buttonsReducer = buttonsSlice.reducer;