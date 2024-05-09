import { Box, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard, ProfileUserInfo } from "../components";
import ProdileUserMoreInfo from "../components/Profile/ProdileUserMoreInfo";
import {
  userProfileByUsername,
  userProfileTokenless,
} from "../services/userApis";
import { getUserPosts } from "../services/postApis";

function ProfilePage() {
  const { userToken } = useSelector((state) => state.authReducer);
  const { username } = useParams();

  // Fetch userProfile base on username supplied
  const {
    isLoading: isProfileDataLoading,
    error: isProfileDataError,
    data: profileData,
  } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () =>
      userToken
        ? userProfileByUsername(username)
        : userProfileTokenless(username),
  });

  // Fetch userProfile base on username supplied
  const {
    isLoading: isUserPostsLoading,
    error: isUserPostsError,
    data: userPosts,
  } = useQuery({
    queryKey: ["userPosts", username],
    queryFn: () => getUserPosts(username),
  });

  console.log({ userPosts });
  return (
    <Box width="100%">
      <Box bgColor={"pink.500"} pt={{ base: "80px", md: "100px" }} />
      <Box
        width={"100%"}
        mt={"-40px"}
        px={{ base: "0", md: "4", lg: "10vw", xl: "15vw" }}
      >
        <ProfileUserInfo profileDetails={profileData} username={username} />
      </Box>
      <Box px={{ base: "0", md: "4", lg: "10vw", xl: "15vw" }} mt={4}>
        <Flex
          width="full"
          direction={{ base: "column", md: "row" }}
          gap={4}
          alignItems="flex-start"
        >
          <Flex
            flex={{ base: "1", md: "0.3" }}
            display={{ base: "none", md: "flex" }}
            direction="column"
          >
            <ProdileUserMoreInfo
              postPublished={userPosts?.length}
              profileDetails={profileData}
            />
          </Flex>
          {userPosts ? (
            <Flex
              direction={"column"}
              flex={{ base: "1", md: "0.7" }}
              width={"full"}
              mx={"auto"}
            >
              {userPosts?.map((data) => (
                <PostCard key={data?._id} post={data} />
              ))}
            </Flex>
          ) : (
            <Flex>User has not published any post yet!!!</Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default ProfilePage;
