import { Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <Image
        src="/assets/logo.png"
        alt="xblog is a community of thousands of thousands of developers all over the world"
        width={{ base: "90px", lg: "120px" }}
        maxHeight="80px"
      />
    </Link>
  );
};

export default Logo;
