import { GQLUser } from '../types';
import { CreateUserInputObject } from '../input-objects';
import { FastifyInstance } from 'fastify';
import { CreateUserDto } from '../dto';

export const CreateUserMutation = {
  type: GQLUser,
  args: { data: { type: CreateUserInputObject } },
  async resolve(_: any, { data }: Record<'data', CreateUserDto>, fastify: FastifyInstance) {
    return await fastify.db.users.create(data);
  }
};
