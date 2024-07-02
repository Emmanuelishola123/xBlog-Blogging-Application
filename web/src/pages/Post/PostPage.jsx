import { Flex } from "@chakra-ui/react";
import React from "react";
import { Post, ProfileCard, PostCTA } from "../../components";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../services/postApis";
import { useQuery } from "@tanstack/react-query";
import PostCardShadow from "../../components/Post/PostCardShadow";
import { Helmet } from "react-helmet";

function PostPage() {
  const { postSlug } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["post", postSlug],
    queryFn: () => getSinglePost(postSlug),
  });

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{data?.title || "Blog post"}</title>
          <meta property="og:title" content={data?.title || "Blog post"} />
          <meta property="og:description" content={data?.content} />
          <meta property="og:image" content={data?.banner} />
          <meta
            property="og:url"
            content={
              `https://x-blog-view.vercel.app/post/${data?.postSlug}` ||
              "https://x-blog-view.vercel.app/"
            }
          />
          <meta property="og:type" content="article" />
        </Helmet>
        ;
      </div>
      {/* // <Box px={{ base: 6, lg: 10 }}> */}
      <Flex
        gap={4}
        direction={{ base: "column", lg: "row" }}
        alignItems="flex-start"
        position={"relative"}
        px={{ base: 6, lg: 10 }}
        width={"full"}
      >
        <Flex
          width={{ base: "100%", lg: "60px" }}
          borderTopRadius={{ base: "md", lg: "0" }}
          bg={{ base: "white", lg: "transparent" }}
          zIndex={{ base: "999", lg: "0" }}
          py="2"
          position={{ base: "fixed", lg: "sticky" }}
          top={{ md: "75px" }}
          bottom={{ base: "0" }}
          left="0"
          shadow={{ base: "sm", lg: "none" }}
          mt={{ lg: 16 }}
          height={"100vh"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
        >
          <PostCTA />
        </Flex>
        <Flex flex={{ base: 1, lg: 0.7 }} width={"full"} maxWidth="100%">
          {isLoading ? <PostCardShadow /> : data && <Post data={data} />}
        </Flex>
        <Flex
          position={{ md: "sticky" }}
          top={{ md: "75px" }}
          flex={{ base: 1, lg: 0.3 }}
          width={"100%"}
          maxWidth="100%"
          mx="auto"
          height={{ md: "100vh" }}
        >
          <ProfileCard data={data?.author} />
        </Flex>
      </Flex>
      {/* // </Box> */}
    </>
  );
}

export default PostPage;
