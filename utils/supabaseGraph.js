import { ApolloClient, HttpLink, InMemoryCache, useQuery } from '@apollo/client'


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

export function supabaseNftData (nft_id) {

    const {loading, error, data} = useQuery()
}