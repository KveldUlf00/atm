import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BalanceState {
  balance: number;
}

const initialState: BalanceState = {
  balance: 0,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    appendBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    clearBalance: (state) => {
      state.balance = 0;
    },
  },
});

export const { appendBalance, clearBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
