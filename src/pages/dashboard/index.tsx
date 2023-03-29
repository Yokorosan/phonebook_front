import Body from "@/components/body";
import Header from "@/components/header";
import { useUser } from "@/contexts/userContext";
import api from "@/services/api";
import { IUserLogged } from "@/types";
import { Spinner } from "@chakra-ui/react";
import { profile } from "console";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useEffect, useState } from "react";

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

// export const getServerSideProps: GetServerSideProps = async () => {
//   let user = {};
//   const cookies = nookies.get();
//   try {
//     api.defaults.headers.common.authorization = `Token ${cookies["phonebook.token"]}`;
//     const profile = await api.get("/users");
//     return {
//       props: {
//         name: profile.data.name,
//       },
//     };
//   } catch {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       },
//     };
//   }
// };

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
