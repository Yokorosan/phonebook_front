import { IHeaderProps } from "@/types";
import { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import AboutModal from "../modals/modalabout";
import EditFormModal from "../forms/editform";
import { useUser } from "@/contexts/userContext";

const Header = ({ name, isLogged = false }: IHeaderProps) => {
  const { setUser } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();
  const goToHome = () => {
    router.push("/", undefined);
  };
  const logout = () => {
    destroyCookie(null, "phonebook.token");
    destroyCookie(null, "phonebook.user");
    router.push("/");
    setUser(null);
  };

  return (
    <>
      <Box bg={"gray.400"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Text
                fontWeight={"bold"}
                fontSize={20}
                color={"white"}
                marginLeft={"5px"}
                marginRight={"5px"}
              >
                PhoneBook
              </Text>
            </Box>
            <HStack
              color={"white"}
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Button variant={"default"} onClick={() => goToHome()}>
                Home
              </Button>
              <AboutModal />
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {isLogged ? (
              <>
                <Menu>
                  <MenuButton
                    as={Box}
                    marginRight={"10px"}
                    fontWeight={"bold"}
                    fontSize={"18px"}
                  >
                    {name}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => setOpenEdit(true)}>Edit</MenuItem>
                    <MenuItem onClick={() => logout()}>Sair</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : null}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Button variant={"default"} onClick={() => goToHome()}>
                Home
              </Button>
              <AboutModal />
            </Stack>
          </Box>
        ) : null}
      </Box>

      {openEdit ? (
        <EditFormModal setEditOpen={setOpenEdit} status={openEdit} />
      ) : null}
    </>
  );
};

export default Header;
