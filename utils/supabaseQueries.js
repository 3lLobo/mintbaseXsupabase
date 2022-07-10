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
                                nft_id
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

export const QueryFavos = gql`
    query FavoriteCollection($filter: FavoriteFilter, $orderBy: [FavoriteOrderBy!]) {
        favoriteCollection(filter: $filter, orderBy: $orderBy) {
            edges {
                node {
                    id
                    nft {
                        store_id
                        minter_id
                        commentCollection {
                            edges {
                                node {
                                    created_at
                                    text
                                    users {
                                        full_name
                                    }
                                }
                            }
                        }
                        likeCollection {
                            edges {
                                node {
                                    created_at
                                    value
                                    user_id
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
