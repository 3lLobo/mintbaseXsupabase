import { ApolloClient, HttpLink, InMemoryCache, useMutation, gql } from '@apollo/client'


export const NFT_MUTATION = gql`
mutation Mutation($objects: [CommnetInsertInput!]!, $insertIntoLikeCollectionObjects2: [LikeInsertInput!]!, $insertIntoNftCollectionObjects2: [NftInsertInput!]!) {
    insertIntoCommnetCollection(objects: $objects) {
      records {
        id
        created_at
        text
        user_id
        nft_id
      }
    }
    insertIntoLikeCollection(objects: $insertIntoLikeCollectionObjects2) {
      records {
        id
        created_at
        user_id
        nft_id
        value
      }
    }
    insertIntoNftCollection(objects: $insertIntoNftCollectionObjects2) {
      records {
        id
        created_at
        likes
        comments
        mintbase_thing_id
        store_id
        commnetCollection {
          edges {
            node {
              id
              created_at
              text
              user_id
              nft_id
            }
          }
        }
        likeCollection {
          edges {
            node {
              id
              created_at
              user_id
              nft_id
              value
            }
          }
        }
      }
    }
  }
`