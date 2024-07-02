import React from "react";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Layout/Logo";

function Footer() {
  const { userProfile } = useSelector((state) => state.userReducer);
  console.log({ userProfile });
  return (
    <Box
      width="100%"
      px={{ base: 4, md: 6, xl: 12 }}
      py={8}
      backgroundColor={"#fff"}
      my={4}
    >
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        gap={4}
        flexDirection={"column"}
      >
        <Logo />
        <HStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Link to={"/"}>
            <Text
              variant={"p"}
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight={"400"}
            >
              Home
            </Text>
          </Link>
          <Link to={"/"}>
            <Text
              variant={"p"}
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight={"400"}
            >
              Posts
            </Text>
          </Link>
          {userProfile && (
            <Link to={`/profile/${userProfile?.username}`}>
              <Text
                variant={"p"}
                fontSize={{ base: "sm", md: "lg" }}
                fontWeight={"400"}
              >
                Profile
              </Text>
            </Link>
          )}
          {userProfile && (
            <Link to={"/profile/settings"}>
              <Text
                variant={"p"}
                fontSize={{ base: "sm", md: "lg" }}
                fontWeight={"400"}
              >
                Settings
              </Text>
            </Link>
          )}

          {!userProfile && (
            <Link to={"/auth/login"}>
              <Text
                variant={"p"}
                fontSize={{ base: "sm", md: "lg" }}
                fontWeight={"400"}
              >
                Login
              </Text>
            </Link>
          )}

          {!userProfile && (
            <Link to={"/auth/join"}>
              <Text
                variant={"p"}
                fontSize={{ base: "sm", md: "lg" }}
                fontWeight={"400"}
              >
                Sign Up
              </Text>
            </Link>
          )}
        </HStack>
      </Flex>
      <Divider my={2} />
      <Flex justifyContent={"space-between"} fontSize={"1.05em"}>
        <Text style={{ fontSize: "0.95rem" }}>
          Made with ❤️ by{" "}
          <Link
            target="_blank"
            to={"https://www.linkedin.com/in/emmanuelayinde/"}
            style={{ fontWeight: "bold", fontSize: "0.95rem" }}
          >
            Emmanuel Ayinde
          </Link>
        </Text>

        <Text style={{ fontSize: "0.95rem" }}>Copyright @ 2024</Text>
      </Flex>
    </Box>
  );
}

export default Footer;
