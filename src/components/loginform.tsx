import { IUserLogin } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUserSchema as schema } from "@/schemas";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/authContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({ resolver: yupResolver(schema) });
  const { login } = useAuth();
  const onFormSubmit = (formData: IUserLogin) => {
    login(formData);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Center display={"flex"} flexDirection={"column"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          required
          focusBorderColor="blue.300"
          errorBorderColor="red.300"
          bg={"white"}
          type="text"
          _placeholder={{ opacity: 1, color: "black" }}
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
            bg={"white"}
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText>{errors.password?.message}</FormHelperText>
      </FormControl>
      <Button
        width="150px"
        marginBottom={"5px"}
        variant="default"
        onClick={handleSubmit(onFormSubmit)}
        _hover={{
          bg: "blue.700",
        }}
      >
        Login
      </Button>
    </Center>
  );
};

export default LoginForm;
