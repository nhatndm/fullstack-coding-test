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

interface IProps {
  blog: Blog;
  modalStatus: boolean;
  setModalStatus: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  blog,
  modalStatus,
  setModalStatus,
  onConfirm,
  onCancel,
}: IProps) => {
  return (
    <Modal isOpen={modalStatus} onClose={setModalStatus}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {blog.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure to delete this blog ?</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onConfirm}>
            Confirm
          </Button>
          <Button colorScheme="teal" onClick={onCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
