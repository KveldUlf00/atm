import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BalanceState {
  balance: number;
  error: string;
}

const initialState: BalanceState = {
  balance: 0,
  error: "",
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    appendBalance: (state, action: PayloadAction<number>) => {
      if (action.payload > 10000) {
        state.error = "The maximum amount to be deposited is 10,000.";
      } else {
        state.balance += action.payload;
      }
    },
    subtractBalance: (state, action: PayloadAction<number>) => {
      if (state.balance < action.payload) {
        state.error = "Insufficient funds for withdrawal.";
      } else {
        state.balance -= action.payload;
      }
    },
    clearBalance: (state) => {
      state.balance = 0;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
});

export const { appendBalance, clearBalance, clearError, subtractBalance } =
  balanceSlice.actions;

export default balanceSlice.reducer;
