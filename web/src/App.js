import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { PostCard, PostTag } from "./components";
import { getHomePosts } from "./services/postApis";
import { useQuery } from "@tanstack/react-query";
import { UseQuery } from "./hooks/useQuery";
import NotificationAlert from "./components/Notification/Modal/NotificationAlert";
import SideBar from "./components/Header/SideBar";
import PostShadow from "./components/Post/PostShadow";

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getHomePosts(),
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const sTop = UseQuery("s");

  const sortPostBy = (value, queryParam = "s") => {
    if (queryParam === "s" && value !== "top") {
      searchParams.delete("r");
      setSearchParams(searchParams);
    }
    if (value === "") {
      searchParams.delete("s");
      searchParams.delete("r");
      setSearchParams(searchParams);
    } else {
      searchParams.set(queryParam, value);
      setSearchParams(searchParams);
    }
  };

  return (
    <Flex
      mt={4}
      position="relative"
      gap={4}
      width={"100%"}
      px={{ base: 6, lg: 10 }}
    >
      {/* <Flex gap={6} > */}
      {/* LEFT SIDE */}

      <Box display={{ base: "none", lg: "flex" }}>
        <SideBar />
      </Box>

      {/* POST CARDS */}
      <Box as="main" flex={1} overflow={"auto"} maxWidth={"760px"}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent={"space-between"}
          alignItems={{ base: "flex-start", md: "center" }}
          mb={4}
        >
          <Flex alignItems={"center"} gap={4}>
            <Button
              variant={"ghost"}
              fontWeight={"bold"}
              fontSize="lg"
              _hover={{ bg: "white", color: "blue" }}
              px={3}
              py={1.5}
              borderRadius={"md"}
              onClick={() => sortPostBy("")}
            >
              Relevant
            </Button>
            <Button
              variant={"ghost"}
              fontWeight={"bold"}
              fontSize="lg"
              _hover={{ bg: "white", color: "blue" }}
              px={3}
              py={1.5}
              borderRadius={"md"}
              onClick={() => sortPostBy("latest")}
            >
              Latest
            </Button>
            <Button
              variant={"ghost"}
              fontWeight={"bold"}
              fontSize="lg"
              _hover={{ bg: "white", color: "blue" }}
              px={3}
              py={1.5}
              borderRadius={"md"}
              onClick={() => {
                sortPostBy("top");
                sortPostBy("day", "r");
              }}
            >
              Top
            </Button>
          </Flex>
          {sTop === "top" && (
            <Flex>
              <Button variant={"ghost"} onClick={() => sortPostBy("day", "r")}>
                Day{" "}
              </Button>
              <Button variant={"ghost"} onClick={() => sortPostBy("week", "r")}>
                Week{" "}
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => sortPostBy("month", "r")}
              >
                Month{" "}
              </Button>
              <Button variant={"ghost"} onClick={() => sortPostBy("year", "r")}>
                Year{" "}
              </Button>
            </Flex>
          )}
        </Flex>

        {isLoading ? (
          [1, 2, 3, 4].map((item) => <PostShadow key={item} />)
        ) : data ? (
          data?.docs?.map((post, key) => <PostCard key={key} post={post} />)
        ) : (
          <Flex>
            <Text>Something went wrong {error}</Text>
          </Flex>
        )}
      </Box>
      {/* RIGHT SIDE */}
      <Box
        position={"sticky"}
        top="75px"
        height={"100vh"}
        as="aside"
        width={"100%"}
        maxWidth={{ base: "290px", md: "320px" }}
        display={{ base: "none", xl: "block" }}
        ml={3}
      >
        {/* <Text
            fontWeight={"bold"}
            fontSize="2xl"
            color={"gray.500"}
            p={2}
            borderRadius={"md"}
          >
            Let's Discuss
          </Text> */}
        <PostTag />
      </Box>
      {/* </Flex> */}
    </Flex>
  );
}

export default App;
