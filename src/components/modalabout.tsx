import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";

const AboutModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const opening = () => {
    onOpen();
    router.push("/", "/about", { shallow: true });
  };

  const closing = () => {
    onClose();
    router.push("/", undefined, { shallow: true });
  };
  return (
    <>
      <Button variant={"default"} onClick={() => opening()}>
        About
      </Button>

      <Modal isOpen={isOpen} onClose={() => closing()}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>
            <Box>
              <Flex>
                <Text>ABOUT US</Text>
                <ModalCloseButton />
              </Flex>
            </Box>
          </ModalHeader>
          <ModalBody>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
              sed aut. Nostrum deserunt vel aliquid consequuntur suscipit
              inventore soluta esse quaerat sed, exercitationem a dolore
              corporis omnis nobis laboriosam dolor.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AboutModal;
