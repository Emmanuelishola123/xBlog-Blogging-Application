import React, { useCallback } from "react";
import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import EmojiModal from "../Editor/EmojiModal";
import { useDisclosure } from "@mantine/hooks";
import CropImgModal from "../Editor/crop-image/cropImgModal";
import { VscSymbolColor } from "react-icons/vsc";
import { AiOutlinePicture } from "react-icons/ai";

function PostRichTextMantineEditor({
  content,
  setContent,
  placeholder = "Your content goes here..."
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedCropImg, { open: openCropImg, close: closeCropImg }] =
    useDisclosure(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      Placeholder.configure({ placeholder }),
      Link,
      Image.configure({
        inline: true,
      }),
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
    ],
    content,
    onUpdate: (props) => {
      setContent(props.editor.getHTML());
    },
  });

  // INSERT EMOJI
  const insertEmoji = (emoji) => {
    if (emoji) {
      editor?.chain().focus().insertContent(emoji?.emoji).run();
    }
    close();
  };

  return (
    <div>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ColorPicker
            colors={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
          />

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control interactive={false}>
              <VscSymbolColor size={16} stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control
              onClick={() => openCropImg()}
              aria-label="Insert image"
              title="Insert image"
            >
              <AiOutlinePicture stroke={1.5} size={16} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => open()}
              aria-label="Insert emoji"
              title="Insert emoji"
            >
              😘
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <EmojiModal opened={opened} close={close} insertEmoji={insertEmoji} />
        <CropImgModal
          opened={openedCropImg}
          close={closeCropImg}
          editor={editor}
        />
        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  );
}

export default PostRichTextMantineEditor;
