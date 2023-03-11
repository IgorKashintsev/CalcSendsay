import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SidebarState } from "src/types";

const initialState: SidebarState = {
  dropEl: null,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<SidebarState>) => {
      state.dropEl = action.payload.dropEl as null;
    },
  },
});

export const { addElement } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;