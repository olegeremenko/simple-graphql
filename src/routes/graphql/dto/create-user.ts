import { UserEntity } from '../../../utils/DB/entities/DBUsers';

export type CreateUserDto = Omit<UserEntity, 'id' | 'subscribedToUserIds'>;
