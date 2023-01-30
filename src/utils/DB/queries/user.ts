import { FastifyInstance } from 'fastify';
import { UserEntity } from '../entities/DBUsers';
import { ErrorMessages } from '../../../shared/error-messages';

export const getUserById = async (id: any, fastify: FastifyInstance): Promise<UserEntity> => {
  const user = await fastify.loaders.users.load(id);

  if (!user) {
    throw fastify.httpErrors.notFound(ErrorMessages.USER_NOT_FOUND);
  }

  return user;
}

export const getAllUsers = async (fastify: FastifyInstance) => {
  return await fastify.loaders.entities.load('users');
}
