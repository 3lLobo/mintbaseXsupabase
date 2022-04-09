import { ApolloClient, HttpLink, InMemoryCache, useMutation, gql } from '@apollo/client'

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

export function supabaseSetNftData() {
    const [ addNftData, { data}] = useMutation(
    NFT_MUTATION, {
        client: supabaseClient,
        variables: {
            "objects": null,
            "insertIntoLikeCollectionObjects2": null,
            "insertIntoNftCollectionObjects2": null
        },
        onError: ((error) => console.log("Supabase Mutation Error: ", error))
    })
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
