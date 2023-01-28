import { GraphQLObjectType, } from 'graphql';
import { CreateUserMutation } from './create-user';
import { CreateUserWithProfileMutation } from './create-user-with-profile';
import { CreateProfileMutation } from './create-profile';
import { CreatePostMutation } from './create-post';
import { UpdateUserMutation } from './update-user';
import { UpdatePostMutation } from './update-post';
import { UpdateProfileMutation } from './update-profile';

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
  }
});
