import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export const CreateUserInputObject = new GraphQLInputObjectType({
  name: 'CreateUserInputObject',
  fields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});


