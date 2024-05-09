import {
    Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { BsBell } from "react-icons/bs";
import PostCommentNotification from './PostCommentNotification';
import FollowerNotification from './FollowerNotification';
import PostCommentReplyNotification from './PostCommentReplyNotification';
import PostReactNotification from './PostReactNotification';
import NewPostNotification from './NewPostNotification';


function Notification() {
  return (
    <Menu  maxWidth={'280px'} preventOverflow={true}>
      <MenuButton as={Button}>
        <IconButton
          size={"md"}
          p={2}
          bg="transparent"
          colorScheme={"blue"}
          variant="ghost"
          rounded={'full'}
          // _hover={{ bg: "gray.100", color: "blue.900" }}
        >
          <BsBell size={"lg"} />
        </IconButton>
      </MenuButton>
      <MenuList color="black" fontWeight={"extrabold"} maxWidth={'320px'} maxHeight={'375px'} overflowY={'auto'}>
        <PostCommentNotification />
        <FollowerNotification />
        <PostCommentReplyNotification />
        <PostReactNotification />
        <NewPostNotification />
      </MenuList>
    </Menu>
  );
}

export default Notification;
