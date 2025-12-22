'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export interface CounterState {
  value: number;
}
const initialState: CounterState = {
  value: 0,
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number | undefined>) => {
      const incrementBy = action.payload !== undefined ? action.payload : 1;
      state.value += incrementBy;
    },
    decrement: (state, action: PayloadAction<number | undefined>) => {
      const decrementBy = action.payload !== undefined ? action.payload : 1;
      state.value -= decrementBy;
    },
    resetState: (state) => {
      state.value = 0;
    },
  },
});
// ction creator are generated for each case reducer function
export const { increment, decrement, resetState } = counterSlice.actions;
export default counterSlice.reducer;
