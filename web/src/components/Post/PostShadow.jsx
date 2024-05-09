import {
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import React from "react";

function PostShadow() {
  return (
    <Stack
      gap={4}
      mb={6}
      border={"1px solid #cecece"}
      rounded={"lg"}
      bg={"whitesmoke"}
      shadow={"base"}
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
      </Flex>
    </Stack>
  );
}

export default PostShadow;
