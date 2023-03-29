import { IUserEdit } from "@/types";
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
import { useUser } from "@/contexts/userContext";

const EditFormModal = ({ setEditOpen, status }: any) => {
  const { user, editUser, deleteUser } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserEdit>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user!.name,
      email: user!.email,
      phone: user!.phone,
    },
  });

  const onFormSubmit = (formData: any) => {
    for (let element in formData) {
      if (
        formData[element] === "" ||
        formData[element] === (user! as any)[`${element}`]
      ) {
        delete formData[element];
      }
    }
    editUser(formData);
    // }
  };
  const closing = () => {
    onClose();
    setEditOpen(false);
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Modal isOpen={status} onClose={closing}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>Edit User</ModalHeader>
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

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  focusBorderColor="blue.300"
                  errorBorderColor="red.300"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>{errors.password?.message}</FormHelperText>
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
            <Button width="150px" variant="default" onClick={deleteUser}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditFormModal;
