import fp from 'fastify-plugin';
import DB from '../utils/DB/DB';
import * as DataLoader from 'dataloader';
import { UserEntity } from '../utils/DB/entities/DBUsers';
import { ProfileEntity } from '../utils/DB/entities/DBProfiles';
import { PostEntity } from '../utils/DB/entities/DBPosts';
import { MemberTypeEntity } from '../utils/DB/entities/DBMemberTypes';
import { ErrorMessages } from '../shared/error-messages';

export class DataLoaders {
  users: DataLoader<any, UserEntity>;
  profiles: DataLoader<any, ProfileEntity>;
  posts: DataLoader<any, PostEntity>;
  memberTypes: DataLoader<any, MemberTypeEntity>;

  constructor(db: DB) {
    this.users = new DataLoader(async (keys) => {
      const results = await db.users.findMany({ key: 'id', equalsAnyOf: keys as string[] });
      return keys.map(key =>
        results.find((item) => item.id == key)
        || new Error(`${ErrorMessages.USER_NOT_FOUND} [${key}]`)
      );
    });
    this.profiles = new DataLoader(async (keys) => {
      const results = await db.profiles.findMany({ key: 'id', equalsAnyOf: keys as any[] });
      return keys.map(key =>
        results.find((item) => item.id == key)
        || new Error(`${ErrorMessages.PROFILE_NOT_FOUND} [${key}]`)
      );
    });
    this.posts = new DataLoader(async (keys) => {
      const results = await db.posts.findMany({ key: 'id', equalsAnyOf: keys as any[] });
      return keys.map(key =>
        results.find((item) => item.id == key)
        || new Error(`${ErrorMessages.POST_NOT_FOUND} [${key}]`)
      );
    });
    this.memberTypes = new DataLoader(async (keys) => {
      const results = await db.memberTypes.findMany({ key: 'id', equalsAnyOf: keys as any[] });
      return keys.map(key =>
        results.find((item) => item.id == key)
        || new Error(`${ErrorMessages.MEMBER_TYPE_NOT_FOUND} [${key}]`)
      );
    });
  }

  public clearCache() {
    this.users.clearAll();
    this.profiles.clearAll();
    this.posts.clearAll();
    this.memberTypes.clearAll();
  }
}

export default fp(async (fastify): Promise<void> => {
  const db = new DB();
  const loaders = new DataLoaders(db);
  fastify.decorate('db', db);
  fastify.decorate('loaders', loaders);
});

declare module 'fastify' {
  export interface FastifyInstance {
    db: DB;
    loaders: DataLoaders
  }
}
