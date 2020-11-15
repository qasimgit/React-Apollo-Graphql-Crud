const { ApolloServer, gql } = require("apollo-server");

let users = [
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

    updateUser: (parent, { id, name, email, age }) => {
      console.log("My Idddd", id);
      // const  = users.findIndex((user) => user.id == id);
      // const updatedUsers = users.map((user) =>
      //   user.id === id ? { id, name, email, age } : user
      // );

      let updatedUsers = users.map((usr) => {
        if (usr.id == id) {
          return {
            id,
            name,
            email,
            age,
          };
        }
        return usr;
      });

      console.log("Updated usersss", updatedUsers);

      users = updatedUsers;

      return { id, name, email, age };
    },
    deleteUser: (parent, { id }) => {
      const i = users.findIndex((user) => user.id === id);
      if (!users[i])
        return {
          success: false,
          message: "User not found...",
        };
      users.splice(i, 1);
      return {
        success: true,
        message: "user deleted successfully...",
      };
    },
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
    deleteUser(id: Int!): Status!
    updateUser(id: Int!, name: String!, email: String!, age: Int!): User
  }
  type Status {
    success: Boolean
    message: String!
  }
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
