import api from "@/services/api";
import { IChildren, IRegisterUser } from "@/types";
import { Box, useToast } from "@chakra-ui/react";
import { createContext, useContext } from "react";

interface UserProviderData {
  registerUser: (userData: IRegisterUser, onClose: () => void) => void;
}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: IChildren) => {
  const toast = useToast();
  const registerUser = async (userData: IRegisterUser, onClose: () => void) => {
    try {
      const resp = await api.post("/users/register/", userData);
      toast({
        title: "sucess",
        variant: "solid",
        position: "top-right",
        isClosable: true,
        render: () => (
          <Box
            color={"gray.50"}
            p={3}
            bg={"green.600"}
            fontWeight={"bold"}
            borderRadius={"md"}
          >
            Register Successfull!!
          </Box>
        ),
      });
      onClose();
    } catch {
      toast({
        title: "error",
        variant: "solid",
        position: "top-right",
        isClosable: true,
        render: () => (
          <Box
            color={"gray.50"}
            p={3}
            bg={"red.600"}
            fontWeight={"bold"}
            borderRadius={"md"}
          >
            Something went wrong!
          </Box>
        ),
      });
    }
  };
  return (
    <UserContext.Provider
      value={{
        registerUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
