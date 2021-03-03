import { Flex, Box } from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";

// CONTAINER
import AuthForm from "container/Auth";

// STYLE
import styles from "styles/Home.module.css";

// MODEL
import { User } from "model/User";

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (
    user: User,
    formilHelper: FormikHelpers<User>
  ) => {
    const response: any = await signIn("email", {
      email: user.email,
      password: user.password,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    });

    if (response.ok) {
      return router.push("/");
    }

    formilHelper.setFieldError("email", "Please double-check email");
    formilHelper.setFieldError("password", "Please double-check email");
  };

  return (
    <Flex className={styles.container} flexDirection="row">
      <Box className={styles.box}>
        <AuthForm isLogin formTitle="Sign In" onSubmit={handleSubmit} />
      </Box>
    </Flex>
  );
};

export default Login;
