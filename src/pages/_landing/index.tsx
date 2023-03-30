import Body from "@/components/body";
import Header from "@/components/header";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useEffect } from "react";

const Landing = () => {
  useEffect(() => {
    checkCookie();
  }, []);
  const cookies = nookies.get();
  const router = useRouter();
  const checkCookie = () => {
    if (cookies["phonebook.token"]) {
      router.push("/dashboard", undefined);
    }
  };

  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default Landing;
