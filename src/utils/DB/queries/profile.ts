import { FastifyInstance } from 'fastify';
import { ErrorMessages } from '../../../shared/error-messages';
import { ProfileEntity } from '../entities/DBProfiles';

export const getProfileById = async (id: any, fastify: FastifyInstance): Promise<ProfileEntity> => {
  const post = await fastify.loaders.profiles.load(id);

  if (!post) {
    throw fastify.httpErrors.notFound(ErrorMessages.PROFILE_NOT_FOUND);
  }

  return post;
}

export const getAllProfiles = async (fastify: FastifyInstance) => {
  return await fastify.loaders.entities.load('profiles');
}
