import { FastifyInstance } from 'fastify';
import { GQLPost } from '../types';
import { PostEntity } from '../../../utils/DB/entities/DBPosts';
import { GraphQLNonNull, GraphQLString } from 'graphql/type';
import { getPostById } from '../../../utils/DB/queries/post';

export const postQuery = {
  type: GQLPost,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(_: any, args: any, fastify: FastifyInstance): Promise<PostEntity> {
    return await getPostById(args.id, fastify);
  }
};
