import React from "react";
import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { LoginForm, SocialButton } from "../../components";

function Login() {
  return (
    <Box width={'100%'} px={{ base: 6, lg: 10 }}>
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
        <SocialButton social={"google"} login={true} />
        <SocialButton social={"github"} login={true} />
      </Flex>
      <Flex justifyContent={"center"} alignItems="center">
        <Flex mx="4" gap="2">
         Haven't join the community?
          <Text justifyContent={"center"} alignItems="center" color={"blue"}>
            <Link to={"/auth/join"}>Join Now</Link>
          </Text>
        </Flex>
      </Flex>

      <Flex justifyContent={"center"} alignItems="center">
        <Flex mx="4" gap="2">
         Forget Password?
          <Text justifyContent={"center"} alignItems="center" color={"blue"}>
            <Link to={"/auth/forget-password"}>Reset Password</Link>
          </Text>
        </Flex>
      </Flex>
      <LoginForm />
    </Flex>
  </Box>
  )
}

export default Login