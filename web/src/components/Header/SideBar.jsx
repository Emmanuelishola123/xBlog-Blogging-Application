import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate, } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  return (
    <Box
      position={"sticky"}
      top="75px"
      as="aside"
      width={"100%"}
      maxWidth={{ lg: "240px" }}
      height={"100vh"}
    >
      <Flex direction={"column"} gap={2}>
        <Box bg={"#fff"} rounded={"md"} px={4} py={4}>
          <Text fontSize={"3xl"} mb={4} fontWeight={"bold"}>
            Welcome To xBlog Community 👩‍💻👨‍💻
          </Text>
          <Text fontSize={"lg"} mb={4}>
            xBlog Community 👩‍💻👨‍💻 is a community of amazing developers,
            programmers and Engineers
          </Text>
          <Flex direction={"column"} gap={3}>
            <Button
              variant={"outline"}
              onClick={() => navigate("/auth/login")}
              width={"full"}
              colorScheme="blue"
            >
              Login to Continue
            </Button>{" "}
            <Button
              width={"full"}
              onClick={() => navigate("/auth/join")}
              colorScheme="blue"
            >
              Join Community
            </Button>
          </Flex>
        </Box>

        <NavLink to="/">
          <Flex
            alignItems={"center"}
            gap={2}
            width={"100%"}
            px={3}
            py={4}
            borderRadius="lg"
            fontWeight="semibold"
            fontSize={"xl"}
            minWidth="100%"
            _hover={{ color: "#3182ce", fontWeight: 700,  bg: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 44 44"
              width="24"
              height="24"
            >
              <g class="nc-icon-wrapper">
                <path
                  fill="#A0041E"
                  d="M13.344 18.702h-2a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v7a.5.5 0 01-.5.5z"
                ></path>
                <path fill="#FFE8B6" d="M9 20L22 7l13 13v17H9z"></path>
                <path fill="#FFCC4D" d="M22 20h1v16h-1z"></path>
                <path
                  fill="#66757F"
                  d="M35 21a.997.997 0 01-.707-.293L22 8.414 9.707 20.707a1 1 0 11-1.414-1.414l13-13a.999.999 0 011.414 0l13 13A.999.999 0 0135 21z"
                ></path>
                <path
                  fill="#66757F"
                  d="M22 21a.999.999 0 01-.707-1.707l6.5-6.5a1 1 0 111.414 1.414l-6.5 6.5A.997.997 0 0122 21z"
                ></path>
                <path fill="#C1694F" d="M14 30h4v6h-4z"></path>
                <path
                  fill="#55ACEE"
                  d="M14 21h4v4h-4zm12.5 0h4v4h-4zm0 9h4v4h-4z"
                ></path>
                <path
                  fill="#5C913B"
                  d="M37.5 37.5A1.5 1.5 0 0136 39H8a1.5 1.5 0 010-3h28a1.5 1.5 0 011.5 1.5z"
                ></path>
              </g>
            </svg>
            Home
          </Flex>
        </NavLink>
        <NavLink to="/">
          <Flex
            alignItems={"center"}
            gap={2}
            width={"100%"}
            as={"h6"}
            px={3}
            py={4}
            borderRadius="lg"
            fontWeight="semibold"
            fontSize={"xl"}
            minWidth="100%"
            _hover={{ color: "#3182ce", fontWeight: 700,  bg: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 44 44"
              width="24"
              height="24"
            >
              <g class="nc-icon-wrapper">
                <path
                  fill="#67757F"
                  d="M39 24c0 2.209-1.791 2-4 2H9c-2.209 0-4 .209-4-2l2-12c.125-1.917 1.791-4 4-4h22c2.209 0 3.791 2.208 4 4l2 12z"
                ></path>
                <path
                  fill="#CCD6DD"
                  d="M32 17a2 2 0 01-2 2H14a2 2 0 01-2-2V9a2 2 0 012-2h16a2 2 0 012 2v8z"
                ></path>
                <path
                  fill="#E1E8ED"
                  d="M34 21a2 2 0 01-2 2H12a2 2 0 01-2-2v-8a2 2 0 012-2h20a2 2 0 012 2v8z"
                ></path>
                <path
                  fill="#F5F8FA"
                  d="M36 25a2 2 0 01-2 2H10a2 2 0 01-2-2v-8a2 2 0 012-2h24a2 2 0 012 2v8z"
                ></path>
                <path
                  fill="#9AAAB4"
                  d="M39 35a4 4 0 01-4 4H9a4 4 0 01-4-4V24a4 4 0 014-4h26a4 4 0 014 4v11z"
                ></path>
                <path fill="#67757F" d="M18 16zm0 0z"></path>
                <path
                  fill="#FCAB40"
                  d="M26 5h-5a2 2 0 00-2 2v1h4a2 2 0 012 2h1a2 2 0 002-2V7a2 2 0 00-2-2z"
                ></path>
                <path
                  fill="#5DADEC"
                  d="M22 9h-5a2 2 0 00-2 2v1h4a2 2 0 012 2h1a2 2 0 002-2v-1a2 2 0 00-2-2z"
                ></path>
                <path
                  fill="#E75A70"
                  d="M20 16a2 2 0 01-2 2h-5a2 2 0 01-2-2v-1a2 2 0 012-2h5a2 2 0 012 2v1z"
                ></path>
                <path
                  fill="#67757F"
                  d="M29 32a2 2 0 01-2 2H17a2 2 0 01-2-2v-5a2 2 0 012-2h10a2 2 0 012 2v5zm-11-4z"
                ></path>
                <path
                  fill="#E1E8ED"
                  d="M27 31a1 1 0 01-1 1h-8a1 1 0 01-1-1v-3a1 1 0 011-1h8a1 1 0 011 1v3z"
                ></path>
              </g>
            </svg>
            Reading List
          </Flex>
        </NavLink>
        <NavLink to="/">
          <Flex
            alignItems={"center"}
            gap={2}
            width={"100%"}
            as={"h6"}
            px={3}
            py={4}
            borderRadius="lg"
            fontWeight="semibold"
            fontSize={"xl"}
            minWidth="100%"
            _hover={{ color: "#3182ce", fontWeight: 700,  bg: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 44 44"
              width="24"
              height="24"
            >
              <g class="nc-icon-wrapper">
                <path
                  fill="#FFD983"
                  d="M36 4H14a4 4 0 00-4 4v24H8a4 4 0 000 8h24a4 4 0 004-4V12a4 4 0 000-8z"
                ></path>
                <path fill="#E39F3D" d="M12 14h24v-2H14l-2-1z"></path>
                <path
                  fill="#FFE8B6"
                  d="M14 4a4 4 0 00-4 4v24.555A3.955 3.955 0 008 32a4 4 0 104 4V11.445c.59.344 1.268.555 2 .555a4 4 0 000-8z"
                ></path>
                <path
                  fill="#C1694F"
                  d="M16 8a2 2 0 11-4.001-.001A2 2 0 0116 8m-6 28a2 2 0 11-4.001-.001A2 2 0 0110 36m24-17a1 1 0 01-1 1H15a1 1 0 010-2h18a1 1 0 011 1m0 4a1 1 0 01-1 1H15a1 1 0 110-2h18a1 1 0 011 1m0 4a1 1 0 01-1 1H15a1 1 0 110-2h18a1 1 0 011 1m0 4a1 1 0 01-1 1H15a1 1 0 110-2h18a1 1 0 011 1"
                ></path>
              </g>
            </svg>
            Listings{" "}
          </Flex>
        </NavLink>
        <NavLink to="/">
          <Flex
            alignItems={"center"}
            gap={2}
            width={"100%"}
            as={"h6"}
            px={3}
            py={4}
            borderRadius="lg"
            fontWeight="semibold"
            fontSize={"xl"}
            minWidth="100%"
            _hover={{ color: "#3182ce", fontWeight: 700,  bg: "white" }}
          >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="24" height="24">
    <g class="nc-icon-wrapper">
        <path fill="#292F33" d="M10 19h24v2H10zm15 15c0 2.208-.792 4-3 4-2.209 0-3-1.792-3-4s.791-2 3-2c2.208 0 3-.208 3 2z"></path>
        <path fill="#66757F" d="M22 35c-6.627 0-10 1.343-10 3v2h20v-2c0-1.657-3.373-3-10-3z"></path>
        <path fill="#99AAB5" d="M22 4a9 9 0 00-9 9v7h18v-7a9 9 0 00-9-9z"></path>
        <g fill="#292F33" transform="translate(4 4)">
            <circle cx="15.5" cy="2.5" r="1.5"></circle>
            <circle cx="20.5" cy="2.5" r="1.5"></circle>
            <circle cx="17.5" cy="6.5" r="1.5"></circle>
            <circle cx="22.5" cy="6.5" r="1.5"></circle>
            <circle cx="12.5" cy="6.5" r="1.5"></circle>
            <circle cx="15.5" cy="10.5" r="1.5"></circle>
            <circle cx="10.5" cy="10.5" r="1.5"></circle>
            <circle cx="20.5" cy="10.5" r="1.5"></circle>
            <circle cx="25.5" cy="10.5" r="1.5"></circle>
            <circle cx="17.5" cy="14.5" r="1.5"></circle>
            <circle cx="22.5" cy="14.5" r="1.5"></circle>
            <circle cx="12.5" cy="14.5" r="1.5"></circle>
        </g>
        <path fill="#66757F" d="M13 19.062V21c0 4.971 4.029 9 9 9s9-4.029 9-9v-1.938H13z"></path>
        <path fill="#66757F" d="M34 18a1 1 0 00-1 1v2c0 6.074-4.925 11-11 11s-11-4.926-11-11v-2a1 1 0 00-2 0v2c0 7.18 5.82 13 13 13s13-5.82 13-13v-2a1 1 0 00-1-1z"></path>
    </g>
</svg>
            Podcasts
          </Flex>
        </NavLink>
        <NavLink to="/">
          <Flex
            alignItems={"center"}
            gap={2}
            width={"100%"}
            as={"h6"}
            px={3}
            py={4}
            borderRadius="lg"
            fontWeight="semibold"
            fontSize={"xl"}
            minWidth="100%"
            _hover={{ color: "#3182ce", fontWeight: 700,  bg: "white" }}
          >
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="24" height="24">
    <g transform="translate(4 4)">
        <path fill="#31373D" d="M34.074 18l-4.832 3H28v-4c0-.088-.02-.169-.026-.256C31.436 15.864 34 12.735 34 9a8 8 0 00-16.001 0c0 1.463.412 2.822 1.099 4H14.92c.047-.328.08-.66.08-1a7 7 0 10-14 0 6.995 6.995 0 004 6.317V29a4 4 0 004 4h15a4 4 0 004-4v-3h1.242l4.832 3H35V18h-.926zM28.727 3.977a5.713 5.713 0 012.984 4.961L28.18 8.35a2.276 2.276 0 00-.583-.982l1.13-3.391zm-.9 6.342l3.552.592a5.713 5.713 0 01-4.214 3.669 3.985 3.985 0 00-1.392-1.148l.625-2.19a2.425 2.425 0 001.429-.923zM26 3.285c.282 0 .557.027.828.067l-1.131 3.392c-.404.054-.772.21-1.081.446L21.42 5.592A5.703 5.703 0 0126 3.285zM20.285 9c0-.563.085-1.106.236-1.62l3.194 1.597-.002.023c0 .657.313 1.245.771 1.662L23.816 13h-1.871a5.665 5.665 0 01-1.66-4zm-9.088-.385A4.64 4.64 0 0112.667 12c0 .344-.043.677-.113 1H10.1c.145-.304.233-.641.233-1a2.32 2.32 0 00-.392-1.292l1.256-2.093zM8 7.333c.519 0 1.01.105 1.476.261L8.22 9.688c-.073-.007-.145-.022-.22-.022a2.32 2.32 0 00-1.292.392L4.615 8.803A4.64 4.64 0 018 7.333zM3.333 12c0-.519.105-1.01.261-1.477l2.095 1.257c-.007.073-.022.144-.022.22 0 .75.36 1.41.91 1.837a3.987 3.987 0 00-1.353 1.895C4.083 14.881 3.333 13.533 3.333 12z"></path>
        <circle fill="#8899A6" cx="24" cy="19" r="2"></circle>
        <circle fill="#8899A6" cx="9" cy="19" r="2"></circle>
        <path fill="#8899A6" d="M24 27a2 2 0 00-2-2H11a2 2 0 00-2 2v6a2 2 0 002 2h11a2 2 0 002-2v-6z"></path>
    </g>
</svg>
            Videos
          </Flex>
        </NavLink>
        <NavLink to="/">
          <Flex
            alignItems={"center"}
            gap={2}
            width={"100%"}
            as={"h6"}
            px={3}
            py={4}
            borderRadius="lg"
            fontWeight="semibold"
            fontSize={"xl"}
            minWidth="100%"
            _hover={{ color: "#3182ce", fontWeight: 700,  bg: "white" }}
          >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="24" height="24">
    <g class="nc-icon-wrapper">
        <path fill="#FFD983" d="M36.017 24.181L21.345 9.746C20.687 9.087 19.823 9 18.96 9H8.883C7.029 9 6 10.029 6 11.883v10.082c0 .861.089 1.723.746 2.38L21.3 39.017a3.287 3.287 0 004.688 0l10.059-10.088c1.31-1.312 1.28-3.438-.03-4.748zm-23.596-8.76a1.497 1.497 0 11-2.118-2.117 1.497 1.497 0 012.118 2.117z"></path>
        <path fill="#D99E82" d="M13.952 11.772a3.66 3.66 0 00-5.179 0 3.663 3.663 0 105.18 5.18 3.664 3.664 0 00-.001-5.18zm-1.53 3.65a1.499 1.499 0 11-2.119-2.12 1.499 1.499 0 012.119 2.12z"></path>
        <path fill="#C1694F" d="M12.507 14.501a1 1 0 11-1.415-1.414l8.485-8.485a1 1 0 111.415 1.414l-8.485 8.485z"></path>
    </g>
</svg>
            Tags
          </Flex>
        </NavLink>
      </Flex>
      {/* <Flex direction={"column"} gap={3}>
        <Text
          fontWeight={"bold"}
          fontSize="2xl"
          color={"gray.500"}
          p={2}
          borderRadius={"md"}
        >
          My Tags
        </Text>
        <NavLink to="/">
          <Text
            width={"100%"}
            as={"h6"}
            px={3}
            py={4}
            borderRadius="lg"
            fontWeight="semibold"
            fontSize={"xl"}
            minWidth="100%"
            _hover={{ color: "#3182ce", fontWeight: 700,  bg: "white" }}
          >
            #WebDev
          </Text>
        </NavLink>
        <NavLink to="/">
          <Text
            width={"100%"}
            as={"h6"}
            px={3}
            py={4}
            borderRadius="lg"
            fontWeight="semibold"
            fontSize={"xl"}
            minWidth="100%"
            _hover={{ color: "#3182ce", fontWeight: 700,  bg: "white" }}
          >
            #Software
          </Text>
        </NavLink>
        <NavLink to="/">
          <Text
            width={"100%"}
            as={"h6"}
            px={3}
            py={4}
            borderRadius="lg"
            fontWeight="semibold"
            fontSize={"xl"}
            minWidth="100%"
            _hover={{ color: "#3182ce", fontWeight: 700,  bg: "white" }}
          >
            #RegExp
          </Text>
        </NavLink>
        <NavLink to="/">
          <Text
            width={"100%"}
            as={"h6"}
            px={3}
            py={4}
            borderRadius="lg"
            fontWeight="semibold"
            fontSize={"xl"}
            minWidth="100%"
            _hover={{ color: "#3182ce", fontWeight: 700,  bg: "white" }}
          >
            #JS
          </Text>
        </NavLink>

        <NavLink to="/">
          <Text
            width={"100%"}
            as={"h6"}
            px={3}
            py={4}
            borderRadius="lg"
            fontWeight="semibold"
            fontSize={"xl"}
            minWidth="100%"
            _hover={{ color: "#3182ce", fontWeight: 700,  bg: "white" }}
          >
            #Linux
          </Text>
        </NavLink>
      </Flex> */}
    </Box>
  );
}

export default SideBar;
