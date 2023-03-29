import { AuthProvider } from "@/contexts/authContext";
import { ContactProvider } from "@/contexts/contactContext";
import { UserProvider } from "@/contexts/userContext";
import customTheme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <UserProvider>
        <AuthProvider>
          <ContactProvider>
            <Component {...pageProps} />
          </ContactProvider>
        </AuthProvider>
      </UserProvider>
    </ChakraProvider>
  );
}
