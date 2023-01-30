import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { changeMemberTypeBodySchema } from './schema';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import { ErrorMessages } from '../../shared/error-messages';
import { StatusCodes } from 'http-status-codes';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<MemberTypeEntity[]> {
    return reply.send(await fastify.db.memberTypes.findMany());
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity> {
      const memberType = await fastify.db.memberTypes.findOne({
        key: 'id',
        equals: request.params.id,
      });

      if (!memberType) {
        return reply.status(StatusCodes.NOT_FOUND).send({ 
          message: ErrorMessages.NOT_FOUND 
        });
      }

      return reply.send(memberType);
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeMemberTypeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity> {
      try {
        const memberType = await fastify.db.memberTypes.change(
          request.params.id,
          request.body
        );

        return reply.send(memberType);
      } catch (error) {
        return reply.status(StatusCodes.BAD_REQUEST).send({ 
          message: (error as Error).message 
        });
      }
    }
  );
};

export default plugin;
