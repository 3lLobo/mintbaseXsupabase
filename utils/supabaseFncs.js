import { ApolloClient, HttpLink, InMemoryCache, useMutation, gql } from '@apollo/client'
import { InsertComment, InsertLike, InsertNft, DeleteComment, DeleteLike } from './supabaseMutations'
import { QueryNftAll } from './supabaseQueries'
import { mintbaseNetwork } from './initApolloMintbase'


const supabaseClient = new ApolloClient({
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

export function supabaseInsertNft() {
    const [addNft, { data }] = useMutation(
        InsertNft, {
        client: supabaseClient,
        onCompleted: ((data) => console.log("Supabase Insterted NFT: ", data)),
        onError: ((error) => console.log("Supabase NFT Insterted Error: ", error))
    })
    // Call addNft with these args: mintbase_thing_id, store_id, minter_id
    return [addNft, { data }]
}

export function supabaseInsertLike(delLike, nftThingId,) {
    const [addLike, { data }] = useMutation(
        InsertLike, {
        client: supabaseClient,
        onCompleted: ((data) => console.log("Supabase Insterted Like: ", data)),
        onError: ((error) => delLike({
            variables: {
                "filter": {
                    "nft_id": {
                        "eq": nftThingId
                    },
                }
            }
        }))
    })
    //     Call addNft with these args: {
    //   "objects": [{"user_id": "e7c9b32a-5631-4ac8-9894-ad77cdec4407", 
    //   "nft_id": "SnhecOqJGXbDz5vuvr6p-TES6AWMNtfsokDSzmBWetM:voiceoftheoceans.mintbase1.near",
    //   "value": false}]
    // }
    return [addLike, { data }]
}

export function supabaseInsertComment() {
    const [addComment, { data }] = useMutation(
        InsertComment, {
        client: supabaseClient,
        onCompleted: ((data) => console.log("Supabase Insterted Comment: ", data)),
        onError: ((error) => console.log("Supabase Comment Insterted Error: ", error))
    })
    //     Call addNft with these args: {
    //   "objects": [{"text": "Good One!", "nft_id": "SnhecOqJGXbDz5vuvr6p-TES6AWMNtfsokDSzmBWetM:voiceoftheoceans.mintbase1.near", "user_id": "e7c9b32a-5631-4ac8-9894-ad77cdec4407"}]
    // }
    return [addComment, { data }]
}

export function supabaseDeleteComment() {
    const [delComment, { data }] = useMutation(
        DeleteComment, {
        client: supabaseClient,
        onCompleted: ((data) => console.log("Supabase Deleted Comment: ", data)),
        onError: ((error) => console.log("Supabase Comment Deleted Error: ", error))
    })
    //     Call addNft with these args: {
    //   "filter": {
    //     "nft_id": {
    //       "eq": "SnhecOqJGXbDz5vuvr6p-TES6AWMNtfsokDSzmBWetM:voiceoftheoceans.mintbase1.near"
    //     },
    //     "user_id": {
    //       "eq": "e7c9b32a-5631-4ac8-9894-ad77cdec4407"
    //     },
    //     "text": {
    //       "eq": "Good One!"
    //     }
    //   }
    // }
    return [delComment, { data }]
}

export function supabaseDeleteLike() {
    const [delLike, { data }] = useMutation(
        DeleteLike, {
        client: supabaseClient,
        onCompleted: ((data) => console.log("Supabase Deleted Like: ", data)),
        onError: ((error) => console.log("Supabase Like Deleted Error: ", error))
    })
    //     Call addNft with these args: {
    // {
    //     "filter": {
    //     "nft_id": {
    //         "eq": "SnhecOqJGXbDz5vuvr6p-TES6AWMNtfsokDSzmBWetM:voiceoftheoceans.mintbase1.near"
    //     },
    //     "user_id": {
    //         "eq": "e7c9b32a-5631-4ac8-9894-ad77cdec4407"
    //     },
    //     }
    // }
    return [delLike, { data }]
}

export function supabaseNftData(nftId) {
    const { loading, error, data } = useQuery(GET_NFT_DATA, {
        client: supabaseClient,
        variables: {
            "filter": {
                "mintbase_thing_id": {
                    "eq": nftId,
                }
            }
        }
    })
    if (error) { console.error("supabase error: ", error) }
    return { data, loading }
}
