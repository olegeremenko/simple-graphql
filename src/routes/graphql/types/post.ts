import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export const GQLPost = new GraphQLObjectType({
  name: 'GQLPost',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    userId: { type: GraphQLID },
  }),
});
