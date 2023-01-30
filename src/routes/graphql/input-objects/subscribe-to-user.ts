import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

export const SubscribeToUserInputObject = new GraphQLInputObjectType({
  name: 'SubscribeToUserInputObject',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    subscribeToUserId: { type: new GraphQLNonNull(GraphQLID) },
  },
});


