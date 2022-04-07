import React from 'react'
import { UserContextProvider } from '../hooks/authUser'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from "../utils/initApollo"

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import utils from '@tailwindcss/typography/src/utils'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  fonts: {
    heading: "Poppins",
    body: "Work Sans",
  },
}
const theme = extendTheme({ colors });
const mintbaseClient = createApolloClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={'dark'}>
      <UserContextProvider>
        <ApolloProvider client={mintbaseClient}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </UserContextProvider>
    </main>
  )
}
