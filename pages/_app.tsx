import "styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";

// COMPONENT
import NavBar from "components/Navbar";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <NavBar />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
