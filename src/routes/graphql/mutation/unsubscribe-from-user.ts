import { FastifyInstance } from 'fastify';
import { GQLUser } from '../types';
import { UnsubscribeFromUserInputObject } from '../input-objects';
import { ErrorMessages } from '../../../shared/error-messages';
import { UnsubscribeFromUserDto } from '../dto/unsubscribe-from-user';
import { getUserById } from '../../../utils/DB/queries/user';

export const UnsubscribeFromUserMutation = {
  type: GQLUser,
  args: { data: { type: UnsubscribeFromUserInputObject } },
  async resolve(_: any, { data }: Record<'data', UnsubscribeFromUserDto>, fastify: FastifyInstance) {
    const user = await getUserById(data.id, fastify);

    const isSubscribed = user.subscribedToUserIds.includes(data.unsubscribeFromUserId);

    if (!isSubscribed) {
      throw fastify.httpErrors.badRequest(ErrorMessages.NOT_SUBSCRIBED);
    }

    const subscribedUserIndex = user.subscribedToUserIds.indexOf(data.id);
    user.subscribedToUserIds.splice(subscribedUserIndex, 1);

    return fastify.db.users.change(
      data.id,
      { subscribedToUserIds: user.subscribedToUserIds },
    );
  }
};
