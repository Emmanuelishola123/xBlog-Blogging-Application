import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PostContentFormatter, AddComment, Comments } from "..";
import { formatDate } from "../../utils/dateFormater";
import { useSelector } from "react-redux";

function Post({ data }) {
  const [html, setHTML] = useState("");
  const { userProfile } = useSelector((state) => state.userReducer);

  return (
    <Box
      width={"100%"}
      maxWidth="100%"
      mt={4}
      bg="white"
      rounded={"lg"}
      shadow="sm"
      mx="auto"
      overflowY={'auto'}
    >
      <Image src={data?.banner} width="100%" height="340px" roundedTop={'xl'} />
      <Flex
        alignItems={"flex-start"}
        px="6"
        py={3}
        gap={2}
        direction={"column"}
      >
        {/* AVATAR & NAME */}
        <Flex gap={3}>
          <Link to={`/profile/${data?.author.username}`}>
            <Avatar name={data?.author.name} src={data?.author.avatar} />{" "}
          </Link>
          <Flex direction={"column"}>
            {" "}
            <Link to={`/profile/${data?.author.username}`}>
              <Text
                as={"h5"}
                color="gray.900"
                fontWeight={"medium"}
                fontSize={"lg"}
                _hover={{ color: "blue" }}
              >
                {data?.author.name}
              </Text>
            </Link>
            <Text as={"p"} color="gray.600">
              Posted on {formatDate(data?.createdAt)}
            </Text>
          </Flex>
        </Flex>
        {/* POST TITLE */}
        <Flex alignItems={"center"} gap={2}>
          {/* <Link to="/post/title"> */}
          <Text
            as={"h2"}
            color="gray.900"
            fontWeight={"bold"}
            fontSize={"3xl"}
            _hover={{ color: "blue" }}
            width="100%"
          >
            <div dangerouslySetInnerHTML={{ __html: data?.title }}></div>
          </Text>
          {/* </Link> */}
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
        <Box width={"100%"} maxWidth={"100%"} my={6}>
          <PostContentFormatter content={data?.content} />
        </Box>
        <AddComment html={html} setHTML={setHTML} postSlug={data?.slug} currentUser={userProfile}/>
        {data?.comments?.length > 0 && (
          <>
            <Divider />
            <Box width={"100%"} maxWidth="100%">
              <Flex justifyContent={"space-between"} alignItems="center" mb="6">
                <Heading as={"h6"} color="gray.600">
                  Comments ({data?.comments?.length})
                </Heading>
              </Flex>

              <Comments comments={data?.comments} />
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default Post;
