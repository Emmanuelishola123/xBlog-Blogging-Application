import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../utils/formValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmail,
  updatePassword,
  updateUserDetails,
  updateUsername,
} from "../services/userApis";
import { updateProfile } from "../redux/userReducer";
import { authLogin } from "../redux/authReducer";
import { uploadSingleFile } from "../services/uploadApis";

function SettingPage() {
  const { userProfile } = useSelector((state) => state.userReducer);
  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);
  const avaterRef = useRef(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const uploadAvatar = async (e) => {
    e.preventDefault();
    const img = avaterRef.current.files[0];
    const file = URL.createObjectURL(img);
    setImage(img);
    setAvatar(file);
  };

  return (
    <Box width="100%" p="10px">
      <Flex
        mx="auto"
        gap="8"
        flexDirection={"column"}
        width="100%"
        maxWidth="850px"
      >
        {/* USER */}
        <Box width="100%" shadow={"md"} p="20px" rounded="lg">
          <Box mb="4">
            <Text fontSize={"3xl"} fontWeight="bold">
              User
            </Text>
          </Box>
          <Formik
            initialValues={{
              name: userProfile?.name || "",
              bio: userProfile?.bio || "",
              works: userProfile?.works || "",
              learning: userProfile?.learning || "",
              skills: userProfile?.skills || "",
            }}
            onSubmit={async (values, actions) => {
              try {
                let dp = null;
                if (image) {
                  let fileForm = new FormData();
                  fileForm.append("file", image);

                  let { data } = await uploadSingleFile(fileForm);
                  dp = data;
                }

                const data = await updateUserDetails({
                  ...values,
                  avatar: dp || undefined,
                  _id: userProfile._id,
                });

                dispatch(authLogin(data.data.token));
                dispatch(updateProfile({ ...data.data, token: undefined }));

                toast({
                  title: data.message,
                  variant: "success",
                  isClosable: true,
                  position: "left-accent",
                });
                return;
              } catch (error) {
                console.log({ error });
                toast({
                  title: error.message,
                  variant: "error",
                  isClosable: true,
                  position: "left-accent",
                });
              }
            }}
          >
            {(props) => (
              <Form gap="4">
                <Field name="avatar">
                  {({ field, form }) => (
                    <FormControl my="4">
                      <Box
                        borderRadius="full"
                        width="120px"
                        height={"120px"}
                        position="relative"
                      >
                        <Avatar
                          borderRadius="full"
                          boxSize="100%"
                          src={avatar || userProfile?.avatar || ""}
                        />
                        <Flex
                          border="3px solid white"
                          cursor={"pointer"}
                          justifyContent={"center"}
                          alignItems="center"
                          bg="white"
                          position={"absolute"}
                          right="-10px"
                          bottom={"15px"}
                          zIndex="100000"
                          shadow="sm"
                          rounded="full"
                          width={"40px"}
                          height="40px"
                          p="2"
                          onClick={() => avaterRef.current.click()}
                        >
                          <FaCamera rounded="full" size={"100%"} />
                        </Flex>
                      </Box>
                      <Input
                        onChange={uploadAvatar}
                        ref={avaterRef}
                        type="file"
                        hidden
                      />
                    </FormControl>
                  )}
                </Field>

                <Field name="name" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl
                      my="4"
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel>Name</FormLabel>
                      <Input {...field} type="text" placeholder="name" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="bio">
                  {({ field, form }) => (
                    <FormControl my="4">
                      <FormLabel>Bio</FormLabel>
                      <Input {...field} type="text" placeholder="bio" />
                      <FormErrorMessage>{form.errors.bio}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="works">
                  {({ field, form }) => (
                    <FormControl my="4">
                      <FormLabel>Works</FormLabel>
                      <Input {...field} type="text" placeholder="works" />
                      <FormErrorMessage>{form.errors.works}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="learning">
                  {({ field, form }) => (
                    <FormControl my="4">
                      <FormLabel>Currently Learning</FormLabel>
                      <Input
                        {...field}
                        type="text"
                        placeholder="What i am currently learning"
                      />
                      <FormErrorMessage>
                        {form.errors.learning}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="skills">
                  {({ field, form }) => (
                    <FormControl my="4">
                      <FormLabel>Skills</FormLabel>
                      <Input
                        {...field}
                        type="text"
                        placeholder="my current skills set"
                      />
                      <FormErrorMessage>{form.errors.skills}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  mt={4}
                  colorScheme="blue"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Update Profile
                </Button>
              </Form>
            )}
          </Formik>
        </Box>

        {/* USERNAME */}
        <Box width="100%" shadow={"md"} p="20px" rounded="lg">
          <Box mb="4">
            <Text fontSize={"3xl"} fontWeight="bold">
              Username
            </Text>
          </Box>
          <Formik
            initialValues={{
              username: userProfile?.username || "",
            }}
            onSubmit={async (values, actions) => {
              try {
                const { data } = await updateUsername({
                  ...values,
                  _id: userProfile._id,
                });

                dispatch(authLogin(data.token));
                dispatch(updateProfile({ ...data, token: undefined }));

                return toast({
                  title: data.message,
                  variant: "success",
                  isClosable: true,
                  position: "left-accent",
                });
              } catch (error) {
                toast({
                  title: error.message,
                  variant: "error",
                  isClosable: true,
                  position: "left-accent",
                });
              }
            }}
          >
            {(props) => (
              <Form gap="4">
                <Field name="username" validate={validateUsername}>
                  {({ field, form }) => (
                    <FormControl
                      my="4"
                      isInvalid={form.errors.username && form.touched.username}
                    >
                      <FormLabel>Username</FormLabel>
                      <Input {...field} type="text" placeholder="Username" />
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="blue"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Update Username
                </Button>
              </Form>
            )}
          </Formik>
        </Box>

        {/* EMAIL */}
        <Box width="100%" shadow={"md"} p="20px" rounded="lg">
          <Box mb="4">
            <Text fontSize={"3xl"} fontWeight="bold">
              Email
            </Text>
          </Box>
          <Formik
            initialValues={{
              email: userProfile?.email || "",
            }}
            onSubmit={async (values, actions) => {
              try {
                const { data } = await updateEmail({
                  ...values,
                  _id: userProfile._id,
                });
                dispatch(authLogin(data.data.token));
                dispatch(updateProfile({ ...data.data, token: undefined }));
                return toast({
                  title: data.message,
                  variant: "success",
                  isClosable: true,
                  position: "left-accent",
                });
              } catch (error) {
                toast({
                  title: error.message,
                  variant: "error",
                  isClosable: true,
                  position: "left-accent",
                });
              }
            }}
          >
            {(props) => (
              <Form gap="4">
                <Field name="email" validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl
                      my="4"
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel>Email</FormLabel>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email Address"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="blue"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Update Email
                </Button>
              </Form>
            )}
          </Formik>
        </Box>

        {/* PASSWORD */}
        <Box width="100%" shadow={"md"} p="20px" rounded="lg">
          <Box mb="4">
            <Text fontSize={"3xl"} fontWeight="bold">
              Update Password
            </Text>
          </Box>
          <Formik
            initialValues={{
              currentPassword: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={async (values, actions) => {
              try {
                if (values.password !== values.confirmPassword) {
                  actions
                    .setErrors({ confirmPassword: "Password does not match" })
                    .setSubmitting(false);
                  return;
                }
                const { data } = await updatePassword({
                  ...values,
                  confirmPassword: null,
                  _id: userProfile?._id,
                });
                // // reset form
                // actions.resetForm();
                return toast({
                  title: data.message,
                  variant: "success",
                  isClosable: true,
                  position: "left-accent",
                });
              } catch (error) {
                toast({
                  title: error.message,
                  variant: "error",
                  isClosable: true,
                  position: "left-accent",
                });
              }
            }}
          >
            {(props) => (
              <Form gap="4">
                {/* <Flex gap='4'> */}

                <Field name="currentPassword">
                  {({ field, form }) => (
                    <FormControl
                      my="4"
                      isInvalid={
                        form.errors.currentPassword &&
                        form.touched.currentPassword
                      }
                    >
                      <FormLabel>Current Password</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Current Password"
                      />
                      <FormErrorMessage>
                        {form.errors.currentPassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl
                      my="4"
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel>Password</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="confirmPassword">
                  {({ field, form }) => (
                    <FormControl
                      my="4"
                      isInvalid={
                        form.errors.confirmPassword &&
                        form.touched.confirmPassword
                      }
                    >
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                      />
                      <FormErrorMessage>
                        {form.errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                {/* </Flex> */}

                <Button
                  mt={4}
                  colorScheme="blue"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Update Password
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Box>
  );
}

export default SettingPage;
