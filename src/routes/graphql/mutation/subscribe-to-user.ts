import { FastifyInstance } from 'fastify';
import { GQLUser } from '../types';
import { SubscribeToUserInputObject } from '../input-objects';
import { SubscribeToUserDto } from '../dto';
import { ErrorMessages } from '../../../shared/error-messages';
import { getUserById } from '../../../utils/DB/queries/user';

export const SubscribeToUserMutation = {
  type: GQLUser,
  args: { data: { type: SubscribeToUserInputObject } },
  async resolve(_: any, { data }: Record<'data', SubscribeToUserDto>, fastify: FastifyInstance) {
    const user = await getUserById(data.id, fastify);

    if (user.id === data.subscribeToUserId) {
      throw fastify.httpErrors.badRequest(ErrorMessages.SELF_SUBSCRIBE);
    }

    const alreadySubscribed = user.subscribedToUserIds.includes(data.subscribeToUserId);

    if (alreadySubscribed) {
      throw fastify.httpErrors.badRequest(ErrorMessages.ALREADY_SUBSCRIBED);
    }

    await getUserById(data.subscribeToUserId, fastify);

    return await fastify.db.users.change(
      data.id,
      { subscribedToUserIds: [...user.subscribedToUserIds, data.subscribeToUserId] },
    );
  }
};
