import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from '@apollo/client/link/core';
import localforage from "localforage";

//const baseUrl = import.meta.env.VITE_BASEURL_ADMIN;
const devUrl = 'http://localhost:3000/api'
//const isProduction = import.meta.env.VITE_IS_PRODUCTION 
const mainUrl =  devUrl //isProduction !== "false" ? baseUrl :

const getItem = async (key: string): Promise<string | null> => {
  return await localforage.getItem<string>(key);
};

const removeItem = async (key: string): Promise<void> => {
  await localforage.removeItem(key);
}

const httpLink = createHttpLink({ uri: mainUrl });

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
        removeItem("token");
      }
    }
  }

});

const token = await getItem("token");

console.log("Token: ", token);

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({headers ={}})=>({
    headers: {
      ...headers,
      accept: 'application/json',
      authorization: token ? token : ' ',
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: errorLink.concat(authMiddleware).concat(httpLink),
  cache: new InMemoryCache(),
});


export default client;
