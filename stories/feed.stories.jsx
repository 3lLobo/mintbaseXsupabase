import Feed from '../components/Feed'
// import { mockupRes } from "./mockupResponse";
import { brand } from '../pages/_app'
import { UserContextProvider } from '../hooks/authUser'
import { ChakraProvider } from '@chakra-ui/react'
// import { extendTheme } from '@chakra-ui/react'
// import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from '../utils/initApolloMintbase'
// import { createApolloClient } from "../utils/initApolloMintbase";
import { useReducer, useState } from 'react'

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Head from '../components/Head'

export default {
    title: 'Pages/Feed',
    component: Feed,
}

const Template = (args) => {
    function networkReducer(mintbaseNetwork, action) {
        if (action === 'mainnet') {
            const mClient = createApolloClient(action)

            return { client: mClient, network: action }
        } else if (action === 'testnet') {
            const mClient = createApolloClient(action)

            return { client: mClient, network: action }
        } else {
            throw new Error()
        }
    }

    const [mintbaseNetwork, setMintbaseNetwork] = useReducer(networkReducer, {
        client: createApolloClient('testnet'),
        network: 'testnet',
    })
    const favo = useState([])
    return (
        <main className={'dark'}>
            <UserContextProvider>
                <ChakraProvider theme={brand}>
                    <Head />
                    <Feed mintbaseNetwork={mintbaseNetwork} favo={favo} {...args} />
                </ChakraProvider>
            </UserContextProvider>
        </main>
    )
}
// const [mintbaseNetwork, setMintbaseNetwork] = useReducer(networkReducer, { client: createApolloClient("testnet"), network: "testnet" });
// const favo = useState([])

export const MintbaseFeed = Template.bind({})
MintbaseFeed.args = {
    // mintbaseRes: mockupRes,
    // mintbaseNetwork: mintbaseNetwork,
    // favo: favo,
}
