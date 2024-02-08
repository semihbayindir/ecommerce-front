import { CartContextProvider } from "@/components/CartContext";
import { SessionProvider } from "next-auth/react";
import { createGlobalStyle } from "styled-components"
import "styles/styles.css";


const GlobalStyles = createGlobalStyle`

`;


export default function App({Component, pageProps: {session, ...pageProps }}) {
  return(
    <>
      <GlobalStyles global={true}/>
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
  </>
  );
}
