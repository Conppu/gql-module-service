const users = [
  {
    id: 1,
    email: "test1@gmail.com",
    name: "tes001",
  },
  {
    id: 2,
    email: "test2@gmail.com",
    name: "tes002",
  },
];

export default {
  Query: {
    users: () => users,
  },

  Mutation: {
    user: (_parent: any, { name, email }: any, ctx: GraphQLModules.Context) => {
      const data = {
        id: Math.random() * (100000 - 1) + 1,
        name: name || "",
        email: email || "",
      };
      users.push(data);
      return data;
    },
  },
};
