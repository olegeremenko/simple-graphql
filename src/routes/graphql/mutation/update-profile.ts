import { GQLProfile } from '../types';
import { ErrorMessages } from '../../../shared/error-messages';
import { FastifyInstance } from 'fastify';
import { UpdateProfileInputObject } from '../input-objects';
import { UpdateProfileDto } from '../dto';

export const UpdateProfileMutation = {
  type: GQLProfile,
  args: { input: { type: UpdateProfileInputObject } },
  async resolve(_: any, { data }: Record<'data', UpdateProfileDto>, fastify: FastifyInstance) {
    const existingProfile = await fastify.db.profiles.findOne({
      key: "id",
      equals: data.id
    });

    if (!existingProfile) {
      return fastify.httpErrors.notFound(ErrorMessages.PROFILE_NOT_FOUND);
    }

    const existingMemberType = await fastify.db.memberTypes.findOne({
      key: 'id',
      equals: data.memberTypeId
    });

    if (!existingMemberType) {
      return fastify.httpErrors.notFound(ErrorMessages.BAD_REQUEST);
    }

    return await fastify.db.profiles.change(data.id, data);
  }
};
