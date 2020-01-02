const { ApolloServer } = require('apollo-server');
const mongoose = require("mongoose");
// const cors = require("./middleware/cors");
// const isAuth = require("./middleware/is-auth");
const graphQlSchema = require("./graphql/schema");
const grapgQlResolvers = require("./graphql/resolvers");

const path = '/graphql';

const PORT = 3000;

const apollo = new ApolloServer({ 
  typeDefs: graphQlSchema, 
  resolvers: grapgQlResolvers,
  playground: {
    endpointURL: path,
    subscriptionEndpoint: `ws://localhost:5000${path}`
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log('websocket client connected')
    },
    onDisconnect: (webSocket, context) => {
      console.log('websocket client disconnected')
    }
  }
});

//
// Connect to Database
//
const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;

mongoose
  .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database");

    apollo.listen({ port: PORT })
      .then(({ url }) => {
        console.log(`🚀 Server ready at at ${url}`)
      });
  })
  .catch(err => {
    console.error(err);
  });
