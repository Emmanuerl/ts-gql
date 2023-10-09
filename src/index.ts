const { makeExecutableSchema } = require("@graphql-tools/schema");

import { ApolloServer } from "@apollo/server";
import { bookResolver } from "./usage/resolvers/book.resolver";
import { getTypeDefinitiona } from "./typedefs";
import { startStandaloneServer } from "@apollo/server/standalone";

async function start() {
  const typeDefs = await getTypeDefinitiona();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: { Query: bookResolver },
  });
  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 9500 },
  });
  console.log("graphql server url " + url);
}

start();
