import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "../components/DynamicText";

import { Flex, Center, Input, Box } from "@chakra-ui/react";

const Home = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Flex className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box width="20rem" className={styles.main}>
        <Center flex={1} flexDirection="column">
          <DynamicText />
          <Input marginTop={15} variant="outline" onChange={onChange} />
        </Center>
      </Box>
    </Flex>
  );
};

export default Home;
