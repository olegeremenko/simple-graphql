import { GQLProfile } from '../types';
import { FastifyInstance } from 'fastify';
import { UpdateProfileInputObject } from '../input-objects';
import { UpdateProfileDto } from '../dto';
import { getMemberTypeById } from '../../../utils/DB/queries/member-type';
import { getProfileById } from '../../../utils/DB/queries/profile';

export const UpdateProfileMutation = {
  type: GQLProfile,
  args: { data: { type: UpdateProfileInputObject } },
  async resolve(_: any, { data }: Record<'data', UpdateProfileDto>, fastify: FastifyInstance) {
    await getProfileById(data.id, fastify);
    await getMemberTypeById(data.memberTypeId, fastify);

    return await fastify.db.profiles.change(data.id, data);
  }
};
