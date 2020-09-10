import express from 'express';
import schema from '../graphql/schemas/user';
import graphqlHTTP from 'express-graphql';


const api = express();

api.use('/',graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

export default api;