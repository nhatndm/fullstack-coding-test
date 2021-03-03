import { Flex, Box } from "@chakra-ui/react";
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
        <AuthForm formTitle="Sign Up" onSubmit={(user) => console.log(user)} />
      </Box>
    </Flex>
  );
};

export default Login;
