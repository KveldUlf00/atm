import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// TODO append and subtrack to one variable
interface KeyboardState {
  value: string;
  type: "append" | "subtract";
}

const initialState: KeyboardState = {
  value: "",
  type: "append",
};

const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    appendValue: (state, action: PayloadAction<string>) => {
      state.value += action.payload;
    },
    changeValueType: (state, action: PayloadAction<"append" | "subtract">) => {
      state.type = action.payload;
    },
    clearValue: (state) => {
      state.value = "";
    },
  },
});

export const { appendValue, changeValueType, clearValue } =
  keyboardSlice.actions;

export default keyboardSlice.reducer;
