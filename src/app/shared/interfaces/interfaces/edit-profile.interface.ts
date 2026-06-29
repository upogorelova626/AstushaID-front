import {UserTheme} from './user.interface';

export interface EditProfilePayload {
    firstName?: string;
    lastName?: string;
    position?: string;
    about?: string;
    avatarUrl?: string;
    avatarKey?: string;
    theme?: UserTheme;
}
