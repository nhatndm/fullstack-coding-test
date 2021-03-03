import { useRef } from "react";
import Head from "next/head";
import styles from "styles/Home.module.css";

// COMPONENT
import { Flex, Center, Input, Box } from "@chakra-ui/react";
import DynamicText, { IRef } from "components/Dynamic";

// HOOK
import { withAuthenticated } from "hooks/withAuthenticated";

const Home = (props) => {
  const dynamicRef = useRef<IRef>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!dynamicRef.current) {
      throw new Error("Please assign dynamic's ref into Dynamic component");
    }

    if (dynamicRef.current) {
      dynamicRef.current.onChange(e.target.value);
    }
  };

  return (
    <Flex className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box width="20rem" className={styles.main}>
        <Center flex={1} flexDirection="column">
          <DynamicText ref={dynamicRef} />
          <Input marginTop={15} variant="outline" onChange={onChange} />
        </Center>
      </Box>
    </Flex>
  );
};

export default withAuthenticated(Home);
