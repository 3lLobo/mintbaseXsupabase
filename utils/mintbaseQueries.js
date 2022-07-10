// Different graphQL Queries for the mintbase graph.
import { useQuery, gql } from '@apollo/client'

export const GET_ALL_STORES = gql`
    query ExampleQuery($limit: Int) {
        token(limit: $limit) {
            holder
            id
            createdAt
            thing {
                metadata {
                    animation_url
                    category
                    description
                    media
                    title
                    type
                    youtube_url
                }
            }
        }
    }
`

export const GET_LATEST_NFTS = gql`
    query Token($orderBy: [tokens_order_by!], $limit: Int) {
        token(order_by: $orderBy, limit: $limit) {
            minter
            createdAt
            holder
            thing {
                createdAt
                id
                memo
                metadata {
                    description
                    category
                    media
                    media_hash
                    title
                    media_type
                    id
                }
                store {
                    name
                    id
                    iconBase64
                }
            }
        }
    }
`

export const GET_FAVOS = gql`
    query Token($where: tokens_bool_exp, $orderBy: [tokens_order_by!]) {
        token(where: $where, order_by: $orderBy) {
            minter
            createdAt
            holder
            thing {
                createdAt
                id
                memo
                metadata {
                    description
                    category
                    media
                    media_hash
                    title
                    media_type
                    id
                }
                store {
                    name
                    id
                    iconBase64
                }
            }
        }
    }
`
