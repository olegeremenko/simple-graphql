import { FastifyInstance } from 'fastify';
import { GraphQLNonNull, GraphQLString } from 'graphql/type';
import { ErrorMessages } from '../../../shared/error-messages';
import { GQLProfile } from '../types';
import { ProfileEntity } from '../../../utils/DB/entities/DBProfiles';

export const profileQuery = {
  type: GQLProfile,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(_: any, args: any, fastify: FastifyInstance): Promise<ProfileEntity> {
    const profile = await fastify.db.profiles.findOne({
      key: 'id',
      equals: args.id
    });

    if (!profile) {
      throw fastify.httpErrors.notFound(ErrorMessages.PROFILE_NOT_FOUND);
    }

    return profile;
  }
};
