import { configureStore } from "@reduxjs/toolkit";
import keyboardSlice from "./keyboard/keyboardSlice";
import permissionsSlice from "./permissions/permissionsSlice";

export const store = configureStore({
  reducer: {
    keyboard: keyboardSlice,
    permissions: permissionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
