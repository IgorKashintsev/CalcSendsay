import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { buttonsReducer } from './buttons/slice';
import { canvasReducer } from './canvas/slice';
import { sidebarReducer } from './sidebar/slice';

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  buttons: buttonsReducer,
  canvas: canvasReducer,
});

export type StoreState = ReturnType<typeof rootReducer>;
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
});