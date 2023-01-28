import { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import { PostEntity } from '../../utils/DB/entities/DBPosts';
import { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import { UserEntity } from '../../utils/DB/entities/DBUsers';
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { ErrorMessages } from '../../shared/error-messages';
import { GQLUser } from './types/gql-user';
import { GQLPost } from './types/gql-post';
import { GQLProfile } from './types/gql-profile';
import { GQLMemberType } from './types/gql-member-type';

export const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(GQLUser),
      async resolve(source, args, context): Promise<UserEntity[]> {
        return await context.db.users.findMany();
      }
    },
    profiles: {
      type: new GraphQLList(GQLProfile),
      async resolve(source, args, context): Promise<ProfileEntity[]> {
        return await context.db.profiles.findMany();
      }
    },
    posts: {
      type: new GraphQLList(GQLPost),
      async resolve(source, args, context): Promise<PostEntity[]> {
        return await context.db.posts.findMany();
      }
    },
    memberTypes: {
      type: new GraphQLList(GQLMemberType),
      async resolve(source, args, context): Promise<MemberTypeEntity[]> {
        return await context.db.memberTypes.findMany();
      }
    },
    user: {
      type: GQLUser,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(_, { id }, context): Promise<UserEntity> {
        const user = await context.db.users.findOne({
          key: 'id',
          equals: id
        });

        if (!user) {
          throw context.httpErrors.notFound(ErrorMessages.USER_ERROR);
        }

        return user;
      }
    },
    profile: {
      type: GQLProfile,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(_, { id }, context): Promise<ProfileEntity> {
        const profile = await context.db.profiles.findOne({
          key: 'id',
          equals: id
        });

        if (!profile) {
          throw context.httpErrors.notFound(ErrorMessages.PROFILE_ERROR);
        }

        return profile;
      }
    },
    post: {
      type: GQLPost,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(_, { id }, context): Promise<PostEntity> {
        const post = await context.db.posts.findOne({
          key: 'id',
          equals: id
        });

        if (!post) {
          throw context.httpErrors.notFound(ErrorMessages.POST_ERROR);
        }

        return post;
      }
    },
    memberType: {
      type: GQLMemberType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(_, { id }, context): Promise<MemberTypeEntity> {
        const memberType = await context.db.memberTypes.findOne({
          key: 'id',
          equals: id
        });

        if (!memberType) {
          throw context.httpErrors.notFound(ErrorMessages.MEMBER_TYPE_ERROR);
        }

        return memberType;
      }
    }
  }
});
