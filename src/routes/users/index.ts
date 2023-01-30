import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';
import { ErrorMessages } from '../../shared/error-messages';
import { StatusCodes } from 'http-status-codes';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    return reply.send(await fastify.db.users.findMany());
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await fastify.db.users.findOne({
        key: 'id',
        equals: request.params.id,
      });

      if (!user) {
        return reply.status(StatusCodes.NOT_FOUND).send({
          message: ErrorMessages.NOT_FOUND
        });
      }

      return reply.send(user);
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await fastify.db.users.create(request.body);

      return reply.status(StatusCodes.CREATED).send(user);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      try {
        const user = await fastify.db.users.delete(request.params.id);

        const profile = await fastify.db.profiles.findOne({
          key: 'userId',
          equals: user.id,
        });

        if (profile) {
          await fastify.db.profiles.delete(profile.id);
        }

        const posts = await fastify.db.posts.findMany({
          key: 'userId',
          equals: user.id,
        });

        posts.forEach(async (post) => await fastify.db.posts.delete(post.id));

        const followers = await fastify.db.users.findMany({
          key: 'subscribedToUserIds',
          equals: [user.id],
        });

        followers.forEach(async (follower) =>
          await fastify.db.users.change(follower.id, {
            subscribedToUserIds: follower.subscribedToUserIds.filter(
              (followerId) => followerId !== user.id
            ),
          })
        );

        return reply.send(user);
      } catch (error) {
        return reply.status(StatusCodes.BAD_REQUEST).send({
          message: (error as Error).message
        });
      }
    }
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const subscriber = await fastify.db.users.findOne({
        key: 'id',
        equals: request.params.id,
      });

      const candidate = await fastify.db.users.findOne({
        key: 'id',
        equals: request.body.userId,
      });

      if (!subscriber || !candidate) {
        return reply.status(StatusCodes.NOT_FOUND).send({
          message: ErrorMessages.NOT_FOUND
        });
      }

      const hasFollower = subscriber.subscribedToUserIds.includes(request.body.userId);

      if (hasFollower) {
        return reply.status(StatusCodes.BAD_REQUEST).send({
          message: ErrorMessages.BAD_REQUEST
        });
      }

      const subscribedToIds = [
        ...subscriber.subscribedToUserIds,
        candidate.id,
      ];

      const subscribedToUserIds = [
        ...candidate.subscribedToUserIds,
        subscriber.id,
      ];

      const user = await fastify.db.users.change(request.params.id, {
        subscribedToUserIds: subscribedToIds,
      });

      await fastify.db.users.change(request.body.userId, {
        subscribedToUserIds: subscribedToUserIds,
      });

      return reply.send(user);
    }
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const unSubscriber = await fastify.db.users.findOne({
        key: 'id',
        equals: request.params.id,
      });

      const candidate = await fastify.db.users.findOne({
        key: 'id',
        equals: request.body.userId,
      });

      if (!unSubscriber || !candidate) {
        return reply.status(StatusCodes.NOT_FOUND).send({ 
          message: ErrorMessages.NOT_FOUND 
        });
      }

      const hasFollower = unSubscriber.subscribedToUserIds.includes(request.body.userId);
      const hasSubscriber = candidate.subscribedToUserIds.includes(request.params.id);

      if (!hasFollower || !hasSubscriber) {
        return reply.status(400).send({ message: ErrorMessages.BAD_REQUEST });
      }

      const updatedUser = await fastify.db.users.change(request.params.id, {
        subscribedToUserIds: unSubscriber.subscribedToUserIds.filter(
          (follower) => follower != request.body.userId
        ),
      });

      await fastify.db.users.change(request.body.userId, {
        subscribedToUserIds: candidate.subscribedToUserIds.filter(
          (subscriber) => subscriber != request.params.id
        ),
      });

      return reply.send(updatedUser);
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      try {
        const updatedUser = await fastify.db.users.change(
          request.params.id,
          request.body
        );

        return reply.send(updatedUser);
      } catch (error) {
        return reply.status(StatusCodes.BAD_REQUEST).send({
          message: (error as Error).message
        });
      }
    }
  );
};

export default plugin;
