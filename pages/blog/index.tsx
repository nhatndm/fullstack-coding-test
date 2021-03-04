import { useEffect, useState, useCallback, useRef } from "react";
import {
  Heading,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";

// HOOK
import { withAuthenticated } from "hooks/withAuthenticated";

// COMPONENT
import CustomContainer from "components/Container";
import Blogs from "components/Blogs";

// AXIOS
import { callApi } from "config/axios";

// CONSTANT
import APP_ENV from "constant";

// MODEL
import { Blog } from "model/Blog";

const BlogComponent = (props) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blog, setBlog] = useState<Blog>(null);
  const finalRef = useRef();

  useEffect(() => {
    async function getAllBlog() {
      const response = await callApi<Blog[]>({
        method: "GET",
        token: props.user.accessToken,
        url: APP_ENV.URL.POST.GET_POST,
      });

      if (response) {
        setBlogs(response.data);
      }
    }

    getAllBlog();
  }, []);

  const onItemClick = useCallback(
    (blog) => {
      setBlog(blog);
    },
    [blogs]
  );

  const onCloseModal = useCallback(() => {
    setBlog(null);
  }, []);

  return (
    <CustomContainer>
      <Heading as="h3" marginTop={20} marginBottom={10}>
        Blog
      </Heading>

      <Stack spacing={5}>
        <Blogs blogs={blogs} onItemClick={onItemClick} />
      </Stack>

      {blog && (
        <Modal finalFocusRef={finalRef} isOpen={!!blog} onClose={onCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{blog.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image borderRadius="lg" width={40} src={blog.img_url} alt="" />

              <Text mt={5}>{blog.content}</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </CustomContainer>
  );
};

export default withAuthenticated(BlogComponent);
