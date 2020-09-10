import resolvers from '../resolvers/user';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
    type AuthPayload {
        user: User
    }

    type User {
        name: String
        email: String
        section: [Section]
    }

    type Section{
        color: String
        icon: String
        title: String
        description: String
        cards: [Card]
    }

    type Card{
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
        currentUser: AuthPayload
        getUserByCode(code: String!): AuthPayload
        getCards(section: String!): [Card]
    }

    type Mutation {
        checkCode(code: String!): Boolean
        changePassword(oldPassword: String!, newPassword: String!): Boolean
        login(username: String!, password: String!): AuthPayload
        singup(input: UserInput): AuthPayload
        logout: Boolean
        newAccessToken(password:String!): Boolean
        sendCodEmail(username:String!): Boolean
        recoveryPassword(code:String!,newPassword: String!): Boolean
        createSection(input: SectionInput!): AuthPayload
        deleteSection(title: String!): AuthPayload
        editSection(oldTitle: String!, input: SectionInput!): AuthPayload
        createCard(section: String!, input: CardInput!): [Card]
        deleteCard(section: String!, card: String!): [Card]
        editCard(section: String!, card: String!, input: CardInput!): [Card]
    }
`
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema; 