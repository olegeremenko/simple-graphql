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
      resolve: (user: UserEntity, _, fastify: FastifyInstance) => {
        console.log(user);
        return fastify.db.profiles.findOne({
          key: 'userId',
          equals: user.id,
        })
      }
    },
    posts: {
      type: new GraphQLList(GQLPost),
      resolve: (user: UserEntity, _, fastify: FastifyInstance) => {
        return fastify.db.posts.findMany({
          key: 'userId',
          equals: user.id,
        })
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(GQLUser),
      resolve: async (user: UserEntity, _, fastify: FastifyInstance) => {
        return await fastify.db.users.findMany({
          key: 'subscribedToUserIds',
          inArray: user.id
        });
      }
    },
    subscribedToUser: {
      type: new GraphQLList(GQLUser),
      resolve: async (user: UserEntity, _, fastify: FastifyInstance) => {
        return user.subscribedToUserIds.map(async (subscribedToUserId) => {
          return await fastify.db.users.findOne({
            key: 'id',
            equals: subscribedToUserId
          })
        });
      },
    }
  }),
});
