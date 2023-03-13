import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SwitcherState } from 'src/types';

const initialState: SwitcherState = {
  runtime: false,
  constructor: true,
};

const switcherSlice = createSlice({
  name: 'switcher',
  initialState,
  reducers: {
    changeSwitcher: (state, action: PayloadAction<SwitcherState>) => {
      state.runtime = action.payload.runtime;
      state.constructor = action.payload.constructor;
    },
  },
});

export const { changeSwitcher } = switcherSlice.actions;
export const switcherReducer = switcherSlice.reducer;