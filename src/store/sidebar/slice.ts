import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidebarState, Idx2, Idx1 } from 'src/types';

const initialState: SidebarState = {
  htmlEl: [],
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    addListEl: (state, action: PayloadAction<HTMLDivElement>) => {
      //@ts-ignore
      state.htmlEl.push(action.payload);
    },
    replaceElementNew: (state, action: PayloadAction<Idx1>) => {
      //@ts-ignore
      state.htmlEl.splice(action.payload.idx1, 0, action.payload.dropEl);
    },
    replaceElement: (state, action: PayloadAction<Idx2>) => {
      const elem = state.htmlEl[action.payload.idx1];
      state.htmlEl.splice(action.payload.idx1, 1);
      state.htmlEl.splice(action.payload.idx2, 0, elem);
    },
    deleteElement: (state, action: PayloadAction<number>) => {
      state.htmlEl.splice(action.payload, 1);
    },
  },
});

export const { 
  addListEl, 
  replaceElementNew,
  replaceElement, 
  deleteElement 
} = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;