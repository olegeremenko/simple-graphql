import { GQLProfile } from '../types';
import { CreateProfileInputObject } from '../input-objects';
import { ErrorMessages } from '../../../shared/error-messages';
import { FastifyInstance } from 'fastify';
import { CreateProfileDto } from '../dto';
import { getUserById } from '../../../utils/DB/queries/user';
import { getMemberTypeById } from '../../../utils/DB/queries/member-type';

export const CreateProfileMutation = {
  type: GQLProfile,
  args: { data: { type: CreateProfileInputObject } },
  async resolve(_: any, { data }: Record<'data', CreateProfileDto>, fastify: FastifyInstance) {
    await getUserById(data.userId, fastify);

    const existingProfile = await fastify.db.profiles.findOne({
      key: "userId",
      equals: data.userId
    });

    if (existingProfile) {
      return fastify.httpErrors.badRequest(ErrorMessages.BAD_REQUEST);
    }

    await getMemberTypeById(data.memberTypeId, fastify);

    return await fastify.db.profiles.create(data);
  }
};
