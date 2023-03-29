import { IContactEdit } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { editUserSchema as schema } from "@/schemas";
import { useForm } from "react-hook-form";
import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  ModalFooter,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useContact } from "@/contexts/contactContext";

const EditContactForm = ({ user }: any) => {
  const { editContact } = useContact();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactEdit>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user!.name,
      email: user!.email,
      phone: user!.phone,
    },
  });
  const closing = () => {
    onClose();
  };

  const onFormSubmit = (formData: any) => {
    for (let element in formData) {
      if (
        formData[element] === "" ||
        formData[element] === (user! as any)[`${element}`]
      ) {
        delete formData[element];
      }
    }
    editContact(user.id, formData, closing);
    // }
  };

  return (
    <>
      <Button
        w={{ base: "100px", md: "100px" }}
        variant="default"
        onClick={onOpen}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={closing}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>Edit Contact</ModalHeader>
          <ModalBody pb={2}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="text"
                {...register("name")}
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="text"
                {...register("email")}
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>

            <FormControl id="phone">
              <FormLabel>phone</FormLabel>
              <Input
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="text"
                {...register("phone")}
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              width="150px"
              variant="default"
              onClick={handleSubmit(onFormSubmit)}
              _hover={{
                bg: "blue.700",
              }}
            >
              Confirm
            </Button>
            <Button width="150px" variant="default" onClick={closing}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditContactForm;
