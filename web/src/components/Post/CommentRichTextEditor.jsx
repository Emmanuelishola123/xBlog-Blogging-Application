import { Box } from "@chakra-ui/react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { formats, modules } from "../../utils/TextEditorConfig";
import "../../styles/TextEditorStyle.css";

const CommentRichTextEditor = ({ html, setHTML }) => {
  return (
    <>
      <Box border="2px solid #fefcfc">
        <ReactQuill
          theme="snow"
          onChange={setHTML}
          value={html}
          placeholder={"Start writing your blog post here..."}
          modules={modules}
          formats={formats}
        />
      </Box>
    </>
  );
};

export default CommentRichTextEditor;
