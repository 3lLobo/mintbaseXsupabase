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
        onError: ((error) => console.log("Supabase Mutation Error: ", error))
    })
    // Call addNft with these args: mintbase_thing_id, store_id, minter_id
    return [addNft, { data }]
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
