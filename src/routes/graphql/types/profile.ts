import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { GQLMemberType } from './member-type';
import { ProfileEntity } from '../../../utils/DB/entities/DBProfiles';
import { FastifyInstance } from 'fastify';
import { getMemberTypeById } from '../../../utils/DB/queries/member-type';

export const GQLProfile = new GraphQLObjectType({
  name: 'GQLProfile',
  fields: () => ({
    id: { type: GraphQLString },
    userId: { type: GraphQLID },
    avatar: { type: GraphQLString },
    sex: { type: GraphQLString },
    birthday: { type: GraphQLInt },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    street: { type: GraphQLString },
    memberTypeId: { type: GraphQLString },
    memberType: {
      type: GQLMemberType,
      resolve: async (profile: ProfileEntity, _, fastify: FastifyInstance) => {
        return await getMemberTypeById(profile.memberTypeId, fastify);
      }
    }
  }),
});
