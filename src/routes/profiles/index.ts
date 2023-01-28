import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createProfileBodySchema, changeProfileBodySchema } from './schema';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import { ErrorMessages } from '../../shared/error-messages';
import { StatusCodes } from 'http-status-codes';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<ProfileEntity[]> {
    return reply.send(await fastify.db.profiles.findMany());
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const profile = await fastify.db.profiles.findOne({
        key: 'id',
        equals: request.params.id,
      });

      if (!profile) {
        return reply.status(StatusCodes.NOT_FOUND).send({ 
          message: ErrorMessages.NOT_FOUND 
        });
      }

      return reply.send(profile);
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createProfileBodySchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const existingUser = await fastify.db.users.findOne({
        key: 'id',
        equals: request.body.userId,
      });

      if (!existingUser) {
        return reply.status(StatusCodes.BAD_REQUEST).send({ 
          message: ErrorMessages.BAD_REQUEST 
        });
      }

      const existingProfile = await fastify.db.profiles.findOne({
        key: 'userId',
        equals: request.body.userId,
      });

      if (existingProfile) {
        return reply.status(StatusCodes.BAD_REQUEST).send({ 
          message: ErrorMessages.BAD_REQUEST 
        });
      }

      const existingMemberType = await fastify.db.memberTypes.findOne({
        key: 'id',
        equals: request.body.memberTypeId
      });

      if (!existingMemberType) {
        return reply.status(StatusCodes.BAD_REQUEST).send({ 
          message: ErrorMessages.BAD_REQUEST 
        });
      }

      const profile = await fastify.db.profiles.create(request.body);

      return reply.status(StatusCodes.CREATED).send(profile);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      try {
        const profile = await fastify.db.profiles.delete(request.params.id);

        return reply.send(profile);
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
        body: changeProfileBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      try {
        const post = await fastify.db.profiles.change(
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
