import { GQLUser } from '../types';
import { UserEntity } from '../../../utils/DB/entities/DBUsers';
import { FastifyInstance } from 'fastify';
import { GraphQLNonNull, GraphQLString } from 'graphql/type';
import { getUserById } from '../../../utils/DB/queries/user';

export const userQuery = {
  type: GQLUser,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_: any, args: any, fastify: FastifyInstance): Promise<UserEntity> => {
    return await getUserById(args.id, fastify);
  }
};
