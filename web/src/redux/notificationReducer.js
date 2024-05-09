import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notificationState",
  initialState: {
    isNotificationOpen: false
  },
  reducers: {
    openNotification: (state) => {
      state.isNotificationOpen = true
    },
    closeNotification: (state) => {
      state.isNotificationOpen = false
    },
  },
});

// Action creators are generated for each case reducer function
export const { openNotification , closeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
