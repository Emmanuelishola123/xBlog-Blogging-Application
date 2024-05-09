import { Modal } from "@mantine/core";
import EmojiPicker from "emoji-picker-react";

const EmojiModal = (props) => {
  const { opened, close, insertEmoji } = props;
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size={"auto"}
      >
        <EmojiPicker onEmojiClick={insertEmoji} />
      </Modal>
    </>
  );
};

export default EmojiModal;
