import { FastifyInstance } from 'fastify';
import { ErrorMessages } from '../../../shared/error-messages';
import { PostEntity } from '../entities/DBPosts';

export const getPostById = async (id: any, fastify: FastifyInstance): Promise<PostEntity> => {
  const post = await fastify.loaders.posts.load(id);

  if (!post) {
    throw fastify.httpErrors.notFound(ErrorMessages.POST_NOT_FOUND);
  }

  return post;
}

export const getAllPosts = async (fastify: FastifyInstance) => {
  return await fastify.loaders.entities.load('posts');
}
