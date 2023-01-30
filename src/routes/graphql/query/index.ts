import { GraphQLObjectType } from 'graphql';
import { userQuery } from './user';
import { usersQuery } from './users';
import { profileQuery } from './profile';
import { profilesQuery } from './profiles';
import { postQuery } from './post';
import { postsQuery } from './posts';
import { memberTypeQuery } from './member-type';
import { memberTypesQuery } from './member-types';

export const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: userQuery,
    users: usersQuery,
    profile: profileQuery,
    profiles: profilesQuery,
    memberType: memberTypeQuery,
    memberTypes: memberTypesQuery,
    post: postQuery,
    posts: postsQuery,
  }
});
