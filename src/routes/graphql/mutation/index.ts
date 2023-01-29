import { GraphQLObjectType, } from 'graphql';
import { CreateUserMutation } from './create-user';
import { CreateUserWithProfileMutation } from './create-user-with-profile';
import { CreateProfileMutation } from './create-profile';
import { CreatePostMutation } from './create-post';
import { UpdateUserMutation } from './update-user';
import { UpdatePostMutation } from './update-post';
import { UpdateProfileMutation } from './update-profile';
import { UpdateMemberTypeMutation } from './update-member-type';
import { SubscribeToUserMutation } from './subscribe-to-user';
import { UnsubscribeFromUserMutation } from './unsubscribe-from-user';

export const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CreateUserMutation,
    updateUser: UpdateUserMutation,
    createUserWithProfile: CreateUserWithProfileMutation,

    createProfile: CreateProfileMutation,
    updateProfile: UpdateProfileMutation,

    createPost: CreatePostMutation,
    updatePost: UpdatePostMutation,

    updateMemberType: UpdateMemberTypeMutation,

    subscribeToUser: SubscribeToUserMutation,
    unsubscribeFromUser: UnsubscribeFromUserMutation,
  }
});
