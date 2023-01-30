import { GraphQLList } from 'graphql/type';
import { GQLUser } from '../types';
import { UserEntity } from '../../../utils/DB/entities/DBUsers';
import { FastifyInstance } from 'fastify';
import { getAllUsers } from '../../../utils/DB/queries/user';

export const usersQuery = {
  type: new GraphQLList(GQLUser),
  resolve: async (_: any, args: any, fastify: FastifyInstance): Promise<UserEntity[]> => {
    return await getAllUsers(fastify);
  }
};
