import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
    AuthResponse,
    CreateAccountPayload,
    ForgotPasswordPayload,
    LoginPayload,
    ResetPasswordPayload
} from '../../../shared/interfaces';
import {finalize, map, Observable, switchMap} from 'rxjs';
import {UsersService} from './users.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly usersService = inject(UsersService);

    private readonly baseApiUrl = 'http://localhost:3002/auth';

    createAccount(payload: CreateAccountPayload): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            `${this.baseApiUrl}/create-account`,
            payload
        );
    }

    login(payload: LoginPayload): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.baseApiUrl}/login`, payload)
            .pipe(
                switchMap(response =>
                    this.usersService
                        .loadCurrentUser()
                        .pipe(map(() => response))
                )
            );
    }

    refresh(): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseApiUrl}/refresh`, null);
    }

    logout(): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.baseApiUrl}/logout`, null)
            .pipe(
                finalize(() => {
                    this.usersService.clearCurrentUser();
                })
            );
    }

    resetPasswordRequest(payload: ForgotPasswordPayload): Observable<void> {
        return this.http.post<void>(
            `${this.baseApiUrl}/password-reset/request`,
            payload
        );
    }

    confirmPasswordReset(payload: ResetPasswordPayload): Observable<void> {
        return this.http.post<void>(
            `${this.baseApiUrl}/password-reset/confirm`,
            payload
        );
    }
}
