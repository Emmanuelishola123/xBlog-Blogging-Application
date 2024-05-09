import { useDispatch, useSelector } from "react-redux";
import { authLogout, closeLogoutDialog } from "../../redux/authReducer";
import { logoutProfile } from "../../redux/userReducer";

const {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} = require("@chakra-ui/react");
const { useRef } = require("react");

function ConfirmLogout() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.authReducer);
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={() => dispatch(closeLogoutDialog())}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Logout Alert</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to logout?</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => dispatch(closeLogoutDialog())}
            >
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                dispatch(authLogout());
                dispatch(logoutProfile());
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ConfirmLogout;
