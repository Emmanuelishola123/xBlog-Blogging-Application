import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";
import othersReducer from "./othersReducer";

export default configureStore({
  reducer: {
    authReducer: authReducer,
    userReducer: userReducer,
    notificationReducer: notificationReducer,
    othersReducer: othersReducer
  },
});
