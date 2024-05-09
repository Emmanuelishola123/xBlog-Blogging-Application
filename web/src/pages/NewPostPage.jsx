import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DragNDropFile, NewPost } from "../components";
import PostRichTextEditor from "../components/Post/PostRichTextEditor";
import PostRichTextMantineEditor from "../components/Post/PostRichTextMantineEditor";
import ReactQuill from "react-quill";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { uploadApi } from "../services/api";
import { uploadSingleFile } from "../services/uploadApis";
import { createPost } from "../services/postApis";

function NewPostPage() {
  const { userProfile } = useSelector((state) => state.userReducer);
  const [html, setHTML] = useState("****");
  const [heading, setHeading] = useState(
    "<h1><strong>Post Title</strong></h1>",
  );
  const [banner, setBanner] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // console.log({ html }, { heading });
  // console.log(searchParams.get("preview"));

  const submitPost = async () => {
    try {
      setLoading(true);
      let fileForm = new FormData();
      fileForm.append("file", banner);
      let { data } = await uploadSingleFile(fileForm);

      const post = {
        title: heading,
        content: html,
        banner: data,
        author: userProfile?._id,
      };
      const newPost = await createPost(post);
      setLoading(false);
      navigate(`/post/${newPost?.data}`)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box px={{ base: 6, lg: 10 }} py="10px">
      <Flex direction={"column"} gap={"4"} maxWidth={"990px"} mx="auto">
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text
            as={"h2"}
            fontSize={"3xl"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            New Post{" "}
          </Text>
          <ButtonGroup gap={"4"}>
            <Button
              variant={
                searchParams.get("preview") === "true" ? "solid" : "outline"
              }
              colorScheme="blue"
              onClick={() => setSearchParams({ preview: false })}
            >
              Edit
            </Button>
            <Button
              variant={
                searchParams.get("preview") === "true" ? "outline" : "solid"
              }
              colorScheme="blue"
              onClick={() => setSearchParams({ preview: true })}
            >
              Preview
            </Button>
          </ButtonGroup>
        </Flex>
        {searchParams.get("preview") === "true" ? (
          "PREVIEW MODE"
        ) : (
          <>
            <Flex direction={"column"} gap="8">
              <DragNDropFile banner={banner} setBanner={setBanner} />
              <ReactQuill
                theme="bubble"
                onChange={setHeading}
                value={heading}
                placeholder={"Enter your blog post header here..."}
              />
              <PostRichTextMantineEditor setContent={setHTML} content={html} placeholder={"Your comment goes here..."} />
            </Flex>

            <Flex>
              <ButtonGroup gap={"4"}>
                <Button
                  variant={"solid"}
                  colorScheme="blue"
                  onClick={submitPost}
                  isLoading={loading}
                >
                  Publish
                </Button>
                {/* <Button variant={"outline"} colorScheme="blue">
              Save draft
            </Button> */}
              </ButtonGroup>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default NewPostPage;
