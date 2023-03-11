import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CanvasState, Idx } from "src/types";

const initialState: CanvasState = {
  htmlEl: [],
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addListEl: (state, action: PayloadAction<HTMLDivElement>) => {
      //@ts-ignore
      state.htmlEl.push(action.payload)
    },
    replaceElement: (state, action: PayloadAction<Idx>) => {
      const elem = state.htmlEl[action.payload.idx1];
      state.htmlEl.splice(action.payload.idx1, 1);
      state.htmlEl.splice(action.payload.idx2, 0, elem)
    },
    deleteElement: (state, action: PayloadAction<number>) => {
      state.htmlEl.splice(action.payload, 1);
    },
  },
});

export const { addListEl, replaceElement, deleteElement } = canvasSlice.actions;
export const canvasReducer = canvasSlice.reducer;