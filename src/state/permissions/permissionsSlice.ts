import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PermissionsState {
  canUseATMButtons: boolean;
  canUseKeyboard: boolean;
}

const initialState: PermissionsState = {
  canUseATMButtons: false,
  canUseKeyboard: false,
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    enableATMButtons: (state) => {
      state.canUseATMButtons = true;
    },
    disableATMButtons: (state) => {
      state.canUseATMButtons = false;
    },
    enableKeyboard: (state) => {
      state.canUseKeyboard = true;
    },
    disableKeyboard: (state) => {
      state.canUseKeyboard = false;
    },
  },
});

export const {
  enableATMButtons,
  disableATMButtons,
  enableKeyboard,
  disableKeyboard,
} = permissionsSlice.actions;

export default permissionsSlice.reducer;
