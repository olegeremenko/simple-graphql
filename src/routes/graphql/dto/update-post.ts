import { PostEntity } from '../../../utils/DB/entities/DBPosts';

export type UpdatePostDto = Omit<PostEntity, 'userId'>;
