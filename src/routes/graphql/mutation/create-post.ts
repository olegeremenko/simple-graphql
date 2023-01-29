import { FastifyInstance } from 'fastify';
import { GQLPost } from '../types';
import { CreatePostInputObject } from '../input-objects';
import { CreatePostDto } from '../dto';
import { getUserById } from '../../../utils/DB/queries/user';

export const CreatePostMutation = {
  type: GQLPost,
  args: { data: { type: CreatePostInputObject } },
  async resolve(_: any, { data }: Record<'data', CreatePostDto>, fastify: FastifyInstance) {
    await getUserById(data.userId, fastify);

    return await fastify.db.posts.create(data);
  }
};
