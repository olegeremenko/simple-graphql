import { FastifyInstance } from 'fastify';
import { GraphQLNonNull, GraphQLString } from 'graphql/type';
import { GQLMemberType } from '../types';
import { MemberTypeEntity } from '../../../utils/DB/entities/DBMemberTypes';
import { getMemberTypeById } from '../../../utils/DB/queries/member-type';

export const memberTypeQuery = {
  type: GQLMemberType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(_: any, args: any, fastify: FastifyInstance): Promise<MemberTypeEntity> {
    return await getMemberTypeById(args.id, fastify);
  }
};
