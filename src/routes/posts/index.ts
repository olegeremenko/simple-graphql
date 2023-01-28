import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createPostBodySchema, changePostBodySchema } from './schema';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';
import { ErrorMessages } from '../../shared/error-messages';
import { StatusCodes } from 'http-status-codes';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<PostEntity[]> {
    return reply.send(await fastify.db.posts.findMany());
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const post = await fastify.db.posts.findOne({
        key: 'id',
        equals: request.params.id,
      });

      if (!post) {
        return reply.status(StatusCodes.NOT_FOUND).send({ 
          message: ErrorMessages.NOT_FOUND 
        });
      }

      return reply.send(post);
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createPostBodySchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const user = await fastify.db.users.findOne({
        key: 'id',
        equals: request.body.userId,
      });

      if (!user) {
        return reply.status(StatusCodes.NOT_FOUND).send({ 
          message: ErrorMessages.NOT_FOUND 
        });
      }

      const post = await fastify.db.posts.create(request.body);

      return reply.status(StatusCodes.CREATED).send(post);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      try {
        const post = await fastify.db.posts.delete(request.params.id);

        return reply.send(post);
      } catch (error) {
        return reply.status(StatusCodes.BAD_REQUEST).send({ 
          message: (error as Error).message 
        });
      }
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changePostBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      try {
        const post = await fastify.db.posts.change(
          request.params.id,
          request.body
        );

        return reply.send(post);
      } catch (error) {
        return reply.status(StatusCodes.BAD_REQUEST).send({ 
          message: (error as Error).message 
        });
      }
    }
  );
};

export default plugin;
