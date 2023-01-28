import { FastifyInstance } from 'fastify';
import { GQLPost } from '../types';
import { PostEntity } from '../../../utils/DB/entities/DBPosts';
import { GraphQLNonNull, GraphQLString } from 'graphql/type';
import { ErrorMessages } from '../../../shared/error-messages';

export const postQuery = {
  type: GQLPost,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(_: any, args: any, fastify: FastifyInstance): Promise<PostEntity> {
    const post = await fastify.db.posts.findOne({
      key: 'id',
      equals: args.id
    });

    if (!post) {
      throw fastify.httpErrors.notFound(ErrorMessages.POST_NOT_FOUND);
    }

    return post;
  }
};
