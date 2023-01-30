import { FastifyInstance } from 'fastify';
import { GQLPost } from '../types';
import { UpdateMemberTypeInputObject } from '../input-objects';
import { UpdateMemberTypeDto } from '../dto';
import { getProfileById } from '../../../utils/DB/queries/profile';
import { getMemberTypeById } from '../../../utils/DB/queries/member-type';

export const UpdateMemberTypeMutation = {
  type: GQLPost,
  args: { data: { type: UpdateMemberTypeInputObject } },
  async resolve(_: any, { data }: Record<'data', UpdateMemberTypeDto>, fastify: FastifyInstance) {
    await getProfileById(data.profileId, fastify);
    await getMemberTypeById(data.memberTypeId, fastify);

    return await fastify.db.profiles.change(data.profileId, data);
  }
};
