import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBirthdayCake, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ProdileUserMoreInfo from "./ProdileUserMoreInfo";
import { formatDate } from "../../utils/dateFormater";
import { followUser, unfollowUser } from "../../services/userApis";
import { updateFollowingList } from "../../redux/userReducer";
import { socket } from "../../socket";

function ProfileUserInfo({ profileDetails, username }) {
  const { userProfile } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [profileBtn, setProfileBtn] = useState("follow");
  const dispatch = useDispatch();

  console.log({ profileDetails });

  const isCurrentUser = () => {
    if (
      userProfile?.username === profileDetails?.username ||
      profileDetails?.connectionLevel == 0
    )
      return true;
    return false;
  };

  const follow = async () => {
    // try {
    //   setLoading(true);
    //   const { data } = await followUser(profileDetails?._id);
    //   console.log("follow", { data });
    //   profileDetails.followers = data.data.userFollowers;
    //   profileDetails.connectionLevel = data.data.connectionLevel;
    //   dispatch(updateFollowingList(data.data.myFollowing));
    //   setLoading(false);
    //   return data;
    // } catch (error) {
    //   console.log({ error });
    //   setLoading(false);
    //   return error;
    // } finally {
      //   setLoading(false);
      // }
      
        setLoading(true);
    socket.emit("follow_user", {
      currentUserId: userProfile?._id,
      userToFollowId: profileDetails?._id,
    });

    setLoading(false);
  };

  const unfollow = async () => {
    try {
      setLoading(true);
      const { data } = await unfollowUser(profileDetails?._id);
      console.log("unfollow", { data });
      profileDetails.followers = data.data.userFollowers;
      profileDetails.connectionLevel = data.data.connectionLevel;
      dispatch(updateFollowingList(data.data.myFollowing));
      setLoading(false);
      return data;
    } catch (error) {
      console.log({ error });
      setLoading(false);
      return error;
    }
  };

  return (
    <Box
      width={"100%"}
      rounded={{ base: "md", lg: "lg" }}
      bgColor={"white"}
      p={4}
      shadow="sm"
      border="1px solid #dcdcdc"
    >
      <Flex
        width={"100%"}
        alignItems={"center"}
        justifyContent={{ base: "space-between", md: "center" }}
        position={{ md: "relative" }}
      >
        {/* <Flex width={"150px"} display={{ base: "none", md: "flex" }} /> */}
        <Flex
          //   width={"150px"}
          mt={{ base: "-60px", md: "-55px" }}
          p={{ base: "1", lg: "1.5" }}
          bgColor={"pink.500"}
          rounded="full"
        >
          <Avatar
            src={profileDetails?.avatar}
            size={{ base: "lg", md: "2xl" }}
          />
        </Flex>
        <Flex
          gap={4}
          position={{ md: "absolute" }}
          top={{ md: "0" }}
          right={{ md: "0" }}
        >
          {isCurrentUser() ? (
            <Link
              textDecoration={"none"}
              href={"/profile/settings"}
              _hover={{
                textDecoration: "none",
              }}
            >
              <Button variant={"solid"} colorScheme="blue">
                Edit Profile
              </Button>
            </Link>
          ) : (
            <>
              {profileDetails?.connectionLevel === 1 ||
                (profileDetails?.connectionLevel === 2 && (
                  <Button
                    variant={"solid"}
                    colorScheme="blue"
                    onClick={unfollow}
                    isLoading={loading}
                  >
                    Unfollow
                  </Button>
                ))}

              {profileDetails?.connectionLevel === 3 && (
                <Button
                  variant={"solid"}
                  colorScheme="blue"
                  onClick={follow}
                  isLoading={loading}
                >
                  Follow Back
                </Button>
              )}

              {profileDetails?.connectionLevel === 4 && (
                <Button
                  variant={"solid"}
                  colorScheme="blue"
                  onClick={follow}
                  isLoading={loading}
                >
                  Follow
                </Button>
              )}

              {!userProfile && (
                <Link
                  textDecoration={"none"}
                  href={`/auth/login?redirect=/profile/${username}`}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Button
                    variant={"solid"}
                    colorScheme="blue"
                    onClick={follow}
                    isLoading={loading}
                  >
                    Follow
                  </Button>
                </Link>
              )}
            </>
          )}
        </Flex>
      </Flex>
      <Flex
        width={"100%"}
        mt={4}
        gap={3}
        direction="column"
        alignItems={{ base: "flex-start", md: "center" }}
        px={{ base: "none", md: "10%" }}
      >
        <Heading>{profileDetails?.name}</Heading>
        <Text textAlign={{ base: "left", md: "center" }}>
          {profileDetails?.bio}
        </Text>
        <Flex flexWrap={"wrap"} gap={8}>
          <Flex alignItems={"center"} gap="3" color="grey" fontWeight="medium">
            <Icon as={FaBirthdayCake} />
            <Text textAlign={{ base: "left", md: "center" }}>
              Joined on {formatDate(profileDetails?.createdAt)}
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap="3" color="grey" fontWeight="medium">
            <Icon as={FaEnvelope} />
            <Text textAlign={{ base: "left", md: "center" }}>
              {profileDetails?.email}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex display={{ md: "none" }}>
        <ProdileUserMoreInfo profileDetails={profileDetails} />
      </Flex>
    </Box>
  );
}

export default ProfileUserInfo;
