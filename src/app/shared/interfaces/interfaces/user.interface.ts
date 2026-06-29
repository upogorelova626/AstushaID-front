export type UserTheme = 'LIGHT' | 'DARK' | 'SYSTEM';

export interface AstushaUser {
    id: string;
    login: string;
    email: string;

    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
    avatarKey: string | null;
    position: string | null;
    about: string | null;

    emailVerifiedAt: string | null;

    theme: UserTheme;

    createdAt: string;
    updatedAt: string;
}
