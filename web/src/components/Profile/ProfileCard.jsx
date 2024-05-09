import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { formatDate } from "../../utils/dateFormater";

function ProfileCard({data}) {
  return (
    <Box mt={4} width={"100%"} rounded={"xl"} shadow="sm" bg='white' height={'full'}>
      <Box width={"100%"} height="32px" bg="blue" roundedTop={"xl"} />
      <Flex px={4} pb={3} direction={"column"} justifyContent="flex-start">
        <Flex gap={4} alignItems="center">
          <Avatar
            mt={"-16px"}
            size={"md"}
            src={data?.avatar}
          />
          <Heading as="h4" fontSize={"lg"} fontWeight="bold">
           {data?.name}
          </Heading>
        </Flex>
        <Button
          fontSize={"lg"}
          fontWeight="semibold"
          my={3}
          mx={"auto"}
          width={"100%"}
          py="2"
          variant={"solid"}
          bg="blue"
          color={"white"}
          _hover={{ bg: "blue", opacity: 0.8 }}
          _active={{ bg: "blue", opacity: 0.75 }}
        >
          Follow
        </Button>
        <Flex
          direction={"column"}
          gap={4}
          fontWeight="normal"
          fontSize={"md"}
          color="gray.600"
        >
          <Flex>
            <Text>
             
             {data?.bio || ''}
            </Text>
          </Flex>
          <Flex direction={"column"} gap={1}>
            <Text fontWeight="semibold" textTransform={"uppercase"}>
              Skills
            </Text>
            <Text>{data?.skills || ''}</Text>
          </Flex>
          <Flex direction={"column"} gap={1}>
            <Text fontWeight="semibold" textTransform={"uppercase"}>
              Learning
            </Text>
            <Text>{data?.learning}</Text>
          </Flex>{" "}
          <Flex direction={"column"} gap={1}>
            <Text fontWeight="semibold" textTransform={"uppercase"}>
              Work
            </Text>
            <Text>{data?.works}</Text>
          </Flex>{" "}
          <Flex direction={"column"} gap={1}>
            <Text fontWeight="semibold" textTransform={"uppercase"}>
              Joined
            </Text>
            <Text>{formatDate(data?.createdAt)}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default ProfileCard;
