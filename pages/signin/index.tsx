import { Flex, Box, Center } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

// CONTAINER
import AuthForm from "container/Auth";

// STYLE
import styles from "styles/Home.module.css";

const Login = () => {
  return (
    <Flex
      className={styles.container}
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
    >
      <Box className={styles.box}>
        <AuthForm
          isLogin
          formTitle="Sign In"
          onSubmit={(user) => console.log(user)}
        />
      </Box>
    </Flex>
  );
};

export default Login;
