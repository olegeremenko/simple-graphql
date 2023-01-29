import { GraphQLInputObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

export const UpdateMemberTypeInputObject = new GraphQLInputObjectType({
  name: 'UpdateMemberTypeInputObject',
  fields: {
    profileId: { type: new GraphQLNonNull(GraphQLID) },
    memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
  },
});


