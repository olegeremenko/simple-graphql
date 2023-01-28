import { ProfileEntity } from '../../../utils/DB/entities/DBProfiles';

export type CreateProfileDto = Omit<ProfileEntity, 'id'>;
