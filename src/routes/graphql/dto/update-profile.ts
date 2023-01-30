import { ProfileEntity } from '../../../utils/DB/entities/DBProfiles';

export type UpdateProfileDto = Omit<ProfileEntity, 'userId'>;
