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
        <Link to="/">
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={{ base: "120px", lg: "160px" }}
            maxHeight="120px"
          />
        </Link>
        <HStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Link to={"/"}>
            <Text variant={"p"} fontSize={"2xl"} fontWeight={"400"}>
              Home
            </Text>
          </Link>
          <Link to={"/"}>
            <Text variant={"p"} fontSize={"2xl"} fontWeight={"400"}>
              Posts
            </Text>
          </Link>
          {userProfile && (
            <Link to={`/profile/${userProfile?.username}`}>
              <Text variant={"p"} fontSize={"2xl"} fontWeight={"400"}>
                Profile
              </Text>
            </Link>
          )}
          {userProfile && (
            <Link to={"/profile/settings"}>
              <Text variant={"p"} fontSize={"2xl"} fontWeight={"400"}>
                Settings
              </Text>
            </Link>
          )}

          {!userProfile && (
            <Link to={"/auth/login"}>
              <Text variant={"p"} fontSize={"2xl"} fontWeight={"400"}>
                Login
              </Text>
            </Link>
          )}

          {!userProfile && (
            <Link to={"/auth/join"}>
              <Text variant={"p"} fontSize={"2xl"} fontWeight={"400"}>
                Sign Up
              </Text>
            </Link>
          )}
        </HStack>
      </Flex>
      <Divider my={6} />
      <Flex
        justifyContent={"flex-end"}
        fontWeight={"semibold"}
        fontSize={"1.25em"}
      >
        Copyright @ 2023
      </Flex>
    </Box>
  );
}

export default Footer;
