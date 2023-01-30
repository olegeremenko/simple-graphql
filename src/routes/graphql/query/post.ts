import { FastifyInstance } from 'fastify';
import { GQLPost } from '../types';
import { PostEntity } from '../../../utils/DB/entities/DBPosts';
import { GraphQLNonNull, GraphQLID } from 'graphql/type';
import { getPostById } from '../../../utils/DB/queries/post';

export const postQuery = {
  type: GQLPost,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  async resolve(_: any, args: any, fastify: FastifyInstance): Promise<PostEntity> {
    return await getPostById(args.id, fastify);
  }
};
