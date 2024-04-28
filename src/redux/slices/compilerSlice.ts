import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateType {
  html: string;
  css: string;
  javascript: string;
  python: string;
  currentLang: "html" | "css" | "javascript" | "python";
}

const initialState: InitialStateType = {
  html: "",
  css: "",
  javascript: "",
  python: "",
  currentLang: "html",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLang: (
      state,
      action: PayloadAction<InitialStateType["currentLang"]>
    ) => {
      state.currentLang = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const { updateCurrentLang } = compilerSlice.actions;
