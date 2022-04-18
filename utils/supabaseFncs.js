import { ApolloClient, HttpLink, InMemoryCache, useMutation, useQuery, gql } from '@apollo/client'
import { InsertComment, InsertLike, InsertNft, DeleteComment, DeleteLike, InsertFavo, DeleteFavo } from './supabaseMutations'
import { QueryFavos, QueryNftAll } from './supabaseQueries'
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

function insertLikeHelper(data, setUserLike) {
    setUserLike(data.insertIntoLikeCollection.records[0])
    console.log("Supabase Insterted Like: ", data)
}

export function supabaseInsertLike(setUserLike) {
    const [addLike, { data }] = useMutation(
        InsertLike, {
        client: supabaseClient,
        onCompleted: ((data) => insertLikeHelper(data, setUserLike)),
        onError: ((error) => console.log("Supabase Insert Like Error: ", error))
        //     variables: {
        //         "filter": {
        //             "nft_id": {
        //                 "eq": nftThingId
        //             },
        //         }
        //     }
        // }))
    })
    //     Call addNft with these args: {
    //   "objects": [{"user_id": "e7c9b32a-5631-4ac8-9894-ad77cdec4407", 
    //   "nft_id": "SnhecOqJGXbDz5vuvr6p-TES6AWMNtfsokDSzmBWetM:voiceoftheoceans.mintbase1.near",
    //   "value": false}]
    // }
    return [addLike, { data }]
}

function insertCommentHelper(data, setNftComments) {
    console.log("data", data)
    setNftComments((prev) => {
        return [...prev, data.insertIntoCommentCollection.records[0]]
    })
    console.log("Supabase Insterted Comment: ", data)
}

export function supabaseInsertComment(setNftComments) {
    const [addComment, { data }] = useMutation(
        InsertComment, {
        client: supabaseClient,
        onCompleted: ((data) => insertCommentHelper(data, setNftComments)),
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

export function supabaseDeleteLike(setUserLike) {
    const [delLike, { data }] = useMutation(
        DeleteLike, {
        client: supabaseClient,
        onCompleted: (() => setUserLike(null)),
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

function updateHelper(setUserLike, data, addLike, userLike) {
    console.log("updateHelper:", userLike)
    setTimeout(() => addLike({
        variables: {
            "objects": [{
                "user_id": userLike.user_id,
                "nft_id": userLike.nft_id,
                "value": !userLike.value,
            }]
        }
    }), 1000);

    console.log("Supabase Updated Like: ", data)
}

//  Set the like to the oposite value of the current user Like.
export function supabaseUpdateLike(setUserLike, userLike, addLike,) {
    const [updLike, { data }] = useMutation(
        DeleteLike, {
        client: supabaseClient,
        onCompleted: ((data) => updateHelper(setUserLike, data, addLike, userLike)),
        onError: ((error) => console.log("Supabase Like Update Error: ", error))
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
    return [updLike, { data }]
}

export function supabaseNftData(nftId) {
    const { loading, error, data } = useQuery(QueryNftAll, {
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


// TODO add media link to favo table!
export function supabaseFavos(userId, mainnet) {
    const { loading, error, data } = useQuery(QueryFavos, {
        client: supabaseClient,
        variables: {
            "filter": {
                "user_id": {
                    "eq": userId
                },
                "mainnet": {
                    "eq": mainnet
                }
            },
            "orderBy": [
                {
                    "created_at": "DescNullsLast"
                }
            ]
        }
    })
    if (error) { console.error("supabase QueryFavos error: ", error) }
    return { data, loading }
}


function insertFavoHelper(data, setFavo) {
    console.log("data", data)
    setFavo((prev) => {
        return [...prev, data.insertIntoFavoriteCollection.records[0].id]
    })
    console.log("Supabase Insterted Favo: ", data)
}

export function supabaseInsertFavo(setFavo) {
    const [addFavo, { data }] = useMutation(
        InsertFavo, {
        client: supabaseClient,
        onCompleted: ((data) => insertFavoHelper(data, setFavo)),
        onError: ((error) => console.log("Supabase Favo Insterted Error: ", error))
    })
    //     Call addNft with these args:
    //   "objects": {
    //     "id": null,
    //     "user_id": null,
    //     "mainnet": null
    //   }
    return [addFavo, { data }]
}


function deleteFavoHelper(data, setFavo) {
    console.log("data", data)
    setFavo((prev) => {
        return prev.filter((element) => { return element !== data.deleteFromFavoriteCollection.records[0]?.id })
    })
    console.log("Supabase Delete Favo: ", data)
}

export function supabaseDeleteFavo(setFavo) {
    const [delFavo, { data }] = useMutation(
        DeleteFavo, {
        client: supabaseClient,
        onCompleted: ((data) => deleteFavoHelper(data, setFavo)),
        onError: ((error) => console.log("Supabase Favo Deleted Error: ", error))
    })
    //     Call addNft with these args: {
    //   "filter": {
    //     "id": {
    //       "eq": null
    //     }
    //   }
    // }
    return [delFavo, { data }]
}