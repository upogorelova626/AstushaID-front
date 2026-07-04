import {UserTheme} from './user.interface';

export interface EditProfilePayload {
    firstName?: string;
    lastName?: string;
    position?: string;
    about?: string;
}

export interface EditAppearancePayload {
    theme: UserTheme;
}
