import { GraphQLList } from 'graphql/type';
import { FastifyInstance } from 'fastify';
import { MemberTypeEntity } from '../../../utils/DB/entities/DBMemberTypes';
import { GQLMemberType } from '../types';
import { getAllMemberTypes } from '../../../utils/DB/queries/member-type';

export const memberTypesQuery = {
  type: new GraphQLList(GQLMemberType),
  resolve: async (_: any, args: any, fastify: FastifyInstance): Promise<MemberTypeEntity[]> => {
    return await getAllMemberTypes(fastify);
  }
};
