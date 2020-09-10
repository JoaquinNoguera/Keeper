const resolvers = require('../resolvers/user');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const typeDefs = `
    type AuthPayload {
        user: User
    }

    type User {
        _id: ID
        name: String
        email: String
        section: [Section]
    }

    type Section{
        _id: ID
        color: String
        icon: String
        title: String
        description: String
        cards: [Card]
    }

    type Card{
        _id: ID
        color: String
        title: String
        description: String
    }
    
    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    input SectionInput{
        color: String!
        icon: String!
        title: String!
        description: String!
    }
    
    input CardInput{
        color: String!
        title: String!
        description: String!
    }

    type Query {
        authenticate: AuthPayload
        getUserByCode(code: String!): AuthPayload
        getCards(section: String!): [Card]
    }

    type Mutation {
        login(username: String!, password: String!): AuthPayload
        singup(input: UserInput): AuthPayload
        checkCode(code: String!): Boolean
        changePassword(oldPassword: String!, newPassword: String!): Boolean
        logout: Boolean
        sendCodEmail(username:String!): Boolean
        recoveryPassword(code:String!,newPassword: String!): Boolean
        createSection(input: SectionInput!): [Section]
        deleteSection(title: String!): [Section]
        editSection(oldTitle: String!, input: SectionInput!): [Section]
        createCard(section: String!, input: CardInput!): [Card]
        deleteCard(section: String!, card: String!): [Card]
        editCard(section: String!, card: String!, input: CardInput!): [Card]
    }
`
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = schema; 