import { ApolloClient, HttpLink, InMemoryCache, useQuery, gql } from '@apollo/client'


export const GET_NFT_DATA = gql`
query Query($filter: NftFilter) {
    nftCollection(filter: $filter) {
      edges {
        node {
          likes
          comments
          commnetCollection {
            edges {
              node {
                text
                user_id
                users {
                  first_name
                  last_name
                }
              }
            }
          }
          likeCollection {
            edges {
              cursor
              node {
                value
                users {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`
