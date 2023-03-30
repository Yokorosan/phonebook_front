import Body from "@/components/body";
import Header from "@/components/header";
import { useUser } from "@/contexts/userContext";
import { Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { useEffect } from "react";

const Dashboard = () => {
  const { profileUser, user, contact } = useUser();

  useEffect(() => {
    profileUser();
  }, []);
  return (
    <>
      <Header isLogged={true} name={user === null ? <Spinner /> : user.name} />
      <Body isLogged={true} user={user!} contacts={contact} />
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (!cookies["phonebook.token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
