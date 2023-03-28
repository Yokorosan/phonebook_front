import { IChildren } from "@/types";
import { createContext } from "react";

interface UserProviderData {}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: IChildren) => {
  return <UserContext.Provider value={{}}> {children}</UserContext.Provider>;
};
