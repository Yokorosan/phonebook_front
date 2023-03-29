import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface iPassWord {
  register: UseFormRegister<FieldValues>;
  type: string;
}
export const Password = ({ register, type }: iPassWord) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  return (
    <>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
        <Input
          required
          focusBorderColor="blue.300"
          errorBorderColor="red.300"
          type={showPassword ? "text" : "password"}
          {...register(type)}
          onChange={(e) => setInputPassword(e.target.value)}
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
    </>
  );
};
