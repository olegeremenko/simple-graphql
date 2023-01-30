import { GraphQLList } from 'graphql/type';
import { FastifyInstance } from 'fastify';
import { GQLProfile } from '../types';
import { ProfileEntity } from '../../../utils/DB/entities/DBProfiles';
import { getAllProfiles } from '../../../utils/DB/queries/profile';

export const profilesQuery = {
  type: new GraphQLList(GQLProfile),
  resolve: async (_: any, args: any, fastify: FastifyInstance): Promise<ProfileEntity[]> => {
    return await getAllProfiles(fastify);
  }
};
