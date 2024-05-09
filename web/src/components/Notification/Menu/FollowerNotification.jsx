import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  Icon,
  Link,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

function FollowerNotification({ user = "SoluTion" }) {
  return (
    <MenuItem minH="48px" alignItems={"flex-start"} py={2} closeOnSelect={false}> 
      <Avatar boxSize={"3.25rem"} mr="12px">
        <AvatarBadge boxSize="1.5em" bg={"blue.500"} p={3}>
          <Icon as={BsSearch} />
        </AvatarBadge>
      </Avatar>
      <Flex direction={"column"} gap={2}>
        {/* <Flex fontSize={{ base: "md", md: "lg" }} alignItems={"center"} gap={2}> */}
        <Text >
          <Link fontWeight={"bold"}>{user}</Link> started following you
        </Text>{" "}
        {/* </Flex> */}
        <Flex gap={3}>
          <Button variant={"solid"} colorScheme="blue">
            Profile
          </Button>
          <Button variant={"outline"} colorScheme="blue">
            Follow back{" "}
          </Button>
        </Flex>
      </Flex>
    </MenuItem>
  );
}

export default FollowerNotification;
