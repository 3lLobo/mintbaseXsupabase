import { ApolloClient, HttpLink, InMemoryCache, useQuery, gql } from '@apollo/client'


export const QueryNftAll = gql`
query NftCollection($filter: NftFilter) {
  nftCollection(filter: $filter) {
    edges {
      node {
        commentCollection {
          edges {
            node {
              id
              created_at
              text
              user_id
            }
          }
        }
        minter_id
        network
        store_id
        mintbase_thing_id
        created_at
        likeCollection {
          edges {
            node {
              id
              created_at
              user_id
              value
            }
          }
        }
      }
    }
  }
}
`
