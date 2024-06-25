import { configureStore } from '@reduxjs/toolkit';
import optionReducer from './slices/optionSlice';

const store = configureStore({
  reducer: {
    options: optionReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
