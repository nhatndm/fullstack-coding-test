import { Container } from "@chakra-ui/react";

// INTERFACE
import { IProps } from "./index.interface";

// STYLE
import styles from "styles/Home.module.css";

const CustomContainer = ({ children }: IProps) => {
  return <Container className={styles.contentcontainer}>{children}</Container>;
};

export default CustomContainer;
