import { GQLProfile } from '../types';
import { CreateProfileInputObject } from '../input-objects';
import { ErrorMessages } from '../../../shared/error-messages';
import { FastifyInstance } from 'fastify';
import { CreateProfileDto } from '../dto';

export const CreateProfileMutation = {
  type: GQLProfile,
  args: { data: { type: CreateProfileInputObject } },
  async resolve(_: any, { data }: Record<'data', CreateProfileDto>, fastify: FastifyInstance) {
    const existingUser = await fastify.db.users.findOne({
      key: "id",
      equals: data.userId
    });

    if (!existingUser) {
      throw fastify.httpErrors.notFound(ErrorMessages.USER_NOT_FOUND);
    }

    const existingProfile = await fastify.db.profiles.findOne({
      key: "userId",
      equals: data.userId
    });

    if (existingProfile) {
      return fastify.httpErrors.notFound(ErrorMessages.BAD_REQUEST);
    }

    const existingMemberType = await fastify.db.memberTypes.findOne({
      key: 'id',
      equals: data.memberTypeId
    });

    if (!existingMemberType) {
      return fastify.httpErrors.notFound(ErrorMessages.BAD_REQUEST);
    }

    return await fastify.db.profiles.create(data);
  }
};
