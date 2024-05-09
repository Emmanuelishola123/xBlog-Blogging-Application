import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { validateEmail } from "../../utils/formValidator";
import { loginApi } from "../../services/authApis";
import UseNavigate from "../../hooks/useNavigate";
import { UseQuery } from "../../hooks/useQuery";
import { useDispatch } from "react-redux";
import { authLogin } from "../../redux/authReducer";
import { updateProfile } from "../../redux/userReducer";
import { toast } from "react-toastify";

function LoginForm() {
  const dispatch = useDispatch();
  const query = UseQuery();
  const navigate = UseNavigate();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, actions) => {
        try {
          const { data } = await loginApi({
            ...values,
          });
          // reset form
          actions.resetForm();
          // save to state and cookie
          dispatch(authLogin(data.data.token));
          dispatch(updateProfile({ ...data.data, token: undefined }));
          navigate(query || "/");
          // toast.success("🦄 Wow so easy!", {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          // });
          return
        } catch (error) {
          console.log({ error });
          // return toast.error(error.message);
          return
        }
      }}
    >
      {(props) => (
        <Form>
          <Field name="email" validate={validateEmail}>
            {({ field, form }) => (
              <FormControl
                my="4"
                isInvalid={form.errors.email && form.touched.email}
              >
                <FormLabel>Email</FormLabel>
                <Input {...field} type="email" placeholder="Email Address" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form }) => (
              <FormControl
                my="4"
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel>Password</FormLabel>
                <Input {...field} type="password" placeholder="Password" />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="blue"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
