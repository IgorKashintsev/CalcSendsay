import { StoreState } from '..';

export const selectRuntime = (state: StoreState) => state.switcher.runtime;
export const selectConstructor = (state: StoreState) => state.switcher.constructor;