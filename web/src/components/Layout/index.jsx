import { Box, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../index";
import ConfirmLogout from "./ConfirmLogout";
import { connectSocket, socket } from "../../socket";
import LeftMenuBar from "../Header/LeftMenuBar";
// import { ToastContainer } from "react-toastify";

function Layout({ children }) {
  const { userProfile } = useSelector((state) => state.userReducer);
  const toast = useToast();

  useEffect(() => {
    if (userProfile?._id && !socket) {
      connectSocket(userProfile?._id);

      socket.on("new_notification", (data) => {
        console.log({ data });
        toast({
          title: `${data.content}`,
          variant: "success",
          isClosable: true,
          position: "left-accent",
        });
      });
    }
  }, [userProfile, socket]);

  return (
    <Box bg="#f5f5f5" width={"100%"} height={"100%"}>
      <Header currentUser={userProfile} />
      <Box maxWidth={"1400px"} mx={"auto"}>
        {children ? null : <Outlet />}
        {children && children}
        {/* Dialog Box */}
        {/* <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
      </Box>
      <LeftMenuBar />
      <ConfirmLogout />

      <Footer />
    </Box>
  );
}

export default Layout;
