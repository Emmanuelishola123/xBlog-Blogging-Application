import { Box } from "@chakra-ui/react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
// import { formats } from "../../utils/TextEditorConfig";
import "../../styles/TextEditorStyle.css";
import { useRef } from "react";

const PostRichTextEditor = ({ html, setHTML, heading, setHeading }) => {
  const quillRef = useRef(null);

  //
  function handleImageUpload() {
    try {
      // const url = await uploadSingleFile(file);
      // console.log({ url });

      console.log("first")

      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(
        range.index,
        "image",
        "https://res.cloudinary.com/dsgye77pa/image/upload/v1680644179/xBlog/pumhmen7vbudlik21tv7.jpg",
      );

      return
    } catch (error) {
      console.log({ error });
      return
    }
  }

  // React Quill Module
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        // [{ header: 1 }, { header: 2 }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // custom button values
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"], // remove formatting button
      ],
      handlers: { image: handleImageUpload() },
    },

    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    //   "video",
  ];

  return (
    <>
      <Box border="2px solid #fefcfc">
        <ReactQuill
          theme="bubble"
          onChange={setHeading}
          value={heading}
          placeholder={"Enter your blog post header here..."}
        />
        <ReactQuill
          ref={quillRef}
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

export default PostRichTextEditor;
