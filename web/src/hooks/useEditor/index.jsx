// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Image from "@tiptap/extension-image";
// import React, { useState } from "react";
// import MenuBar from "./MenuBar";
// import { Box } from "@chakra-ui/react";
// import './style.css';
// import './variables.css';

// function TipTapEditor({ children }) {

//   const [text, setText] = useState("");
//   const editor = useEditor({
//     extensions: [StarterKit, Underline, Image],
//     content: text || '',
//     autofocus: true,
//     editable: true,
//     injectCSS: false,

//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       const json  = editor.getJSON()
//       const txt = editor.getText()
//       setText(editor.getText());
//       console.log({html}, {json}, {txt})
//     },
//   });

//   return (
//     <Box >
//       <MenuBar editor={editor} />
//       <Box>
//         <EditorContent editor={editor} />
//         {children}
//       </Box>
//     </Box>
//   );
// }

// export default TipTapEditor;

import "./style.css";
// import './variables.css';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import React, { useState } from "react";
import MenuBar from "./MenuBar";

function Tiptap({ children, text, setText }) {
  // const [description, setDescription] = useState("");
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: text || "",
    autofocus: true,
    editable: !false,
    injectCSS: false,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setText(editor.getText());
    },
  });

  return (
    <div className="textEditor">
      <div className="editor">
        <EditorContent editor={editor} />
        {children}
      </div>
      <MenuBar editor={editor} />
    </div>
  );
}

export default Tiptap;
