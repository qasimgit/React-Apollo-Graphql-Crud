const { ApolloServer, gql } = require("apollo-server");

const users = [
  { id: 1, name: "Qasim", email: "qasim@gmail.com", age: 19 },
  {
    id: 2,
    name: "Abbas",
    email: "abbas@gmail.com",
    age: 20,
  },
  {
    id: 3,
    name: "Ahmed",
    email: "ahmed@gmail.com",
    age: 21,
  },
  {
    id: 4,
    name: "Owais",
    email: "owais@gmail.com",
    age: 22,
  },
];

console.log(users);
const resolvers = {
  Query: {
    users: () => users,
  },

  Mutation: {
    createUser: (parent, args) => {
      const ids = users.map(({ id }) => id);
      const id = parseInt(Math.max(...ids)) + 1;
      console.log(id);
      const user = {
        id,
        ...args,
      };
      users.push(user);
      console.log(user);
      return user;
    },
    // deleteUser: (parent , args) => {

    // }
  },
};

const typeDefs = gql`
  type User {
    id: Int
    name: String!
    email: String!
    age: Int!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int!): User
  }
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
