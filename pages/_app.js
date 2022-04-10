import React from 'react'
import { UserContextProvider } from '../hooks/authUser'
// import { ThemeProvider } from "next-themes";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from "../utils/initApolloMintbase"

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

// 2. Extend the theme to include custom colors, fonts, etc
const brand = {
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  colors: {
    lightblack: "#1E2021",
    gray: {
      800: "#131414",
    },
    white: "#e5e5e5"
  }
}
const theme = extendTheme(brand);
const mintbaseClient = createApolloClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={'dark'}>
      <UserContextProvider>
        <ApolloProvider client={mintbaseClient}>
          <ChakraProvider theme={theme}>
            {/* <ThemeProvider attribute="class"> */}
              <Component {...pageProps} />
            {/* </ThemeProvider> */}
          </ChakraProvider>
        </ApolloProvider>
      </UserContextProvider>
    </main>
  )
}
