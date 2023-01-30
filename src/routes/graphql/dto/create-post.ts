import { PostEntity } from '../../../utils/DB/entities/DBPosts';

export type CreatePostDto = Omit<PostEntity, 'id'>;
