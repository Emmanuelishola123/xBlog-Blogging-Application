import { Box } from "@chakra-ui/react";
import React from "react";
import DragNDropFile from "./PostDragNDropFile";
import PostRichTextEditor from "./PostRichTextEditor";

const NewPost = () => {
  return (
    <Box maxWidth={"990px"} mx="auto">
      <DragNDropFile />
      <PostRichTextEditor />
    </Box>
  );
};

export default NewPost;
 