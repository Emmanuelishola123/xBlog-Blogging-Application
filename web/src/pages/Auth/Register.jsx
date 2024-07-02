import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { JoinForm, SocialButton } from "../../components";

function Register() {
  return (
    <Box px={{ base: 6, lg: 12 }}>
      <Flex
        direction={"column"}
        justifyContent="center"
        gap="4"
        shadow="sm"
        border="1px solid #dcdcdc"
        bgColor={"white"}
        p="4"
        rounded={"md"}
        mt="4"
        mx='auto'
        maxWidth={'640px'}
      >
        <Flex direction={"column"} gap="1" width={"100%"}>
          <Text as={"h4"} fontSize="3xl" fontWeight={"bold"} textAlign="center">
            Welcome To xBlog Community 👩‍💻👨‍💻
          </Text>
          <Text as="p" textAlign={"center"}>
            xBlog Community 👩‍💻👨‍💻 is a community of amazing developers,
            programmers and Engineers
          </Text>
        </Flex>
        <Flex direction={"column"} gap="4">
          <SocialButton social={"google"} login={false} />
          <SocialButton social={"github"} login={false} />
        </Flex>
        <Flex justifyContent={"center"} alignItems="center">
          <Flex mx="4" gap="2">
            Already have an account?
            <Text justifyContent={"center"} alignItems="center" color={"blue"}>
              <Link to={"/auth/login"}>Log in</Link>
            </Text>
          </Flex>
        </Flex>
        <JoinForm />
      </Flex>
    </Box>
  );
}

export default Register;
