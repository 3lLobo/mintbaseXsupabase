## Apollo GraphQL

### Steps to set up graphQL in supabase:

1. Create your tables in supabase.
2. Link the related fields.
3. Create a public user table and [update the handle_new_user() function](https://nikofischer.com/supabase-how-to-query-users-table).
4. Go to the SQL console and run: `select graphql.rebuild_schema();`
5. Go to [Apollo Studio](https://studio.apollographql.com/) and create a development Graph.
6. Set the `apiKey:` and `Content-Type:` headers.
7. The Schema will load automatically.
8. Copy past the queries you need into your project 🍾

### Using multiple endpoints

The `<ApolloProvider>` takes onw client and makes it available when calling the hooks.
To use a second endpoint, define a seperate client and pass it as option argument to the hooks. See [docs]{https://www.apollographql.com/docs/react/api/react/hooks/#usequery}

