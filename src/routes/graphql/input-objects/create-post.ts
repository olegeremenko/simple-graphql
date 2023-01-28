import { GraphQLInputObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

export const CreatePostInputObject = new GraphQLInputObjectType({
  name: 'CreatePostInputObject',
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
});


