import {AstushaUser} from './user.interface';

export interface CreateAccountPayload {
    login: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    loginOrEmail: string;
    password: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    token: string;
    newPassword: string;
}

export interface AuthResponse {
    user: AstushaUser;
}
