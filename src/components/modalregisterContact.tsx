import { IRegisterContact } from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerContactSchema as schema } from "@/schemas";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContact } from "@/contexts/contactContext";

const ModalRegisterContact = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterContact>({ resolver: yupResolver(schema) });
  const { registerContact } = useContact();
  const opening = () => {
    onOpen();
    router.push("/dashboard", "/contacts", { shallow: true });
  };

  const closing = () => {
    onClose();
    router.push("/dashboard", undefined, { shallow: true });
  };
  const onFormSubmit = (formData: IRegisterContact) => {
    registerContact(formData, closing);
  };

  return (
    <>
      <Button width="200px" variant="default" onClick={opening}>
        Register new Contact
      </Button>

      <Modal isOpen={isOpen} onClose={closing}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>Register a new Contact</ModalHeader>
          <ModalBody pb={2}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="text"
                {...register("name")}
              />
              <FormHelperText>{errors.name?.message}</FormHelperText>
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="text"
                {...register("email")}
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>

            <FormControl id="phone" isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="text"
                {...register("phone")}
              />
              <FormHelperText>{errors.phone?.message}</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              variant={"default"}
              onClick={handleSubmit(onFormSubmit)}
              _hover={{
                bg: "blue.700",
              }}
            >
              Register
            </Button>
            <Button size="lg" onClick={closing}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRegisterContact;
