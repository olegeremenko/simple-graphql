import { FastifyInstance } from 'fastify';
import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserEntity } from '../../../utils/DB/entities/DBUsers';
import { GQLPost } from './post';
import { GQLProfile } from './profile';

// @ts-ignore
export const GQLUser = new GraphQLObjectType({
  name: 'GQLUser',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    subscribedToUserIds: { type: new GraphQLList(GraphQLString) },
    profile: {
      type: GQLProfile,
      resolve: async (user: UserEntity, _, fastify: FastifyInstance) => {
        return await fastify.db.profiles.findOne({
          key: 'userId',
          equals: user.id,
        })
      }
    },
    posts: {
      type: new GraphQLList(GQLPost),
      resolve: async (user: UserEntity, _, fastify: FastifyInstance) => {
        return await fastify.db.posts.findMany({
          key: 'userId',
          equals: user.id,
        })
      }
    },
    userSubscribedTo: { // user is following
      type: new GraphQLList(GQLUser),
      resolve: async (user: UserEntity, _, fastify: FastifyInstance) => {
        return await fastify.loaders.users.loadMany(user.subscribedToUserIds);
      }
    },
    subscribedToUser: { // user's followers
      type: new GraphQLList(GQLUser),
      resolve: async (user: UserEntity, _, fastify: FastifyInstance) => {
        return await fastify.db.users.findMany({
          key: 'subscribedToUserIds',
          inArray: user.id
        });
      },
    }
  }),
});
