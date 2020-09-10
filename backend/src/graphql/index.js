const graphqlHTTP = require('express-graphql');
const schema = require('./schemas/user');
const express = require('express');


const graphQLServer = express();


//configuración del setvidor de graphQL
graphQLServer.use('/',graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));

module.exports = graphQLServer;