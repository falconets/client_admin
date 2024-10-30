import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from '@apollo/client/link/core';

const baseUrl = import.meta.env.VITE_BASEURL_ADMIN;
const devUrl = 'http://localhost:3000/api'
const isProduction = import.meta.env.VITE_IS_PRODUCTION 
const mainUrl =  isProduction !== "false" ? baseUrl : devUrl

const httpLink = createHttpLink({ uri: mainUrl,   credentials: "include"});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {

    console.error(`[Network error]: ${networkError}`);
    
    const statusCodeMatch = networkError.message.match(/Received status code (\d+)/);

    if (statusCodeMatch) {
      const statusCode = parseInt(statusCodeMatch[1]);
      
      if (statusCode === 500) {
        console.error("[Server error]: Internal Server Error (500)");
      }
    }
  }

});


const authMiddleware = new ApolloLink((operation, forward) => {

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      accept: 'application/json',
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: errorLink.concat(authMiddleware).concat(httpLink),
  cache: new InMemoryCache(),
});


export default client;
