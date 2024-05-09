// import {
//   FaBold,
//   FaHeading,
//   FaItalic,
//   FaListOl,
//   FaListUl,
//   FaQuoteLeft,
//   FaRedo,
//   FaStrikethrough,
//   FaUnderline,
//   FaUndo,
// } from "react-icons/fa";
// import { Box, Button, Flex } from "@chakra-ui/react";
// import './style.css';
// import './variables.css';


// function MenuBar({ editor }) {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <Flex justifyContent={"space-between"} alignItems="center">
//       <Box>
//         <Button
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={editor.isActive("bold") ? "is_active" : ""}
//         >
//           <FaBold />
//         </Button>
//         <Button
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={editor.isActive("italic") ? "is_active" : ""}
//         >
//           <FaItalic />
//         </Button>
//         <Button
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           className={editor.isActive("underline") ? "is_active" : ""}
//         >
//           <FaUnderline />
//         </Button>
//         <Button
//           onClick={() => editor.chain().focus().toggleStrike().run()}
//           className={editor.isActive("strike") ? "is_active" : ""}
//         >
//           <FaStrikethrough />
//         </Button>
//         <Button
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 2 }).run()
//           }
//           className={
//             editor.isActive("heading", { level: 2 }) ? "is_active" : ""
//           }
//         >
//           <FaHeading />
//         </Button>
//         <Button
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 3 }).run()
//           }
//           className={
//             editor.isActive("heading", { level: 3 }) ? "is_active" : ""
//           }
//         >
//           <FaHeading className="heading3" />
//         </Button>
//         <Button
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={editor.isActive("bulletList") ? "is_active" : ""}
//         >
//           <FaListUl />
//         </Button>
//         <Button
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={editor.isActive("orderedList") ? "is_active" : ""}
//         >
//           <FaListOl />
//         </Button>
//         <Button
//           onClick={() => editor.chain().focus().toggleBlockquote().run()}
//           className={editor.isActive("blockquote") ? "is_active" : ""}
//         >
//           <FaQuoteLeft />
//         </Button>
//       </Box>
//       <Box>
//         <Button onClick={() => editor.chain().focus().undo().run()}>
//           <FaUndo />
//         </Button>
//         <Button onClick={() => editor.chain().focus().redo().run()}>
//           <FaRedo />
//         </Button>
//       </Box>
//     </Flex>
//   );
// }

// export default MenuBar;














import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import './style.css';
// import './variables.css';



function MenuBar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is_active" : ""
          }
        >
          <FaHeading />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is_active" : ""
          }
        >
          <FaHeading className="heading3" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div>
        <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
}

export default MenuBar;