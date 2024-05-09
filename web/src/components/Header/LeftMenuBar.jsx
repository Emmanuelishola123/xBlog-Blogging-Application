import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import SideBar from "./SideBar";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeLeftMenuBar } from "../../redux/othersReducer";

function LeftMenuBar() {
  const { isLeftMenuBarOpen } = useSelector((state) => state.othersReducer);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeLeftMenuBar());
  };
  return (
    <>
      <Drawer
        size={"sm"}
        placement={"left"}
        onClose={handleClose}
        isOpen={isLeftMenuBarOpen}
      >
        {/* <DrawerOverlay /> */}

        <DrawerContent bgColor={"f5f5f5"}>
          <DrawerHeader borderBottomWidth="0px">
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"4"}
            >
              <Text
                fontSize={"2xl"}
                color={"blackAlpha.800"}
                fontWeight={"bold"}
              >
                xBlog Community
              </Text>
              <IconButton
                variant={"ghost"}
                colorScheme="blackAlpha"
                onClick={handleClose}
              >
                <FaTimes size={"20"} />
              </IconButton>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <SideBar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default LeftMenuBar;
