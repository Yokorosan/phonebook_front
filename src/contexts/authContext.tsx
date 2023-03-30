import api from "@/services/api";
import { IUserLogin, IChildren } from "@/types";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { createContext, useContext } from "react";

interface AuthProviderData {
  login: (userData: IUserLogin) => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: IChildren) => {
  const toast = useToast();
  const router = useRouter();
  const login = async (userData: IUserLogin) => {
    try {
      const resp = await api.post("/login", userData);

      setCookie(null, "phonebook.token", resp.data.token, {
        maxAge: 60 * 30,
        path: "/",
      });
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
            Login realizado com sucesso !
          </Box>
        ),
      });
      router.push("/dashboard");
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
            Email or Password Incorrect
          </Box>
        ),
      });
    }
  };
  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
