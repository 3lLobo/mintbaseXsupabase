import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

// const tetsnet = 'https://mintbase-testnet.hasura.app/v1/graphql'

export const mintbaseNetwork = "testnet" // "mainnet"



export function createApolloClient(mintbaseNetwork) {
  var mintbaseEndpoint;
  if (mintbaseNetwork === "mainnet") {
    mintbaseEndpoint = 'https://mintbase-mainnet.hasura.app/v1/graphql'
  } else if (mintbaseNetwork === "testnet") {
    mintbaseEndpoint = 'https://mintbase-testnet.hasura.app/v1/graphql'
  }
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: mintbaseEndpoint,
      credentials: 'same-origin',
      headers: {
        'x-hasura-role': 'anonymous',
      },
    }),
    cache: new InMemoryCache(),
  })
}
