import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',  this is defalt server we have to put our server url so we are running it on locahost
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default client;
