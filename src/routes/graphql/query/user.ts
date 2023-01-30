import { GQLUser } from '../types';
import { UserEntity } from '../../../utils/DB/entities/DBUsers';
import { FastifyInstance } from 'fastify';
import { GraphQLID, GraphQLNonNull } from 'graphql/type';
import { getUserById } from '../../../utils/DB/queries/user';

export const userQuery = {
  type: GQLUser,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_: any, args: any, fastify: FastifyInstance): Promise<UserEntity> => {
    return await getUserById(args.id, fastify);
  }
};
