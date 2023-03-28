import { IRegisterUser } from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUserSchema as schema } from "@/schemas";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const ModalRegisterForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUser>({ resolver: yupResolver(schema) });

  const onFormSubmit = (formData: IRegisterUser) => {
    delete formData.confirmPassword;
    console.log(formData);
  };

  return (
    <>
      <Button variant="default" onClick={onOpen}>
        Register
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>Crie sua conta</ModalHeader>
          <ModalBody pb={2}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="name"
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
                type="email"
                {...register("email")}
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  required
                  focusBorderColor="blue.300"
                  errorBorderColor="red.300"
                  type={showPassword ? "text" : "password"}
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

            <FormControl id="confirmpPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  required
                  focusBorderColor="blue.300"
                  errorBorderColor="red.300"
                  type={showConfPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowConfPassword(
                        (showConfPassword) => !showConfPassword
                      )
                    }
                  >
                    {showConfPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
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
            <Button size="lg" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRegisterForm;
