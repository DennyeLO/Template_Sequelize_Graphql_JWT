const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        id: Int!
        username: String!
        token: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
    }

    type Query{
        getUser: User!
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`;