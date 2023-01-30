import { GraphQLInputObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

export const UpdateUserInputObject = new GraphQLInputObjectType({
  name: 'UpdateUserInputObject',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});


