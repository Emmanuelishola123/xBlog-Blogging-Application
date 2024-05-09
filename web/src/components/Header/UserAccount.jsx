import {
  Avatar,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { openLogoutDialog } from "../../redux/authReducer";

function UserAccount({ currentUser }) {
  const dispatch = useDispatch();
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={{ base: "sm", lg: "md" }} src={currentUser?.avatar} />{" "}
      </MenuButton>
      <MenuList color="black" fontWeight={"extrabold"}>
        <MenuItem _hover={{ bg: "gray.100" }}>
          <Link
            textDecoration={"none"}
            href={`/profile/${currentUser?.username}`}
            _hover={{
              textDecoration: "none",
            }}
          >
            @{currentUser?.username}
          </Link>
        </MenuItem>
        <MenuDivider />
        {/* <MenuItem _hover={{ bg: "gray.100" }}>Dashboard</MenuItem> */}
        <MenuItem _hover={{ bg: "gray.100" }}>
          {" "}
          <Link
            textDecoration={"none"}
            href="/post/new"
            _hover={{
              textDecoration: "none",
            }}
          >
            Create Post{" "}
          </Link>
        </MenuItem>
        <MenuItem _hover={{ bg: "gray.100" }}>
          {" "}
          <Link
            textDecoration={"none"}
            href="/profile/reading"
            _hover={{
              textDecoration: "none",
            }}
          >
            Reading List{" "}
          </Link>
        </MenuItem>
        <MenuItem _hover={{ bg: "gray.100" }}>
          <Link
            textDecoration={"none"}
            href="/profile/settings"
            _hover={{
              textDecoration: "none",
            }}
          >
            {" "}
            Settings{" "}
          </Link>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          color="red"
          _hover={{ bg: "red.100" }}
          onClick={() => dispatch(openLogoutDialog())}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserAccount;
