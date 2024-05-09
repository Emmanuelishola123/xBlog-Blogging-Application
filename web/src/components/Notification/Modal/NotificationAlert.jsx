import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeNotification,
  openNotification,
} from "../../../redux/notificationReducer";

export default function NotificationAlert() {
  const dispatch = useDispatch();
  const { isNotificationOpen } = useSelector(
    (state) => state.notificationReducer,
  );

  return (
    <div>
      <div className="absolute border-2 bottom-[40px] left-[40px] z-[1000] flex h-[160px] w-[240px] flex-col gap-4 rounded-lg border bg-red-500 p-8 text-blue-500">
        NOTIFICATION..... NOTIFICATION..... NOTIFICATION..... NOTIFICATION.....
        NOTIFICATION..... NOTIFICATION..... NOTIFICATION.....
      </div>
    </div>
  );
}
