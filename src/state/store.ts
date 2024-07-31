import { configureStore } from "@reduxjs/toolkit";
import keyboardSlice from "./keyboard/keyboardSlice";
import permissionsSlice from "./permissions/permissionsSlice";
import balanceSlice from "./balance/balanceSlice";

export const store = configureStore({
  reducer: {
    balance: balanceSlice,
    keyboard: keyboardSlice,
    permissions: permissionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
