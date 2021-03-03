import { useMemo, useCallback } from "react";
import { Formik, Field, Form, FormikProps } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as yup from "yup";

// INTERFACE
import { User } from "model/User";

// PROPS
import { IProps } from "./index.interface";

const AuthForm = ({ onSubmit, formTitle, isLogin }: IProps) => {
  const router = useRouter();

  const initalValue: User = {
    email: "",
    password: "",
  };

  const validationSchema = useMemo(
    () =>
      yup.object<User>({
        email: yup
          .string()
          .email("Email is wrong format")
          .required("Email is required"),
        password: yup.string().trim().required("Password is required"),
      }),
    []
  );

  const navigateScreen = useCallback(() => {
    if (isLogin) {
      return router.push("/signup");
    }

    return router.push("/signin");
  }, [isLogin]);

  return (
    <Formik
      initialValues={initalValue}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ touched, errors, isSubmitting }: FormikProps<User>) => (
        <Form>
          <Stack spacing={5}>
            <Text fontSize="2xl">{formTitle}</Text>
            <Field name="email">
              {({ field }) => (
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} placeholder="Email" />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <FormControl isInvalid={errors.password && touched.password}>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} type="password" placeholder="Password" />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
              Submit
            </Button>
            <Center>
              <Text
                type="button"
                as="button"
                fontSize="sm"
                onClick={navigateScreen}
              >
                {isLogin ? "Not a member?" : "Have an account already?"}
              </Text>
            </Center>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
