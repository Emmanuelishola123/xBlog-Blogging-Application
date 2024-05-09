import { Button } from "@chakra-ui/react";
import React from "react";

function FormButton({ social, login }) {
  switch (social) {
    case "google":
      return (
        <Button colorScheme={"blue"}>
          {login ? "Login in with Google" : "Sign up with Google"}
        </Button>
      );
    case "github":
      return (
        <Button colorScheme={"blackAlpha"}>
          {login ? "Login in with Github" : "Sign up with Github"}
        </Button>
      );
    default:
      return <Button>Sign up</Button>;
  }
}

export default FormButton;
