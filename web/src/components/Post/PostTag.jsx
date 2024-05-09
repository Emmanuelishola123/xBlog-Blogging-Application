import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function TagPost() {
  return (
    <Box width={"100%"} height='auto' border={"1px"} borderColor='gray.300' borderRadius="lg">
      <Flex p={3}>
        <Text as={"h4"} fontSize="2xl" fontWeight={"bold"}>
          Tags{" "}
        </Text>
      </Flex>
      <Divider />
      <Flex direction={"column"} alignItems="flex-start" >
        <Box _hover={{ bg: "white" }} p={4}>
          <Link to="/post/tags/1">
            <Text
              as={"p"}
              _hover={{ color: "blue" }}
              fontSize="lg"
              fontWeight={"medium"}
            >
              New tag discussion, lets check this out guys
            </Text>
            <Text as={"p"} py="1">
              #WebDev
            </Text>
          </Link>
        </Box>
        <Box _hover={{ bg: "white" }} p={4}>
          <Link to="/post/tags/1">
            <Text
              as={"p"}
              _hover={{ color: "blue" }}
              fontSize="lg"
              fontWeight={"medium"}
            >
              New tag discussion, lets check this out guys
            </Text>
            <Text as={"p"} py="1">
              #WebDev
            </Text>
          </Link>
        </Box>
        <Box _hover={{ bg: "white" }} p={4}>
          <Link to="/post/tags/1">
            <Text
              as={"p"}
              _hover={{ color: "blue" }}
              fontSize="lg"
              fontWeight={"medium"}
            >
              New tag discussion, lets check this out guys
            </Text>
            <Text as={"p"} py="1">
              #WebDev
            </Text>
          </Link>
        </Box>
        <Box _hover={{ bg: "white" }} p={4}>
          <Link to="/post/tags/1">
            <Text
              as={"p"}
              _hover={{ color: "blue" }}
              fontSize="lg"
              fontWeight={"medium"}
            >
              New tag discussion, lets check this out guys
            </Text>
            <Text as={"p"} py="1">
              #WebDev
            </Text>
          </Link>
        </Box>
        <Box _hover={{ bg: "white" }} p={4}>
          <Link to="/post/tags/1">
            <Text
              as={"p"}
              _hover={{ color: "blue" }}
              fontSize="lg"
              fontWeight={"medium"}
            >
              New tag discussion, lets check this out guys
            </Text>
            <Text as={"p"} py="1">
              #WebDev
            </Text>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

export default TagPost;
