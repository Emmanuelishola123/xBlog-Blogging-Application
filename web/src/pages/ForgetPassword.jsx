import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { ForgetPasswordForm, JoinForm, SocialButton } from "../components";

function ForgetPassword() {
  return (
    <Box px={{ base: 6, lg: 10 }}>
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
            Reset Password
          </Text>
        </Flex>

        <ForgetPasswordForm />
      </Flex>
    </Box>
  );
}

export default ForgetPassword;
