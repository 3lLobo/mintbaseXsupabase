import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

// const tetsnet = 'https://mintbase-testnet.hasura.app/v1/graphql'

export const mintbaseNetwork = "testnet" // "mainnet"

var mintbaseEndpoint;

if (mintbaseNetwork === "mainnet") {
  mintbaseEndpoint = 'https://mintbase-mainnet.hasura.app/v1/graphql'
} else if (mintbaseNetwork === "testnet") {
  mintbaseEndpoint = 'https://mintbase-testnet.hasura.app/v1/graphql'
}


export function createApolloClient(graphUri) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: graphUri,
      credentials: 'same-origin',
      headers: {
        'x-hasura-role': 'anonymous',
      },
    }),
    cache: new InMemoryCache(),
  })
}

const mintbaseClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_SUPABASE_URL + "/graphql/v1",
      //   credentials: 'same-origin',
      headers: {
          'apiKey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Content-type': 'application/json',
      },
  }),
  cache: new InMemoryCache(),
})

