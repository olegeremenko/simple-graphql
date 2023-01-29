import { FastifyInstance } from 'fastify';
import { ErrorMessages } from '../../../shared/error-messages';
import { MemberTypeEntity } from '../entities/DBMemberTypes';

export const getMemberTypeById = async (id: any, fastify: FastifyInstance): Promise<MemberTypeEntity> => {
  const post = await fastify.loaders.memberTypes.load(id);

  if (!post) {
    throw fastify.httpErrors.notFound(ErrorMessages.MEMBER_TYPE_NOT_FOUND);
  }

  return post;
}
