import * as DataLoader from 'dataloader';
import { UserEntity } from './DB/entities/DBUsers';
import { ProfileEntity } from './DB/entities/DBProfiles';
import { PostEntity } from './DB/entities/DBPosts';
import { MemberTypeEntity } from './DB/entities/DBMemberTypes';
import DB from './DB/DB';
import { ErrorMessages } from '../shared/error-messages';

export class DataLoaders {
  users: DataLoader<string, UserEntity>;
  profiles: DataLoader<string, ProfileEntity>;
  posts: DataLoader<string, PostEntity>;
  memberTypes: DataLoader<string, MemberTypeEntity>;
  entities: any;
  db: DB;

  constructor(db: DB) {
    this.db = db;

    this.users = new DataLoader(async (keys) => {
      const results = await db.users.findMany({ key: 'id', equalsAnyOf: keys as string[] });

      return keys.map(key =>
        results.find((item) => item.id == key)
        || new Error(`${ErrorMessages.USER_NOT_FOUND} [${key}]`)
      );
    });

    this.profiles = new DataLoader(async (keys) => {
      const results = await db.profiles.findMany({ key: 'id', equalsAnyOf: keys as string[] });

      return keys.map(key =>
        results.find((item) => item.id == key)
        || new Error(`${ErrorMessages.PROFILE_NOT_FOUND} [${key}]`)
      );
    });

    this.posts = new DataLoader(async (keys) => {
      const results = await db.posts.findMany({ key: 'id', equalsAnyOf: keys as string[] });

      return keys.map(key =>
        results.find((item) => item.id == key)
        || new Error(`${ErrorMessages.POST_NOT_FOUND} [${key}]`)
      );
    });

    this.memberTypes = new DataLoader(async (keys) => {
      const results = await db.memberTypes.findMany({ key: 'id', equalsAnyOf: keys as string[] });

      return keys.map(key =>
        results.find((item) => item.id == key)
        || new Error(`${ErrorMessages.MEMBER_TYPE_NOT_FOUND} [${key}]`)
      );
    });

    this.entities = new DataLoader(async (entities) => {
      return entities.map(async entity => {
        if (entity == 'users') {
          return this.users.loadMany(await this.getAllUserIds());
        } else if (entity == 'profiles') {
          return this.profiles.loadMany(await this.getAllProfileIds());
        } else if (entity == 'posts') {
          return this.posts.loadMany(await this.getAllPostsIds());
        } else if (entity == 'memberTypes') {
          return this.memberTypes.loadMany(await this.getAllMemberTypeIds());
        } else {
          return new Error(`${ErrorMessages.MEMBER_TYPE_NOT_FOUND}`);
        }
      });
    });
  }

  private async getAllUserIds() {
    const allUsers = await this.db.users.findMany();
    return allUsers.map((entity: UserEntity) => entity.id);
  }

  private async getAllProfileIds() {
    const allUsers = await this.db.profiles.findMany();
    return allUsers.map((entity: ProfileEntity) => entity.id);
  }

  private async getAllPostsIds() {
    const allUsers = await this.db.posts.findMany();
    return allUsers.map((entity: PostEntity) => entity.id);
  }

  private async getAllMemberTypeIds() {
    const allUsers = await this.db.memberTypes.findMany();
    return allUsers.map((entity: MemberTypeEntity) => entity.id);
  }

  public clearCache() {
    this.users.clearAll();
    this.profiles.clearAll();
    this.posts.clearAll();
    this.memberTypes.clearAll();
    this.entities.clearAll();
  }
}
