import { IBodyProps, IUserContacts } from "@/types";
import { Search2Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import List from "./list";
import LoginForm from "./loginform";
import ModalRegisterContact from "./modalregisterContact";
import ModalRegisterForm from "./modalregisterform";
import { useUser } from "@/contexts/userContext";
import { useState } from "react";

const Body = ({ user, isLogged = false, contacts }: IBodyProps) => {
  const [filteredContact, setFilteredContact] = useState("");
  const [search, setSearch] = useState("");
  const filterContacts = contacts?.filter((contact) =>
    filteredContact === " "
      ? true
      : contact.name.toLowerCase().includes(filteredContact.toLowerCase())
  );
  const sortedContacts = filterContacts?.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    <Center width={"full"}>
      <Flex
        justifyContent={"center"}
        direction={{ base: "column", md: "row" }}
        alignItems={"center"}
        marginTop="10px"
        w="900px"
        h="630px"
        bg="white.50"
        rounded="10px"
        padding={{ base: "10px", md: "0px" }}
        boxShadow={"black 0px 0px 5px 2px;"}
      >
        {!isLogged ? (
          <>
            <Center
              bg={"gray.500"}
              w={{ base: 300, md: 432 }}
              h={{ base: 300, md: 432 }}
              rounded="10px"
              boxShadow={{
                base: "black 2px -1px 1px 1px",
                md: "black -5px 4px 1px 1px;",
              }}
              borderBottom={{
                base: "1px",
                md: "0",
              }}
              borderRight={{
                base: "0",
                md: "2px",
              }}
              borderColor="black"
            >
              <Text>Seja Bem vindo ao PhoneBook</Text>
            </Center>
            <Center
              bg="gray.500"
              w={{ base: 300, md: 432 }}
              h={{ base: 300, md: 432 }}
              rounded="10px"
              boxShadow={{
                base: "black 2px 1px 1px 1px;",
                md: "black 5px 4px 1px 1px;",
              }}
              borderTop={{
                base: "1px",
                md: "0",
              }}
              borderLeft={{
                base: "0",
                md: "2px",
              }}
              borderColor="black"
              display={"flex"}
              flexDirection={"column"}
            >
              <Text>Login</Text>
              <LoginForm />
              <ModalRegisterForm />
            </Center>
          </>
        ) : (
          <>
            <Center
              bg={"gray.500"}
              w={{ base: 300, md: 432 }}
              h={{ base: 300, md: 432 }}
              rounded="10px"
              boxShadow={{
                base: "black 2px -1px 1px 1px",
                md: "black -5px 4px 1px 1px;",
              }}
              borderBottom={{
                base: "1px",
                md: "0",
              }}
              borderRight={{
                base: "0",
                md: "2px",
              }}
              borderColor="black"
            >
              <Flex direction={"column"} alignItems={"center"} gap={"10px"}>
                <Text>Seja Bem vindo ao seu PhoneBook,</Text>
                {user === null ? (
                  <Spinner />
                ) : (
                  <Text fontWeight={"bold"}>{user!.name}</Text>
                )}
                <InputGroup>
                  <Input
                    type={"text"}
                    placeholder="Search Contacts"
                    textColor={"black"}
                    onChange={(e) => setFilteredContact(e.target.value)}
                    _placeholder={{ opacity: 1, color: "black" }}
                  />
                  <InputRightElement>{<Search2Icon />}</InputRightElement>
                </InputGroup>

                <ModalRegisterContact />
              </Flex>
            </Center>
            <Center
              bg="gray.500"
              w={{ base: 300, md: 432 }}
              h={{ base: 300, md: 432 }}
              rounded="10px"
              boxShadow={{
                base: "black 2px 1px 1px 1px;",
                md: "black 5px 4px 1px 1px;",
              }}
              borderTop={{
                base: "1px",
                md: "0",
              }}
              borderLeft={{
                base: "0",
                md: "2px",
              }}
              borderColor="black"
              display={"flex"}
              flexDirection={"column"}
            >
              <Text>Contacts</Text>
              <List array={sortedContacts} />
            </Center>
          </>
        )}
      </Flex>
    </Center>
  );
};

export default Body;
