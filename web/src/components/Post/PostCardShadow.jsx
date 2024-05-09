import {
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import React from "react";

function PostCardShadow() {
  return (
    <Stack
      gap={4}
      my={6}
      rounded={"lg"}
      bg={"whitesmoke"}
      width={"full"}
      maxWidth={"full"}
    >
      <Skeleton width={"full"} height={"260px"} roundedTop={"lg"} />
      <Flex direction={"column"} p={4} pb={6} gap={4}>
        <Flex gap={4}>
          <SkeletonCircle width={"50px"} height={"50px"} rounded={"full"} />
          <Flex direction={"column"} gap={2}>
            <Skeleton width="150px" rounded={5} height="18px" />
            <Skeleton width="120px" rounded={5} height="18px" />
          </Flex>
        </Flex>
        <Skeleton width={"full"} height={"25px"} rounded={5} />
        <Flex gap={8}>
          <Skeleton width={"90px"} height={"25px"} />
          <Skeleton width={"90px"} height={"25px"} />
          <Skeleton width={"90px"} height={"25px"} />
          <Skeleton width={"90px"} height={"25px"} />
        </Flex>
        <SkeletonText noOfLines={4} height={"22px"} mb={4} />
      </Flex>

      <Flex direction={"column"} gap={4} width={"full"} pb={4}>
        <Heading as={"h6"} color="gray.600">
          Comment on post
        </Heading>
        <Flex width="full" gap={4} alignItems={"flex-start"}>
          <SkeletonCircle width={"40px"} height={"40px"} rounded={"full"} />
          <Flex width="full" direction={"column"} gap={1}>
            <Skeleton height={"200px"} width={"full"} rounded={"md"} />
            <Flex width="full" gap={4}>
              <Skeleton width={"80px"} height={"40px"} rounded={"md"} />{" "}
            </Flex>
          </Flex>
        </Flex>
        <Heading as={"h6"} color="gray.600">
          Comments
        </Heading>
        <Flex direction={"column"} gap={4} width={"full"}>
          <Flex width="full" gap={4} alignItems={"flex-start"}>
            <SkeletonCircle width={"40px"} height={"40px"} rounded={"full"} />
            <Flex width="full" direction={"column"} gap={1}>
              <Skeleton height={"90px"} width={"full"} rounded={"md"} />
              <Flex width="full" gap={4}>
                <Skeleton width={"40px"} height={"40px"} rounded={"md"} />{" "}
                <Skeleton width={"40px"} height={"40px"} rounded={"md"} />{" "}
              </Flex>
            </Flex>
          </Flex>{" "}
          <Flex width="full" gap={4} alignItems={"flex-start"}>
            <SkeletonCircle width={"40px"} height={"40px"} rounded={"full"} />
            <Flex width="full" direction={"column"} gap={1}>
              <Skeleton height={"90px"} width={"full"} rounded={"md"} />
              <Flex width="full" gap={4}>
                <Skeleton width={"40px"} height={"40px"} rounded={"md"} />{" "}
                <Skeleton width={"40px"} height={"40px"} rounded={"md"} />{" "}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  );
}

export default PostCardShadow;
