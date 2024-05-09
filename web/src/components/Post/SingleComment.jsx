import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { BsChat, BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";

function SingleComment({ data }) {
  console.log(data?.commentor?.username, data)
  return (
    <Flex gap={4} maxWidth="100%">
      <Link to={`/profile/${data?.commentor?.username}`}>
        <Avatar size={"sm"} src={data?.commentor?.avatar} />
      </Link>
      <Box width="100%">
        <Box border={"0.5px solid grey"} rounded="md" p="3">
          <div dangerouslySetInnerHTML={{ __html: data?.comment }}></div>
        </Box>
        <ButtonGroup>
          <Button px="2" py="1" variant={"ghost"} colorScheme="red">
            <BsHeart />
          </Button>
          <Button px="2" py="1" variant={"ghost"} colorScheme="blue">
            <BsChat />
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
}

export default SingleComment;
