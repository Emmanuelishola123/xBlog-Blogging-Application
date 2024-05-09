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

function NewPostNotification({ user = "SoluTion" }) {
  return (
    <MenuItem minH="48px" alignItems={"flex-start"} py={2}  closeOnSelect={false}>
      <Avatar boxSize={"3.25rem"} mr="12px">
        <AvatarBadge boxSize="1.5em" bg={"blue.500"} p={3}>
          <Icon as={BsSearch} />
        </AvatarBadge>
      </Avatar>
      <Flex direction={"column"} gap={2}>
        {/* <Flex fontSize={{ base: "md", md: "lg" }} alignItems={"flex-start"} gap={2} flexWrap={'nowrap'}> */}
        <Text>
          <Link fontWeight={"bold"} href="#">
            {" "}
            {user}
          </Link>{" "}
          added a new post to the community
        </Text>
        {/* </Flex> */}
        <Flex gap={3}>
          <Button variant={"solid"} colorScheme="blue">
            Check it out
          </Button>
        </Flex>
      </Flex>
    </MenuItem>
  );
}
export default NewPostNotification;
