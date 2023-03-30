import api from "@/services/api";
import { IChildren, IContactEdit, IRegisterContact } from "@/types";
import { Box, useToast } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import nookies from "nookies";
import { useUser } from "./userContext";

interface ContactProviderData {
  registerContact: (userData: IRegisterContact, onClose: () => void) => void;
  deleteContact: (id: string) => void;
  editContact: (id: string, data: IContactEdit, onClose: () => void) => void;
}

const ContactContext = createContext<ContactProviderData>(
  {} as ContactProviderData
);

export const ContactProvider = ({ children }: IChildren) => {
  const { contact, setContact } = useUser();
  const toast = useToast();
  const registerContact = async (
    userData: IRegisterContact,
    onClose: () => void
  ) => {
    const cookies = nookies.get();
    api.defaults.headers.common.authorization = `Token ${cookies["phonebook.token"]}`;
    try {
      const resp = await api.post("/contacts", userData);
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
            Contact Register Successfull!!
          </Box>
        ),
      });
      setContact([...contact!, resp.data]);
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
  const editContact = async (
    id: string,
    data: IContactEdit,
    onClose: () => void
  ) => {
    const cookies = nookies.get();
    api.defaults.headers.common.authorization = `Token ${cookies["phonebook.token"]}`;
    try {
      const resp = await api.patch(`/contacts/${id}`, data);
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
            Contact Edited!!
          </Box>
        ),
      });
      const newList = contact?.filter((element) => element.id != id);
      setContact([...newList!, resp.data]);
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
  const deleteContact = async (id: string) => {
    const cookies = nookies.get();
    api.defaults.headers.common.authorization = `Token ${cookies["phonebook.token"]}`;
    try {
      await api.delete(`/contacts/${id}`);
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
            Contact Deleted!!
          </Box>
        ),
      });
      const newList = contact?.filter((element) => element.id != id);
      setContact(newList!);
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
    <ContactContext.Provider
      value={{ registerContact, deleteContact, editContact }}
    >
      {" "}
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);
