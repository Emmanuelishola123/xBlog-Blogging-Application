import { Box, Button, Flex, IconButton, Image, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsBell, BsSearch } from "react-icons/bs";
import UserAccount from "./UserAccount";
import { Link } from "react-router-dom";
import UseNavigate from "../../hooks/useNavigate";
import Notification from "./../Notification/Menu/Notification";
import { useDispatch } from "react-redux";
import { openLeftMenuBar } from "../../redux/othersReducer";

function Header({ currentUser }) {
  const [query, setQuery] = useState(null);
  const navigate = UseNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  const handleOpenLeftMenuBar = () => {
    dispatch(openLeftMenuBar());
  };

  return (
    <Box
      bg="white"
      shadow={"base"}
      position="sticky"
      top="0"
      left="0"
      zIndex={999}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        px={{ base: 6, lg: 10 }}
        py={2}
        color="white"
        borderBottom={"0.5px"}
        maxWidth={"1400px"}
        mx="auto"
      >
        <Flex gap={6} alignItems={"center"}>
          <IconButton
            onClick={handleOpenLeftMenuBar}
            p={2}
            display={{ base: "flex", lg: "none" }}
            bg="transparent"
            color={"black"}
            _hover={{ bg: "gray.100", color: "blue.900" }}
          >
            <FaBars />
          </IconButton>

          <Link to={"/"}>
            <Image
              src="/assets/logo.png"
              alt="logo"
              width={{ base: "60px", lg: "80px" }}
              maxHeight="70px"
            />
          </Link>
          <form onSubmit={handleSearch}>
            {" "}
            <Flex
              width={"full"}
              maxWidth={"600px"}
              display={{ base: "none", md: "flex" }}
              alignItems="center"
              border={"0.5px solid black"}
              borderRadius="5px"
            >
              <Input
                placeholder="Search Post"
                color="black"
                display="flex"
                width={"full"}
                maxWidth={"640px"}
                // flex={1}
                border="none"
                px={2}
                focusBorderColor="transaparent"
                value={query || ""}
                onChange={(e) => setQuery(e.target.value)}
              />
              <IconButton
                // onClick={handleSearch()}
                type="submit"
                size={"md"}
                p={2}
                bg="transparent"
                color={"black"}
                _hover={{ bg: "gray.200" }}
              >
                <BsSearch />
              </IconButton>
            </Flex>
          </form>
        </Flex>

        <Flex alignItems={"center"} gap={2}>
          <IconButton
            size={"lg"}
            p={2}
            bg="transparent"
            color={"black"}
            _hover={{ bg: "gray.100", color: "blue.900" }}
            display={{ base: "flex", md: "none" }}
          >
            <BsSearch />
          </IconButton>
          {currentUser ? (
            <>
              {" "}
              <Link to="/post/new">
                <Button
                  display={{ base: "none", md: "flex" }}
                  px={4}
                  py={2}
                  variant="solid"
                  colorScheme={"blue"}
                >
                  Create Post
                </Button>
              </Link>
              {/* <IconButton
                // size={"lg"}
                p={2}
                bg="transparent"
                colorScheme={"blue"}
                variant="ghost"
                // _hover={{ bg: "gray.100", color: "blue.900" }}
              >
                <BsBell size={"lg"} />
              </IconButton> */}
              <Notification />
              <UserAccount currentUser={currentUser} />
            </>
          ) : (
            <>
              <Button
                display={{ base: "none", md: "flex" }}
                px={4}
                py={2}
                variant="outline"
                color={"black"}
              >
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button px={4} py={2} colorScheme="blue">
                <Link to="/auth/join">Create Account</Link>
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
