import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { ExecutionResult, graphql, GraphQLSchema, parse, validate } from 'graphql';
import { graphqlBodySchema } from './schema';
import { RootQuery } from './query';
import { RootMutation } from './mutation';
import * as depthLimit from 'graphql-depth-limit';

const ALLOWED_GRAPHQL_DEPTH = 6;

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async function (request, reply) {
      const { query, variables } = request.body;

      const errors = validate(schema, parse(query!), [depthLimit(ALLOWED_GRAPHQL_DEPTH)]);
      fastify.loaders.clearCache();

      if (errors.length > 0) {
        const result: ExecutionResult = {
          errors: errors,
          data: null,
        };

        return result;
      }

      return graphql({
        schema: schema,
        source: query!,
        variableValues: variables,
        contextValue: fastify,
      });
    }
  );
};

export default plugin;
