import { FastifyInstance } from 'fastify';
import { GraphQLNonNull, GraphQLString } from 'graphql/type';
import { ErrorMessages } from '../../../shared/error-messages';
import { GQLMemberType } from '../types';
import { MemberTypeEntity } from '../../../utils/DB/entities/DBMemberTypes';

export const memberTypeQuery = {
  type: GQLMemberType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(_: any, args: any, fastify: FastifyInstance): Promise<MemberTypeEntity> {
    const memberType = await fastify.db.memberTypes.findOne({
      key: 'id',
      equals: args.id
    });

    if (!memberType) {
      throw fastify.httpErrors.notFound(ErrorMessages.MEMBER_TYPE_ERROR);
    }

    return memberType;
  }
};
