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
import { validatePassword } from "../../utils/formValidator";
import { resetPasswordApi } from "../../services/authApis";
import UseNavigate from "../../hooks/useNavigate";
import {UseQuery} from "../../hooks/useQuery";

function ResetPassword({ resetToken }) {
  const navigate = UseNavigate();
  const query = UseQuery();
  const toast = useToast()
  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      onSubmit={async (values, actions) => {
        try {
          if (values.password != values.confirmPassword) {
            actions
              .setErrors({ confirmPassword: "Password does not match" })
              .setSubmitting(false);
            return;
          }
          const {data} = await resetPasswordApi({
            ...values,
            token: resetToken,
            confirmPassword: null,
          });
          // Redirect
          navigate(`auth/login?redirect=${query}`);

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
          <Field name="password" validate={validatePassword}>
            {({ field, form }) => (
              <FormControl my='4'
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel>Password</FormLabel>
                <Input {...field} type="password" placeholder="Password" />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="confirmPassword" validate={validatePassword}>
            {({ field, form }) => (
              <FormControl my='4'
                isInvalid={
                  form.errors.confirmPassword && form.touched.confirmPassword
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
  );
}

export default ResetPassword;
