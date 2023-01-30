import { FastifyInstance } from 'fastify';
import { GQLPost } from '../types';
import { UpdateUserInputObject } from '../input-objects';
import { UpdateUserDto } from '../dto';
import { getUserById } from '../../../utils/DB/queries/user';

export const UpdateUserMutation = {
  type: GQLPost,
  args: { data: { type: UpdateUserInputObject } },
  async resolve(_: any, { data }: Record<'data', UpdateUserDto>, fastify: FastifyInstance) {
    await getUserById(data.id, fastify);

    return await fastify.db.users.change(data.id, data);
  }
};
