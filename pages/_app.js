import React from 'react'
import { UserContextProvider } from '../hooks/authUser'
// import { ThemeProvider } from "next-themes";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from '../utils/initApolloMintbase'
import { store } from '../app/store'
import { Provider } from 'react-redux'


import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

// 2. Extend the theme to include custom colors, fonts, etc
const brand = extendTheme({
    initialColorMode: 'dark',
    fonts: {
        heading: 'Manjari',
        body: 'Manjari',
    },
    colors: {
        lightblack: '#1E2021',
        gray: {
            100: '#e5e5e5',
            200: '#f6f6f6',
            700: '#404040',
            800: '#131414',
            400: '#a3a3a3',
        },
        white: '#e5e5e5',
    },
})
// const theme = (brand);
// const mintbaseClient = createApolloClient("mainnet");

export default function MyApp({ Component, pageProps }) {
    return (
        <main className={'dark'}>
            <UserContextProvider>
                {/* <ApolloProvider client={mintbaseClient}> */}
                <ChakraProvider theme={brand}>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </ChakraProvider>
                {/* </ApolloProvider> */}
            </UserContextProvider>
        </main>
    )
}
