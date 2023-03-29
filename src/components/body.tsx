import { Box, Center, Flex, Text } from "@chakra-ui/react";
import LoginForm from "./loginform";
import ModalRegisterForm from "./modalregisterform";

const Body = () => {
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
      </Flex>
    </Center>
  );
};

export default Body;
