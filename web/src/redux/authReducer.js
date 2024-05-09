import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";

export const authSlice = createSlice({
  name: "authState",
  initialState: {
    userToken: getCookie("userToken") || null,
    isOpen: false,
  },
  reducers: {
    authLogin: (state, action) => {
      state.userToken = action.payload;
      setCookie("userToken", action.payload);
    },
    authLogout: (state) => {
      state.isOpen = false;
      state.userToken = null;
      removeCookie("userToken");
    },
    openLogoutDialog: (state) => {
      state.isOpen = true;
    },
    closeLogoutDialog: (state) => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authLogin, authLogout, openLogoutDialog, closeLogoutDialog } = authSlice.actions;

export default authSlice.reducer;
