import { ErrorMessages } from '../../../shared/error-messages';
import { FastifyInstance } from 'fastify';
import { GQLPost } from '../types';
import { UpdatePostInputObject } from '../input-objects';
import { UpdatePostDto } from '../dto';

export const UpdatePostMutation = {
  type: GQLPost,
  args: { data: { type: UpdatePostInputObject } },
  async resolve(_: any, { data }: Record<'data', UpdatePostDto>, fastify: FastifyInstance) {
    const user = await fastify.db.posts.findOne({
      key: "id",
      equals: data.id
    });

    if (!user) {
      throw fastify.httpErrors.notFound(ErrorMessages.POST_NOT_FOUND);
    }

    return await fastify.db.posts.change(data.id, data);
  }
};
