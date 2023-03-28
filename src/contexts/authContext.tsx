import { IUserLogin, IChildren } from "@/types";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext } from "react";

interface AuthProviderData {
  login: (userData: IUserLogin) => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: IChildren) => {
  const toast = useToast();
  const router = useRouter();
  const login = (userData: IUserLogin) => {};

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
