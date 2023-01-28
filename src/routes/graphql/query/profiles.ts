import { GraphQLList } from 'graphql/type';
import { FastifyInstance } from 'fastify';
import { GQLProfile } from '../types';
import { ProfileEntity } from '../../../utils/DB/entities/DBProfiles';

export const profilesQuery = {
  type: new GraphQLList(GQLProfile),
  resolve: async (_: any, args: any, fastify: FastifyInstance): Promise<ProfileEntity[]> => {
    return await fastify.db.profiles.findMany();
  }
};
