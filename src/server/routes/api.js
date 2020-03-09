const express = require('express');
const schema = require('../graphql/schemas/user');
const graphqlHTTP = require('express-graphql');
const session = require('express-session');
const config = require('../env');
const Store = require('express-session').Store;
const MongooseStore = require('mongoose-express-session')(Store);
const mongoose = require('mongoose');

const {secretSession} = config;

const api = express();



api.use(session({
  secret: secretSession,
  resave: false,
  saveUninitialized: false,
  store: new MongooseStore({
    connection: mongoose
  })
}))

api.use('/',graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

module.exports = api;