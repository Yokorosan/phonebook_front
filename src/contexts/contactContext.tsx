import { IChildren } from "@/types";
import { createContext } from "react";

interface ContactProviderData {}

const ContactContext = createContext<ContactProviderData>(
  {} as ContactProviderData
);

export const ContactProvider = ({ children }: IChildren) => {
  return (
    <ContactContext.Provider value={{}}> {children}</ContactContext.Provider>
  );
};
