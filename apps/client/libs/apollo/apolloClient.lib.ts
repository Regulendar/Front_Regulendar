import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_URL = process.env.EXPO_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3000/graphql';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
});
