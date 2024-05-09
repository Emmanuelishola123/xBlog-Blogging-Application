import { Box, Button, ButtonGroup, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UseQuery, SetQuery } from "../hooks/useQuery";
import SearchedComments from "../components/Search/SearchedComments";
import SearchedUsers from "../components/Search/SearchedUsers";
import SearchedPosts from "../components/Search/SearchedPosts";
import { useSearchParams } from "react-router-dom";
import { searchAll } from "../services/searchApis";

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = UseQuery("q");
  const c = UseQuery("category");
  const s = UseQuery("sort-by");

  console.log(q, c, s);

  const setCategoryQuery = (value) => {
    if (value === undefined) {
      searchParams.delete("category", value);
      setSearchParams(searchParams);
    } else {
      searchParams.set("category", value);
      setSearchParams(searchParams);
    }
  };
  const setSortQuery = (value) => {
    searchParams.set("sort-by", value);
    setSearchParams(searchParams);
  };

  
  useEffect(() => {
    const fetchQuery = async () => {
      if (q) {
        try {
          setLoading(false);
          const res = await searchAll(q, c, s);

          console.log({ res });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
          console.log({ q, s, c });
        }
      }
    };
    fetchQuery();
  }, [q, c, s]);

  return (
    <Box px={{ base: 6, lg: 10 }} py={4} maxWidth={"1100px"} mx={"auto"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={{ base: "flex-end", md: "center" }}
        gap={4}
        mb={8}
        direction={{ base: "column", md: "row" }}
      >
        <Text fontWeight={"semibold"} fontSize={"3xl"} textAlign={"center"}>
          Search results for {q}
        </Text>
        <ButtonGroup>
          <Button variant={"ghost"} onClick={() => setSortQuery("relevant")}>
            Most Relevant
          </Button>
          <Button variant={"ghost"} onClick={() => setSortQuery("newest")}>
            Newest
          </Button>
          <Button variant={"ghost"} onClick={() => setSortQuery("oldest")}>
            Oldest
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex
        gap={8}
        justifyContent={"space-between"}
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          direction={{ base: "row", md: "column" }}
          gap={4}
          flexWrap={"nowrap"}
          overflowX={"auto"}
          width="auto"
          alignItems={"flex-start"}
        >
          <Button
            variant={"link"}
            fontWeight={600}
            fontSize={{ base: "lg", lg: "2xl" }}
            _hover={{
              textDecoration: "none",
            }}
            onClick={() => setCategoryQuery(undefined)}
          >
            Posts
          </Button>
          <Button
            variant={"link"}
            fontWeight={600}
            fontSize={{ base: "lg", lg: "2xl" }}
            _hover={{
              textDecoration: "none",
            }}
            onClick={() => setCategoryQuery("users")}
          >
            Users
          </Button>
          <Button
            variant={"link"}
            fontWeight={600}
            fontSize={{ base: "lg", lg: "2xl" }}
            _hover={{
              textDecoration: "none",
            }}
            onClick={() => setCategoryQuery("comments")}
          >
            Comments
          </Button>
          <Button
            variant={"link"}
            fontWeight={600}
            fontSize={{ base: "lg", lg: "2xl" }}
            _hover={{
              textDecoration: "none",
            }}
            onClick={() => setCategoryQuery("my-posts")}
          >
            My Posts Only
          </Button>
          <Button
            variant={"link"}
            fontWeight={600}
            fontSize={{ base: "lg", lg: "2xl" }}
            _hover={{
              textDecoration: "none",
            }}
            onClick={() => setCategoryQuery("my-comments")}
          >
            My Comments Only
          </Button>
        </Flex>
        <Flex
          width={{ base: "0px", md: "40px" }}
          display={{ base: "none", md: "flex" }}
        ></Flex>
        <Flex direction={"column"} gap={4}>
          {/* <Text>LLL</Text> */}
          {(!c || c === "my-posts") && (
            <SearchedPosts query={q} category={c} sortBy={s} />
          )}
          {c === "users" && <SearchedUsers query={q} sortBy={s} />}
          {(c === "comments" || c === "my-comments") && (
            <SearchedComments query={q} category={c} sortBy={s} />
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default SearchPage;
