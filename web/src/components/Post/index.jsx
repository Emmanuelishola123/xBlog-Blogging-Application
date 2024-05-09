import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsBookmark, BsSuitHeart } from "react-icons/bs";
import { VscComment } from "react-icons/vsc";
import { formatDate } from "../../utils/dateFormater";

function Post({ post }) {
  return (
    <Box
      width={"100%"}
      mb={2}
      bg="white"
      rounded={"lg"}
      shadow="sm"
      mx="auto"
      border={{ base: "none", md: "1px solid #dcdcdc" }}
      overflowY={"hidden"}
    >
      <Image src={post?.banner} width="100%" height="260px" roundedTop={"lg"} />
      <Flex
        alignItems={"flex-start"}
        px="6"
        py={3}
        gap={2}
        direction={"column"}
      >
        {/* AVATAR & NAME */}
        <Flex gap={3}>
          <Link to={`/profile/${post?.author?.username}`}>
            <Avatar name={post?.author?.name} src={post?.author?.avatar} />{" "}
          </Link>
          <Flex direction={"column"}>
            {" "}
            <Link to={`/profile/${post?.author?.username}`}>
              <Text
                as={"h5"}
                color="gray.900"
                fontWeight={"medium"}
                fontSize={"lg"}
                _hover={{ color: "blue" }}
              >
                {post?.author?.name}
              </Text>
            </Link>
            <Text as={"p"} color="gray.600">
              {formatDate(post?.createdAt)}
            </Text>
          </Flex>
        </Flex>
        {/* POST TITLE */}
        <Flex alignItems={"center"} gap={2}>
          <Link to={`/post/${post?.slug}`}>
            <Text
              as={"h2"}
              color="gray.900"
              fontWeight={"bold"}
              fontSize={"3xl"}
              _hover={{ color: "blue" }}
              width="100%"
            >
              {/* {post?.title.slice(0, 60) : post?.title} */}
              {post?.title?.length > 60 ? (
                <>{post?.title.slice(0, 60)}...</>
              ) : (
                <>{post?.title}</>
              )}
            </Text>
          </Link>
        </Flex>
        {/* POST TAGS */}
        <Flex alignItems={"center"} gap={2}>
          <Link to="/t/tagname">
            <Text
              py={1}
              px={2}
              border={"0.5px"}
              borderRadius="md"
              _hover={{ color: "blue.400", border: "1px" }}
            >
              #WebDev
            </Text>
          </Link>
          <Link to="/t/tagname">
            <Text
              py={1}
              px={2}
              border={"0.5px"}
              borderRadius="md"
              _hover={{ color: "purple.400", border: "1px" }}
            >
              #WebDev
            </Text>
          </Link>
          <Link to="/t/tagname">
            <Text
              py={1}
              px={2}
              border={"0.5px"}
              borderRadius="md"
              _hover={{ color: "red.400", border: "1px" }}
            >
              #PythonExe
            </Text>
          </Link>
          <Link to="/t/tagname">
            <Text
              py={1}
              px={2}
              border={"0.5px"}
              borderRadius="md"
              _hover={{ color: "green.400", border: "1px" }}
            >
              #WebDev
            </Text>
          </Link>
        </Flex>
        {/* CARD FOOTER */}
        <Flex
          width={"100%"}
          alignItems={"center"}
          gap={2}
          justifyContent="space-between"
        >
          <Flex gap={3} alignItems="center">
            {post?.reactions?.length > 0 && (
              <>
                <Button
                  leftIcon={<BsSuitHeart />}
                  bg="transparent"
                  color={"black"}
                  _hover={{ bg: "gray.100", color: "blue" }}
                  display={{ md: "none" }}
                >
                  {post?.reactions?.length}
                </Button>
                <Button
                  leftIcon={<BsSuitHeart />}
                  bg="transparent"
                  color={"black"}
                  _hover={{ bg: "gray.100", color: "blue" }}
                  display={{ base: "none", md: "flex" }}
                >
                  {post?.reactions?.length === 1 ? (
                    <>{post?.reactions?.length} Reaction</>
                  ) : (
                    <>{post?.reactions?.length} Reactions</>
                  )}
                </Button>
              </>
            )}
            {post?.comments?.length > 0 && (
              <>
                <Button
                  leftIcon={<VscComment />}
                  bg="transparent"
                  color={"black"}
                  _hover={{ bg: "gray.100", color: "blue" }}
                  display={{ md: "none" }}
                >
                  {post?.comments?.length}
                </Button>
                <Button
                  leftIcon={<VscComment />}
                  bg="transparent"
                  color={"black"}
                  _hover={{ bg: "gray.100", color: "blue" }}
                  display={{ base: "none", md: "flex" }}
                >
                  {post?.comments?.length === 1 ? (
                    <>{post?.comments?.length} Comment</>
                  ) : (
                    <>{post?.comments?.length} Comments</>
                  )}
                </Button>
              </>
            )}
          </Flex>
          <Flex gap={3} alignItems="center">
            <Text as="p" fontSize={"16px"} color="gray.400">
              4 min read
            </Text>
            <IconButton
              icon={<BsBookmark />}
              p={2}
              bg="transparent"
              color={"black"}
              _hover={{ bg: "gray.100", color: "blue" }}
            >
              {post?.comments?.length}
            </IconButton>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Post;
