import { GraphQLList } from 'graphql/type';
import { FastifyInstance } from 'fastify';
import { GQLPost } from '../types';
import { PostEntity } from '../../../utils/DB/entities/DBPosts';
import { getAllPosts } from '../../../utils/DB/queries/post';

export const postsQuery = {
  type: new GraphQLList(GQLPost),
  resolve: async (_: any, args: any, fastify: FastifyInstance): Promise<PostEntity[]> => {
    return await getAllPosts(fastify);
  }
};
