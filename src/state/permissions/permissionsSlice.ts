import { createSlice } from "@reduxjs/toolkit";

interface PermissionsState {
  canUseATMButtons: boolean;
  canUseKeyboard: boolean;
  windowLoading: boolean;
}

const initialState: PermissionsState = {
  canUseATMButtons: false,
  canUseKeyboard: false,
  windowLoading: false,
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
    windowIsLoading: (state) => {
      state.windowLoading = true;
    },
    windowIsLoaded: (state) => {
      state.windowLoading = false;
    },
  },
});

export const {
  enableATMButtons,
  disableATMButtons,
  enableKeyboard,
  disableKeyboard,
  windowIsLoading,
  windowIsLoaded,
} = permissionsSlice.actions;

export default permissionsSlice.reducer;
