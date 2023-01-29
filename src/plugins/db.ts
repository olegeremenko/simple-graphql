import fp from 'fastify-plugin';
import DB from '../utils/DB/DB';
import * as DataLoader from 'dataloader';
import { UserEntity } from '../utils/DB/entities/DBUsers';
import { ProfileEntity } from '../utils/DB/entities/DBProfiles';
import { PostEntity } from '../utils/DB/entities/DBPosts';
import { MemberTypeEntity } from '../utils/DB/entities/DBMemberTypes';

export class DataLoaders {
  users: DataLoader<any, UserEntity>;
  profiles: DataLoader<any, ProfileEntity>;
  posts: DataLoader<any, PostEntity>;
  memberTypes: DataLoader<any, MemberTypeEntity>;

  constructor(db: DB) {
    this.users = new DataLoader(async (ids) => {
      return await db.users.findMany({
        key: 'id',
        equalsAnyOf: ids as string[]
      });
    });
    this.profiles = new DataLoader(async (ids) => {
      return await db.profiles.findMany({
        key: 'id',
        equalsAnyOf: ids as any[]
      });
    });
    this.posts = new DataLoader(async (ids) => {
      return await db.posts.findMany({
        key: 'id',
        equalsAnyOf: ids as any[]
      });
    });
    this.memberTypes = new DataLoader(async (ids) => {
      return await db.memberTypes.findMany({
        key: 'id',
        equalsAnyOf: ids as any[]
      });
    });
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
