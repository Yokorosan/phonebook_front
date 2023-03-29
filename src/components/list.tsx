import { useContact } from "@/contexts/contactContext";
import {
  Box,
  Button,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import EditContactForm from "./editContact";

const List = ({ array }: any) => {
  const { deleteContact } = useContact();
  return (
    <>
      {array.length > 0 ? (
        <UnorderedList
          display={"flex"}
          flexDirection={"column"}
          gap={"5px"}
          maxH={{ base: "200px", md: "400px" }}
          overflowX="auto"
        >
          {array.map((element: any, index: number) => {
            return (
              <ListItem
                key={index}
                display={"flex"}
                w={{ base: "270px", md: "400px" }}
                justifyContent={"space-between"}
                flexDirection={{ base: "column", md: "row" }}
                alignItems={"center"}
                border={"1px"}
                borderColor={"black"}
                rounded={"5px"}
                padding={"5px"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"5px"}
                  w={"220px"}
                  marginLeft={"5px"}
                  marginBottom={{ base: "5px", md: "0px" }}
                >
                  <Text>
                    <b>Name: </b>
                    {element.name}
                  </Text>
                  <Text>
                    <b>Email: </b>
                    {element.email}
                  </Text>
                  <Text>
                    <b>Phone: </b>
                    {element.phone}
                  </Text>
                  <Text>
                    <b>Registered On: </b>
                    {element.createdAt.split("T")[0]}
                  </Text>
                </Box>
                <Flex
                  direction={{ base: "row", md: "column" }}
                  justifyContent={"center"}
                  gap={"7px"}
                  w={{ base: "270px", md: "100px" }}
                  marginBottom={{ base: "5px", md: "0px" }}
                >
                  <EditContactForm user={element} />
                  <Button
                    w={{ base: "100px", md: "100px" }}
                    onClick={() => deleteContact(element.id)}
                  >
                    Delete
                  </Button>
                </Flex>
              </ListItem>
            );
          })}
        </UnorderedList>
      ) : (
        <Text>Você ainda não tem contatos adicionados</Text>
      )}
    </>
  );
};

export default List;
