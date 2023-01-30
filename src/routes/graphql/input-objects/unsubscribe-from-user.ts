import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

export const UnsubscribeFromUserInputObject = new GraphQLInputObjectType({
  name: 'UnsubscribeFromUserInputObject',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    unsubscribeFromUserId: { type: new GraphQLNonNull(GraphQLID) },
  },
});


