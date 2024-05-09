import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { validateEmail } from "../../utils/formValidator";
import { forgotPasswordApi } from "../../services/authApis";

function ForgetPasswordForm() {
  const toast = useToast()
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values, actions) => {
        try {
          const { data } = await forgotPasswordApi({ ...values });
          // Reset form
          actions.resetForm();

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
        <Form>
          <Field name="email" validate={validateEmail}>
            {({ field, form }) => (
              <FormControl my='4' isInvalid={form.errors.email && form.touched.email}>
                <FormLabel>Email</FormLabel>
                <Input {...field} type="email" placeholder="Email Address" />
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
            Send Password Reset Link
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ForgetPasswordForm;
