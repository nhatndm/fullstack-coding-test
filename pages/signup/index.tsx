import { Flex, Box, useToast } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";

// CONTAINER
import AuthForm from "container/Auth";

// STYLE
import styles from "styles/Home.module.css";

// INTERFACE
import { User } from "model/User";

// FIREBASE
import firebase from "config/firebase";

const SignUp = () => {
  const toast = useToast();
  const router = useRouter();

  const onSubmit = async (user: User, formilkHelper: FormikHelpers<User>) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      formilkHelper.setSubmitting(false);

      toast({
        position: "top-right",
        title: "Account created.",
        description:
          "We've created your account for you. Please login to start using App!",
        status: "success",
        isClosable: true,
        onCloseComplete: () => {
          router.push("/signin");
        },
      });
    } catch (error) {
      formilkHelper.setFieldError("email", "Email has been registered before!");
    }
  };

  return (
    <Flex className={styles.container} flexDirection="row">
      <Box className={styles.box}>
        <AuthForm isLogin={false} formTitle="Sign Up" onSubmit={onSubmit} />
      </Box>
    </Flex>
  );
};

export default SignUp;
