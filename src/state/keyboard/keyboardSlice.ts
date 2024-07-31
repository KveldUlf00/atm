import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface KeyboardState {
  value: string;
}

const initialState: KeyboardState = {
  value: "",
};

const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    appendValue: (state, action: PayloadAction<string>) => {
      state.value += action.payload;
    },
    clearValue: (state) => {
      state.value = "";
    },
  },
});

export const { appendValue, clearValue } = keyboardSlice.actions;

export default keyboardSlice.reducer;
