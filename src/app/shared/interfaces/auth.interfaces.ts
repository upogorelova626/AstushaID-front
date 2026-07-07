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

export interface EmailTwoFactorRequiredResponse {
    twoFactorRequired: true;
    challengeId: string;
    email: string;
}

export interface VerifyEmailTwoFactorPayload {
    challengeId: string;
    code: string;
}

export type AuthResponse = AstushaUser | EmailTwoFactorRequiredResponse;
