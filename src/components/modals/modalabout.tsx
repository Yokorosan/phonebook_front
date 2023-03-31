import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const AboutModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Button variant={"default"} onClick={onOpen}>
        About
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
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
              We are a small company thats bringing a faster and convenient way
              for you to maintain all your contacts near you at all times!!!!
              <br />
              Have a great Day!
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AboutModal;
