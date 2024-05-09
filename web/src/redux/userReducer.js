import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";

export const userSlice = createSlice({
  name: "userState",
  initialState: {
    userProfile: getCookie("userProfile") || null,
  },
  reducers: {
    updateProfile: (state, action) => {
      console.log("User Reducer ==> " , action.payload)
      state.userProfile = action.payload;
      setCookie("userProfile", action.payload);
    },
    updateUsername: (state, action) => {
      state.userProfile = action.payload;
      console.log("User Reducer ==> " , action.payload)
      setCookie("userProfile", action.payload);
    },
    updateFollowingList: (state, action) => {
      let user = getCookie("userProfile")
      state.userProfile = {...user, following: action.payload};
      setCookie("userProfile", {...user, following: action.payload});
    },
    logoutProfile: (state) => {
      state.userProfile = null;
      removeCookie("userProfile");
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProfile , logoutProfile, updateFollowingList } = userSlice.actions;

export default userSlice.reducer;
