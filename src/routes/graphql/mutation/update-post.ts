import { FastifyInstance } from 'fastify';
import { GQLPost } from '../types';
import { UpdatePostInputObject } from '../input-objects';
import { UpdatePostDto } from '../dto';
import { getPostById } from '../../../utils/DB/queries/post';

export const UpdatePostMutation = {
  type: GQLPost,
  args: { data: { type: UpdatePostInputObject } },
  async resolve(_: any, { data }: Record<'data', UpdatePostDto>, fastify: FastifyInstance) {
    await getPostById(data.id, fastify);

    return await fastify.db.posts.change(data.id, data);
  }
};
