import api from "@/services/api";
import {
  IChildren,
  IRegisterUser,
  IUserContacts,
  IUserEdit,
  IUserLogged,
} from "@/types";
import { Box, useToast } from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import nookies, { destroyCookie } from "nookies";
import { useRouter } from "next/router";

interface UserProviderData {
  registerUser: (userData: IRegisterUser, onClose: () => void) => void;
  user: IUserLogged | null;
  setUser: Dispatch<SetStateAction<IUserLogged | null>>;
  profileUser: () => void;
  editUser: (userData: IUserEdit) => void;
  contact: IUserContacts[] | undefined;
  setContact: Dispatch<SetStateAction<IUserContacts[]>>;
  deleteUser: () => void;
}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<IUserLogged | null>(null);
  const [contact, setContact] = useState<IUserContacts[]>([]);
  const router = useRouter();
  const toast = useToast();

  // useEffect(() => {
  //   profileUser();
  // }, []);

  const registerUser = async (userData: IRegisterUser, onClose: () => void) => {
    try {
      await api.post("/users/register/", userData);
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

  const profileUser = async () => {
    const cookies = nookies.get();
    api.defaults.headers.common.authorization = `Token ${cookies["phonebook.token"]}`;
    try {
      const profile = await api.get("/users");
      setUser(profile.data);
      setContact(profile.data.contacts);
    } catch {
      router.push("/dashboard", undefined);
    }
  };

  const editUser = async (userData: IUserEdit) => {
    const cookies = nookies.get();
    api.defaults.headers.common.authorization = `Token ${cookies["phonebook.token"]}`;
    try {
      const response = await api.patch(`/users/${user!.id}`, userData);
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
            Edit Successfull!!
          </Box>
        ),
      });
      setUser(response.data);
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

  const deleteUser = async () => {
    const cookies = nookies.get();
    api.defaults.headers.common.authorization = `Token ${cookies["phonebook.token"]}`;
    if (confirm("Are u sure u want to delete this account")) {
      try {
        await api.delete(`/users/${user!.id}`);
        router.push("/");
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
              Bye Bye!!
            </Box>
          ),
        });
        destroyCookie(null, "phonebook.token");
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
    }
  };
  return (
    <UserContext.Provider
      value={{
        registerUser,
        setUser,
        user,
        profileUser,
        editUser,
        contact,
        setContact,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
