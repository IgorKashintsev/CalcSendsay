import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { sidebarReducer } from './sidebar/slice';
import { switcherReducer } from './switcher/slice';

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  switcher: switcherReducer,
});

export type StoreState = ReturnType<typeof rootReducer>;
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  // devTools: process.env.NODE_ENV !== 'production',
});