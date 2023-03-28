import { IHeaderProps } from "@/types";
import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
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
import ModalRegisterForm from "./modalregisterform";
import AboutModal from "./modalabout";

const Links = ["Home"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    textAlign={"center"}
    bg={"white"}
    textColor={"black"}
    _hover={{
      textDecoration: "none",
      bg: "blue.300",
      color: "black",
    }}
    href={"/"}
  >
    {children}
  </Link>
);

const Header = ({ name, isLogged = false }: IHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const goToHome = () => {
    router.push("/", undefined);
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
              <Text fontWeight={"bold"} fontSize={20} color={"white"}>
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
            <>
              <Text color={"white"} paddingRight={2}>
                {name}
              </Text>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  {/* <Avatar size={"sm"} src={avatar} /> */}
                </MenuButton>
                <MenuList bg={"blue.600"}>
                  <MenuItem
                    bg={"blue.600"}
                    color={"white"}
                    // onClick={() => logout()}
                  >
                    Sair
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
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
    </>
  );
};

export default Header;
