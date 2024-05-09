import { createSlice } from "@reduxjs/toolkit";

export const othersSlice = createSlice({
  name: "othersSlice",
  initialState: {
    isLeftMenuBarOpen: false,
  },
  reducers: {
    openLeftMenuBar: (state) => {
      state.isLeftMenuBarOpen = true;
    },
    closeLeftMenuBar: (state) => {
      state.isLeftMenuBarOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openLeftMenuBar, closeLeftMenuBar } = othersSlice.actions;

export default othersSlice.reducer;
