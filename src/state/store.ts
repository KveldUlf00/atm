import { configureStore } from "@reduxjs/toolkit";

import balanceSlice from "./balance/balanceSlice";
import keyboardSlice from "./keyboard/keyboardSlice";
import permissionsSlice from "./permissions/permissionsSlice";

export const store = configureStore({
  reducer: {
    balance: balanceSlice,
    keyboard: keyboardSlice,
    permissions: permissionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
