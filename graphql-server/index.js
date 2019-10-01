const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./src/generated/prisma-client');


const resolvers = {
    Query: {
      info: () => `This is the API of chickpeach`,
      feed: (root, args, context, info) => {
        return context.prisma.links()
      },
    },
    Mutation: {
      post: (root, args, context) => {
        return context.prisma.createLink({
          url: args.url,
          description: args.description,
        })
      },
    },
  }


const server = new GraphQLServer({
typeDefs: './graphql-server/schema.graphql',
resolvers,
context: { prisma },
});

server.start(() => console.log(`Server is running on http://localhost:4000`))