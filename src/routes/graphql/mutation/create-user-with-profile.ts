import { GQLUser } from '../types';
import { UserEntity } from '../../../utils/DB/entities/DBUsers';
import { FastifyInstance } from 'fastify';
import { CreateUserWithProfileInputObject } from '../input-objects';

export const CreateUserWithProfileMutation = {
  type: GQLUser,
  args: { data: { type: CreateUserWithProfileInputObject } },
  async resolve(_: any, args: any, fastify: FastifyInstance) {
    const { firstName, lastName, email } = args.data;
    const user: UserEntity = await fastify.db.users.create({ firstName, lastName, email });

    const { avatar, sex, birthday, country, city, street, memberTypeId } = args.data;
    const userId: string = user.id;
    const profileToCreate = {
      userId, avatar, sex, birthday, country, city, street, memberTypeId
    };

    await fastify.db.profiles.create(profileToCreate);
    return user;
  }
};
