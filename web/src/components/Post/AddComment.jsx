import { Avatar, Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import PostRichTextMantineEditor from "./PostRichTextMantineEditor";
import { addCommentToPost } from "../../services/postApis";

function AddComment({ html, setHTML, postSlug, currentUser }) {
  const [loading, setLoading] = useState(false);

  const handleComment = async () => {
    try {
      setLoading(true);
      await addCommentToPost(html, postSlug);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex mx={"auto"} gap={4} maxWidth="100%">
      <Avatar size={"sm"} src={currentUser?.avatar} />
      <Box width="100%">
        {/* <CommentRichTextEditor html={html} setHTML={setHTML} /> */}
        <PostRichTextMantineEditor setContent={setHTML} content={html} />
        <ButtonGroup mt="3">
          <Button
            variant={"solid"}
            colorScheme="blue"
            isLoading={loading}
            loadingText="Submitting..."
            onClick={handleComment}
          >
            Submit
          </Button>
          {/* <Button variant={"outline"}>Preview</Button> */}
        </ButtonGroup>
      </Box>
    </Flex>
  );
}

export default AddComment;
