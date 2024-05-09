import { Modal } from "@mantine/core";
import CropImg from "./cropImg";

function CropImgModal(props) {
  const { close, opened, editor } = props;
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size={"lg"}
      >
        <CropImg editor={editor} close={close} />
      </Modal>
    </>
  );
}

export default CropImgModal;
