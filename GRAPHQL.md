## Apollo GraphQL

Steps to set up graphQL in supabase:

1. Create your tables in supabase.
2. Link the related fields.
3. Go to the SQL console and run: `select graphql.rebuild_schema();`
4. Go to [Apollo Studio](https://studio.apollographql.com/) and create a development Graph.
5. Set the `apiKey:` and `Content-Type:` headers.
6. The Schema will load automatically.
7. Copy past the queries you need into your project 🍾
