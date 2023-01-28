import { GQLUser } from '../types';
import { UserEntity } from '../../../utils/DB/entities/DBUsers';
import { FastifyInstance } from 'fastify';
import { GraphQLNonNull, GraphQLString } from 'graphql/type';
import { ErrorMessages } from '../../../shared/error-messages';

export const userQuery = {
  type: GQLUser,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_: any, args: any, fastify: FastifyInstance): Promise<UserEntity> => {
    const user = await fastify.db.users.findOne({
      key: 'id',
      equals: args.id
    });

    if (!user) {
      throw fastify.httpErrors.notFound(ErrorMessages.USER_NOT_FOUND);
    }

    return user;
  }
};
