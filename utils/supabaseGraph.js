import { ApolloClient, HttpLink, InMemoryCache, useQuery, gql } from '@apollo/client'


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

const GET_NFT_DATA = gql`
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
