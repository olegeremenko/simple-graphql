import { FastifyInstance } from 'fastify';
import { GraphQLNonNull, GraphQLString } from 'graphql/type';
import { GQLProfile } from '../types';
import { ProfileEntity } from '../../../utils/DB/entities/DBProfiles';
import { getProfileById } from '../../../utils/DB/queries/profile';

export const profileQuery = {
  type: GQLProfile,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(_: any, args: any, fastify: FastifyInstance): Promise<ProfileEntity> {
    return await getProfileById(args.id, fastify);
  }
};
