import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { ResetPasswordForm } from "../components";

function ResetPassword() {
  const { resetToken } = useParams();
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
            Change Password
          </Text>
        </Flex>

        <ResetPasswordForm resetToken={resetToken} />
      </Flex>
    </Box>
  );
}

export default ResetPassword;
