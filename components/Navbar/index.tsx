import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";

// STYLE
import styles from "styles/Home.module.css";

const NavLink = ({ children, ...props }) => (
  <Link px={2} color="black" {...props}>
    {children}
  </Link>
);

const NavBar = () => {
  const [session, loading] = useSession();
  const route = useRouter();

  if (route.pathname === "/signin" || route.pathname === "/signup" || !session)
    return null;

  return (
    <Flex className={styles.navbar}>
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <NavLink color="black" onClick={() => route.push("/")}>
          Home
        </NavLink>
      </Flex>
      <Box>
        <NavLink onClick={() => route.push("/blog")}>Blog</NavLink>
        <NavLink onClick={() => signOut()}>Sign Out</NavLink>
      </Box>
    </Flex>
  );
};

export default NavBar;
