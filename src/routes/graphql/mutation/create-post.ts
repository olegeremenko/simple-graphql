import { ErrorMessages } from '../../../shared/error-messages';
import { FastifyInstance } from 'fastify';
import { GQLPost } from '../types';
import { CreatePostInputObject } from '../input-objects';
import { CreatePostDto } from '../dto';

export const CreatePostMutation = {
  type: GQLPost,
  args: { data: { type: CreatePostInputObject } },
  async resolve(_: any, { data }: Record<'data', CreatePostDto>, fastify: FastifyInstance) {
    const user = await fastify.db.users.findOne({
      key: "id",
      equals: data.userId
    });

    if (!user) {
      throw fastify.httpErrors.notFound(ErrorMessages.USER_NOT_FOUND);
    }

    return await fastify.db.posts.create(data);
  }
};
